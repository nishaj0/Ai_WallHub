import { createSlice } from '@reduxjs/toolkit';

const persistSlice = createSlice({
   name: 'persist',
   initialState: JSON.parse(localStorage.getItem('persist')) || false,
   reducers: {
      togglePersist: (state, action) => !state,
      setPersistFalse: (state, action) => false,
   },
});

export const { togglePersist, setPersistFalse } = persistSlice.actions;

export default persistSlice.reducer;
