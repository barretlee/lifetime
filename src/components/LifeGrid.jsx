import React from 'react';

const LifeGrid = ({ cells, cellSize, onCellClick, onViewCell, livedMonths, lifeSpan }) => {
  // 定义年龄段（根据lifeSpan动态计算）
  const calculateAgeGroups = () => {
    const groups = [];
    
    // 少年 (0-18岁)
    if (18 < lifeSpan) {
      groups.push({ 
        name: '少年', 
        start: 0, 
        end: Math.min(18, lifeSpan), 
        color: 'bg-blue-100', 
        borderColor: 'border-blue-200' 
      });
    }
    
    // 青年 (18-35岁)
    if (18 < lifeSpan && 35 < lifeSpan) {
      groups.push({ 
        name: '青年', 
        start: 18, 
        end: Math.min(35, lifeSpan), 
        color: 'bg-green-100', 
        borderColor: 'border-green-200' 
      });
    } else if (18 < lifeSpan && lifeSpan <= 35) {
      groups.push({ 
        name: '青年', 
        start: 18, 
        end: lifeSpan, 
        color: 'bg-green-100', 
        borderColor: 'border-green-200' 
      });
    }
    
    // 壮年 (35-60岁)
    if (35 < lifeSpan && 60 < lifeSpan) {
      groups.push({ 
        name: '壮年', 
        start: 35, 
        end: Math.min(60, lifeSpan), 
        color: 'bg-yellow-100', 
        borderColor: 'border-yellow-200' 
      });
    } else if (35 < lifeSpan && lifeSpan <= 60) {
      groups.push({ 
        name: '壮年', 
        start: 35, 
        end: lifeSpan, 
        color: 'bg-yellow-100', 
        borderColor: 'border-yellow-200' 
      });
    }
    
    // 中老年 (60-80岁)
    if (60 < lifeSpan && 80 < lifeSpan) {
      groups.push({ 
        name: '中老年', 
        start: 60, 
        end: Math.min(80, lifeSpan), 
        color: 'bg-orange-100', 
        borderColor: 'border-orange-200' 
      });
    } else if (60 < lifeSpan && lifeSpan <= 80) {
      groups.push({ 
        name: '中老年', 
        start: 60, 
        end: lifeSpan, 
        color: 'bg-orange-100', 
        borderColor: 'border-orange-200' 
      });
    }
    
    // 老年 (80-100岁)
    if (80 < lifeSpan) {
      groups.push({ 
        name: '老年', 
        start: 80, 
        end: lifeSpan, 
        color: 'bg-purple-100', 
        borderColor: 'border-purple-200' 
      });
    }
    
    return groups;
  };

  const AGE_GROUPS = calculateAgeGroups();

  // 按年龄段分组生成格子
  const renderAgeGroups = () => {
    return AGE_GROUPS.map((group, groupIndex) => {
      const monthsInGroup = (group.end - group.start) * 12;
      const startIndex = group.start * 12;
      const endIndex = Math.min(startIndex + monthsInGroup, cells.length);
      
      const groupCells = cells.slice(startIndex, endIndex);
      
      return (
        <div key={groupIndex} className={`mb-8 border-l-4 ${group.borderColor} pl-4`}>
          <div className="flex items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">{group.name}</h3>
            <span className="ml-2 text-sm text-gray-500">
              ({group.start} - {group.end}岁)
            </span>
          </div>
          
          <div 
            className="grid gap-1 grid-container"
            style={{ gap: `${Math.max(1, cellSize/10)}px` }}
          >
            {groupCells.map((cell, index) => {
              const globalIndex = startIndex + index;
              
              // 确定格子背景色
              let bgColorClass = '';
              if (globalIndex < livedMonths) {
                // 已活过的月份
                if (cell.marked && cell.color) {
                  bgColorClass = cell.color + ' opacity-80';
                } else if (cell.marked) {
                  bgColorClass = 'bg-blue-400 opacity-80';
                } else {
                  bgColorClass = 'bg-green-200 opacity-80';
                }
              } else {
                // 未活过的月份
                if (cell.marked && cell.color) {
                  bgColorClass = cell.color;
                } else if (cell.marked) {
                  bgColorClass = 'bg-blue-400';
                } else {
                  bgColorClass = 'bg-gray-200';
                }
              }
              
              // 处理点击事件
              const handleClick = () => {
                if (cell.marked) {
                  // 已标记的格子进入查看模式
                  onViewCell(globalIndex);
                } else {
                  // 未标记的格子进入编辑模式
                  onCellClick(globalIndex);
                }
              };
              
              return (
                <div
                  key={globalIndex}
                  onClick={handleClick}
                  className={`life-cell flex items-center justify-center cursor-pointer rounded transition-all ${bgColorClass}`}
                  title={cell.note || `第${globalIndex+1}个月`}
                >
                  {cell.note && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {renderAgeGroups()}
    </div>
  );
};

export default LifeGrid;
