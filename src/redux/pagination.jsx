// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    page:1,
    limit:1,
    totalPages:1,
    
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setpagination: (state,action) =>{
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
      return state.filter((client)=>client.id != action.payload)
    },
    
    edit: (state, action) => {
        return state.map((client)=>client.id == action.payload.id ? {
            ...client,
            ...action.payload.data
        } : client)
    },
  },
});

export const { add ,remove,edit,setpagination} = paginationSlice.actions;

export default paginationSlice.reducer;