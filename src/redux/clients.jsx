// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState =[];

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state,action) =>{
      console.log()
      console.log(action)
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

export const { add ,remove,edit,setClients} = clientsSlice.actions;

export default clientsSlice.reducer;