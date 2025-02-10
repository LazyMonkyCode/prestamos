// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState ={};

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setLoan: (state,action) =>{
      console.log()
      console.log(action)
      return action.payload
    }
  ,
   
edit: (state, action) => {
        return state.map((loan)=>loan.id == action.payload.id ? {
            ...loan,
            ...action.payload.data
        } : loan)
    },
  },
});

export const {edit,setLoan} = loanSlice.actions;

export default loanSlice.reducer;