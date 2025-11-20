import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Pencil1Icon } from '@radix-ui/react-icons';

const CellView = ({ cell, age, onClose, onEdit }) => {
  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-xl shadow-xl p-6 z-50">
          <Dialog.Title className="text-xl font-bold text-gray-800 mb-2">
            事件详情
          </Dialog.Title>
          
          <div className="space-y-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                时间
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-lg font-semibold text-gray-800">{age}</span>
              </div>
            </div>
            
            {cell.color && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标记颜色
                </label>
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full ${cell.color} mr-2`}></div>
                  <span className="text-gray-700">
                    {cell.color === 'bg-red-400' && '红色'}
                    {cell.color === 'bg-orange-400' && '橙色'}
                    {cell.color === 'bg-yellow-400' && '黄色'}
                    {cell.color === 'bg-green-400' && '绿色'}
                    {cell.color === 'bg-blue-400' && '蓝色'}
                    {cell.color === 'bg-purple-400' && '紫色'}
                    {cell.color === 'bg-pink-400' && '粉色'}
                    {!cell.color && '默认'}
                  </span>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                事件内容
              </label>
              <div className="p-3 bg-gray-50 rounded-lg min-h-[60px]">
                <p className="text-gray-800">{cell.note}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-8">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                关闭
              </button>
            </Dialog.Close>
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <Pencil1Icon className="w-4 h-4 mr-1" />
              编辑
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CellView;
