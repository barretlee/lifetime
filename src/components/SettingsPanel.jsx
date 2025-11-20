import React, { useState } from 'react';
    import * as Dialog from '@radix-ui/react-dialog';
    import * as Slider from '@radix-ui/react-slider';
    import { GearIcon } from '@radix-ui/react-icons';

    const SettingsPanel = ({ 
      cellSize, 
      onCellSizeChange, 
      birthDate, 
      onBirthDateChange, 
      lifeSpan,
      onLifeSpanChange,
      onClose 
    }) => {
      const [tempBirthDate, setTempBirthDate] = useState(
        birthDate.toISOString().split('T')[0]
      );
      
      const [tempLifeSpan, setTempLifeSpan] = useState(lifeSpan);
      
      // 计算当前年龄
      const calculateCurrentAge = () => {
        const now = new Date();
        const yearsDiff = now.getFullYear() - new Date(tempBirthDate).getFullYear();
        const monthsDiff = now.getMonth() - new Date(tempBirthDate).getMonth();
        return Math.max(0, yearsDiff + Math.floor(monthsDiff / 12));
      };

      const handleSave = () => {
        onBirthDateChange(new Date(tempBirthDate));
        onLifeSpanChange(tempLifeSpan);
        onClose();
      };

      const currentAge = calculateCurrentAge();
      // 生命长度的最小值应该是当前年龄+1
      const minLifeSpan = Math.max(currentAge + 1, 1);

      return (
        <Dialog.Root open onOpenChange={onClose}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-xl shadow-xl p-6 z-50">
              <Dialog.Title className="flex items-center text-xl font-bold text-gray-800 mb-6">
                <GearIcon className="w-6 h-6 mr-2" />
                设置
              </Dialog.Title>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    格子大小: {cellSize}px
                  </label>
                  <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={[cellSize]}
                    onValueChange={(value) => onCellSizeChange(value[0])}
                    min={16}
                    max={40}
                    step={2}
                  >
                    <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
                      <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb 
                      className="block w-5 h-5 bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:shadow-lg"
                      aria-label="格子大小"
                    />
                  </Slider.Root>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>小</span>
                    <span>大</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    出生日期
                  </label>
                  <input
                    type="date"
                    value={tempBirthDate}
                    onChange={(e) => setTempBirthDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    生命长度: {tempLifeSpan}年
                  </label>
                  <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={[tempLifeSpan]}
                    onValueChange={(value) => setTempLifeSpan(value[0])}
                    min={minLifeSpan}
                    max={100}
                    step={1}
                  >
                    <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
                      <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb 
                      className="block w-5 h-5 bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:shadow-lg"
                      aria-label="生命长度"
                    />
                  </Slider.Root>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{minLifeSpan}年</span>
                    <span>100年</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    当前年龄: {currentAge}岁 (最小值不能小于当前年龄+1)
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-8">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    取消
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  保存
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      );
    };

    export default SettingsPanel;
