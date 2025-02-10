// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState =[];

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setpayments: (state,action) =>{
      return action.payload
    }
  ,
    add: (state,action) => {
      
        return [
            action.payload,
            ...state
        ]
    },
    remove: (state,action) => {
      return state.filter((payment)=>payment.id != action.payload)
    },
    
    edit: (state, action) => {
        return state.map((payment)=>payment.id == action.payload.id ? {
            ...payment,
            ...action.payload.data
        } : payment)
    },
  },
});

export const { add ,remove,edit,setpayments} = paymentsSlice.actions;

export default paymentsSlice.reducer;