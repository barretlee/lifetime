import React, { useState } from 'react';
import { Pencil1Icon } from '@radix-ui/react-icons';

const GoalBanner = ({ goal, onGoalChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(goal);

  const handleSave = () => {
    onGoalChange(tempGoal);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempGoal(goal);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
      {isEditing ? (
        <div className="flex flex-col space-y-4">
          <textarea
            value={tempGoal}
            onChange={(e) => setTempGoal(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="输入你的人生目标..."
          />
          <div className="flex space-x-3 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-500 mb-2">我的目标</h2>
            <p className="text-xl text-gray-800">{goal}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="编辑目标"
          >
            <Pencil1Icon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalBanner;
