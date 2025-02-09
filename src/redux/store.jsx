// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clients';


export const store = configureStore({
  reducer: {
    clients: clientsReducer,
  },
});