// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clients';
import paymentsReducer from './payments'
import loansReducer from './loans'
import loanReducer from './loan'
import clientReducer from './client'
export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    payments:paymentsReducer,
    loans:loansReducer,
    loan:loanReducer,
    client:clientReducer
  },
});