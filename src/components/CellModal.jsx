import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircledIcon } from '@radix-ui/react-icons';

const COLORS = [
  { name: '默认', value: '' },
  { name: '红色', value: 'bg-red-400' },
  { name: '橙色', value: 'bg-orange-400' },
  { name: '黄色', value: 'bg-yellow-400' },
  { name: '绿色', value: 'bg-green-400' },
  { name: '蓝色', value: 'bg-blue-400' },
  { name: '紫色', value: 'bg-purple-400' },
  { name: '粉色', value: 'bg-pink-400' },
];

const CellModal = ({ cell, age, onClose, onSave }) => {
  const [marked, setMarked] = useState(cell.marked);
  const [color, setColor] = useState(cell.color);
  const [note, setNote] = useState(cell.note);

  const handleSave = () => {
    onSave({ marked, color, note });
    onClose();
  };

  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-xl shadow-xl p-6 z-50">
          <Dialog.Title className="text-xl font-bold text-gray-800 mb-2">
            标记这个月份{age ? `（第 ${age}）` : ''}
          </Dialog.Title>
          
          <div className="space-y-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <input
                  type="checkbox"
                  checked={marked}
                  onChange={(e) => setMarked(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 rounded"
                />
                标记为重要月份
              </label>
            </div>
            
            {marked && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择颜色
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setColor(c.value)}
                      className={`w-8 h-8 rounded-full ${c.value || 'bg-gray-200'} flex items-center justify-center`}
                      title={c.name}
                    >
                      {color === c.value && <CheckCircledIcon className="w-5 h-5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                记录事项
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="记录这个月份的重要事件..."
              />
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

export default CellModal;
