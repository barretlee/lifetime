import React, { useState, useEffect } from 'react';
import GoalBanner from './components/GoalBanner';
import LifeGrid from './components/LifeGrid';
import SettingsPanel from './components/SettingsPanel';
import CellModal from './components/CellModal';
import CellView from './components/CellView';
import Footer from './components/Footer';
import { GearIcon } from '@radix-ui/react-icons';

const MONTHS_PER_YEAR = 12;
const DEFAULT_LIFE_SPAN = 80;

const App = () => {
  const [goal, setGoal] = useState('做一个有用的人，能够把当下做好，不惧未来');
  const [lifeSpan, setLifeSpan] = useState(() => {
    const saved = localStorage.getItem('lifeCountdownLifeSpan');
    return saved ? parseInt(saved, 10) : DEFAULT_LIFE_SPAN;
  });
  const [cells, setCells] = useState([]);
  const [cellSize, setCellSize] = useState(24);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [birthDate, setBirthDate] = useState(() => {
    const saved = localStorage.getItem('lifeCountdownBirthDate');
    // 设置默认出生日期为25年前
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() - 25);
    return saved ? new Date(saved) : defaultDate;
  });

  const TOTAL_CELLS = lifeSpan * MONTHS_PER_YEAR;

  // 计算已活过的月份数
  const calculateLivedMonths = () => {
    const now = new Date();
    const yearsDiff = now.getFullYear() - birthDate.getFullYear();
    const monthsDiff = now.getMonth() - birthDate.getMonth();
    const totalMonths = yearsDiff * 12 + monthsDiff;
    return Math.max(0, Math.min(totalMonths, TOTAL_CELLS));
  };

  const [livedMonths, setLivedMonths] = useState(calculateLivedMonths());

  // 初始化cells数组
  useEffect(() => {
    setCells(Array(TOTAL_CELLS).fill(null).map(() => ({ 
      marked: false, 
      color: '', 
      note: '' 
    })));
  }, [lifeSpan]);

  // 加载本地存储数据
  useEffect(() => {
    const savedGoal = localStorage.getItem('lifeCountdownGoal');
    const savedCells = localStorage.getItem('lifeCountdownCells');
    const savedBirthDate = localStorage.getItem('lifeCountdownBirthDate');
    const savedLifeSpan = localStorage.getItem('lifeCountdownLifeSpan');
    
    if (savedGoal) {
      setGoal(savedGoal);
    }
    
    if (savedLifeSpan) {
      setLifeSpan(parseInt(savedLifeSpan, 10));
    }
    
    if (savedBirthDate) {
      setBirthDate(new Date(savedBirthDate));
    }
  }, []);

  // 保存到本地存储
  useEffect(() => {
    localStorage.setItem('lifeCountdownGoal', goal);
  }, [goal]);

  useEffect(() => {
    localStorage.setItem('lifeCountdownCells', JSON.stringify(cells));
  }, [cells]);

  useEffect(() => {
    localStorage.setItem('lifeCountdownBirthDate', birthDate.toISOString());
    setLivedMonths(calculateLivedMonths());
  }, [birthDate]);

  useEffect(() => {
    localStorage.setItem('lifeCountdownLifeSpan', lifeSpan.toString());
    // 当lifeSpan改变时，重新初始化cells
    setCells(Array(TOTAL_CELLS).fill(null).map(() => ({ 
      marked: false, 
      color: '', 
      note: '' 
    })));
  }, [lifeSpan]);

  const handleCellClick = (index) => {
    setSelectedCell(index);
    setIsModalOpen(true);
    setIsViewOpen(false);
  };

  const handleViewCell = (index) => {
    setSelectedCell(index);
    setIsViewOpen(true);
    setIsModalOpen(false);
  };

  const handleCellUpdate = (updatedCell) => {
    const newCells = [...cells];
    newCells[selectedCell] = updatedCell;
    setCells(newCells);
  };

  const handleSettingsChange = (newSize) => {
    setCellSize(newSize);
  };

  const handleBirthDateChange = (newDate) => {
    setBirthDate(newDate);
  };

  const handleLifeSpanChange = (newLifeSpan) => {
    setLifeSpan(newLifeSpan);
  };

  // 初始化关键年龄事件
  useEffect(() => {
    if (cells.length === 0) return;
    
    const updatedCells = [...cells];
    // 12岁 - 小学毕业，开始形成独立人格
    const age12Index = 12 * 12;
    if (age12Index < updatedCells.length && !updatedCells[age12Index].marked) {
      updatedCells[age12Index] = {
        marked: true,
        color: 'bg-blue-400',
        note: '小学毕业，开始形成独立人格'
      };
    }
    
    // 18岁 - 成年，进入大学探索人生方向
    const age18Index = 18 * 12;
    if (age18Index < updatedCells.length && !updatedCells[age18Index].marked) {
      updatedCells[age18Index] = {
        marked: true,
        color: 'bg-green-400',
        note: '成年，进入大学探索人生方向'
      };
    }
    
    // 20岁 - 找到人生方向，坚定信念
    const age20Index = 20 * 12;
    if (age20Index < updatedCells.length && !updatedCells[age20Index].marked) {
      updatedCells[age20Index] = {
        marked: true,
        color: 'bg-purple-400',
        note: '找到人生方向，坚定"做一个有用的人"的信念'
      };
    }
    
    // 初始化第一个月的记录
    if (updatedCells.length > 0 && !updatedCells[0].marked) {
      updatedCells[0] = {
        marked: true,
        color: 'bg-blue-400',
        note: '我出生了'
      };
    }
    
    setCells(updatedCells);
  }, [cells.length]);

  // 计算年龄字符串
  const calculateAgeString = (monthIndex) => {
    const years = Math.floor(monthIndex / 12);
    const months = monthIndex % 12;
    return `${years}岁${months > 0 ? ` ${months}个月` : ''}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">人生计时器</h1>
          <button 
            onClick={() => setSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all"
            aria-label="设置"
          >
            <GearIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <GoalBanner goal={goal} onGoalChange={setGoal} />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">我的人生格子</h2>
            <div className="text-sm text-gray-500">
              {lifeSpan}年 × {MONTHS_PER_YEAR}月 = {TOTAL_CELLS}个月
            </div>
          </div>
          
          <LifeGrid 
            cells={cells} 
            cellSize={cellSize} 
            onCellClick={handleCellClick} 
            onViewCell={handleViewCell}
            livedMonths={livedMonths}
            lifeSpan={lifeSpan}
          />
        </div>
      </div>

      {isModalOpen && selectedCell !== null && (
        <CellModal 
          cell={cells[selectedCell]} 
          age={calculateAgeString(selectedCell)}
          onClose={() => setIsModalOpen(false)}
          onSave={handleCellUpdate}
        />
      )}

      {isViewOpen && selectedCell !== null && (
        <CellView 
          cell={cells[selectedCell]} 
          age={calculateAgeString(selectedCell)}
          onClose={() => setIsViewOpen(false)}
          onEdit={() => {
            setIsViewOpen(false);
            setIsModalOpen(true);
          }}
        />
      )}

      {settingsOpen && (
        <SettingsPanel 
          cellSize={cellSize}
          onCellSizeChange={handleSettingsChange}
          birthDate={birthDate}
          onBirthDateChange={handleBirthDateChange}
          lifeSpan={lifeSpan}
          onLifeSpanChange={handleLifeSpanChange}
          onClose={() => setSettingsOpen(false)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default App;
