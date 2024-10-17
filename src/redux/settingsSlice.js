import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  fontSize: 'medium',
  showFPS: false,
  simulationSpeed: 1,
  autoSaveFrequency: 5,
  defaultGameMode: '1vAI',
  username: '',
  email: '',
  emailNotifications: true,
  inGameNotifications: true,
  notificationSound: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
