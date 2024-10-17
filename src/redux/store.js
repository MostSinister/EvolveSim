import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    user: userReducer,
  },
});

// Add this for debugging
store.subscribe(() => console.log('Redux state:', store.getState()));
