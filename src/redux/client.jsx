// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState ={};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient: (state,action) =>{
      console.log()
      console.log(action)
      return action.payload
    }
  ,
   
edit: (state, action) => {
        return state.map((client)=>client.id == action.payload.id ? {
            ...client,
            ...action.payload.data
        } : client)
    },
  },
});

export const {edit,setClient} = clientSlice.actions;

export default clientSlice.reducer;