import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import persistReducer from './persist/persistSlice';
import localStorageMiddleware from './localStorageMiddleware';

export const store = configureStore({
   reducer: {
      user: userReducer,
      persist: persistReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
