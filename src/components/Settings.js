import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateUserProfile } from '../redux/userSlice'; // Assume these actions exist
import { updateSettings } from '../redux/settingsSlice';

const Settings = ({ isDarkMode }) => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector(state => state.user);
  const settings = useSelector(state => state.settings);
  const [activeTab, setActiveTab] = useState('ui');
  const [localUser, setLocalUser] = useState({
    bio: '',
    profilePicture: '',
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserData());
    }
    if (user) {
      setLocalUser({
        bio: user.bio || '',
        profilePicture: user.profilePicture || '',
      });
    }
  }, [dispatch, status, user]);

  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalUser(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalUser(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    dispatch(updateUserProfile(localUser));
  };

  const renderAccountSettings = () => {
    if (status === 'loading') {
      return <p>Loading user data...</p>;
    }

    if (status === 'failed') {
      return <p>Error: {error}</p>;
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className={`text-lg ${textColor}`}>Name:</label>
          <span className={`text-lg ${textColor}`}>{user?.name || 'Not available'}</span>
        </div>
        <div className="flex justify-between items-center">
          <label className={`text-lg ${textColor}`}>Email:</label>
          <span className={`text-lg ${textColor}`}>{user?.email || 'Not available'}</span>
        </div>
        <div className="flex flex-col">
          <label className={`text-lg ${textColor} mb-2`}>Bio</label>
          <textarea
            name="bio"
            className={`border-2 ${isDarkMode ? 'border-gray-500 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} p-2 rounded-lg`}
            placeholder="Tell us about yourself"
            value={localUser.bio}
            onChange={handleInputChange}
            rows="4"
          />
        </div>
        <div className="flex flex-col">
          <label className={`text-lg ${textColor} mb-2`}>Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mb-2"
          />
          {localUser.profilePicture && (
            <img src={localUser.profilePicture} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full p-4 ${bgColor} ${textColor} shadow-md rounded-lg transition-colors`}>
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Settings</h2>
      <div className="flex space-x-4 mb-6">
        <div className={`cursor-pointer p-2 ${activeTab === 'ui' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => setActiveTab('ui')}>UI Settings</div>
        <div className={`cursor-pointer p-2 ${activeTab === 'gameplay' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => setActiveTab('gameplay')}>Gameplay Settings</div>
        <div className={`cursor-pointer p-2 ${activeTab === 'account' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => setActiveTab('account')}>Account Settings</div>
        <div className={`cursor-pointer p-2 ${activeTab === 'notifications' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => setActiveTab('notifications')}>Notification Settings</div>
      </div>
      <div className="w-full max-w-xl">
        {activeTab === 'ui' && (
          // UI settings content
          <div>UI settings go here</div>
        )}
        {activeTab === 'gameplay' && (
          // Gameplay settings content
          <div>Gameplay settings go here</div>
        )}
        {activeTab === 'account' && renderAccountSettings()}
        {activeTab === 'notifications' && (
          // Notification settings content
          <div>Notification settings go here</div>
        )}
      </div>
      <button
        className={`mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors`}
        onClick={handleSaveSettings}
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
