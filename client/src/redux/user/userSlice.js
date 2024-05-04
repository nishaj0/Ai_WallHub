import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: null,
   userId: null,
   token: null,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload.user;
         state.userId = action.payload.userId;
         state.token = action.payload.token;
      },
      removeUser: (state, action) => {
         state.user = null;
         state.userId = null;
         state.token = null;
      },
   },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
