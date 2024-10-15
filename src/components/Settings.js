import React, { useState } from 'react';

const Settings = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('ui');

  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const tabClass = (tab) => `cursor-pointer p-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`;

  return (
    <div className={`flex flex-col items-center justify-center h-full p-4 ${bgColor} ${textColor} shadow-md rounded-lg transition-colors`}>
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Settings</h2>
      <div className="flex space-x-4 mb-6">
        <div className={tabClass('ui')} onClick={() => setActiveTab('ui')}>UI Settings</div>
        <div className={tabClass('account')} onClick={() => setActiveTab('account')}>Account Settings</div>
        <div className={tabClass('notifications')} onClick={() => setActiveTab('notifications')}>Notification Settings</div>
      </div>
      <div className="w-full max-w-xl">
        {activeTab === 'ui' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className={`text-lg ${textColor}`}>Dark Mode</label>
              <input type="checkbox" className="form-checkbox" checked={isDarkMode} readOnly />
            </div>
            <div className="flex justify-between items-center">
              <label className={`text-lg ${textColor}`}>Font Size</label>
              <select className={`border-2 ${isDarkMode ? 'border-gray-500 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} p-2 rounded-lg`}>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        )}
        {activeTab === 'account' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className={`text-lg ${textColor}`}>Username</label>
              <input type="text" className={`border-2 ${isDarkMode ? 'border-gray-500 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} p-2 rounded-lg`} placeholder="Enter username" />
            </div>
            <div className="flex justify-between items-center">
              <label className={`text-lg ${textColor}`}>Email</label>
              <input type="email" className={`border-2 ${isDarkMode ? 'border-gray-500 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} p-2 rounded-lg`} placeholder="Enter email" />
            </div>
          </div>
        )}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className={`text-lg ${textColor}`}>Email Notifications</label>
              <input type="checkbox" className="form-checkbox" />
            </div>
            <div className="flex justify-between items-center">
              <label className={`text-lg ${textColor}`}>SMS Notifications</label>
              <input type="checkbox" className="form-checkbox" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
