import { createSlice } from '@reduxjs/toolkit';

const persistSlice = createSlice({
   name: 'persist',
   initialState: JSON.parse(localStorage.getItem('persist')) || false,
   reducers: {
      togglePersist: (state, action) => !state,
   },
});

export const { togglePersist } = persistSlice.actions;

export default persistSlice.reducer;
