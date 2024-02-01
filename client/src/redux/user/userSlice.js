import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: null,
   token: null,
   error: null,
   loading: false,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userLoading: (state) => {
         state.loading = true;
      },
      userSuccess: (state, action) => {
         state.user = action.payload.user;
         state.token = action.payload.token;
         state.error = null;
         state.loading = false;
      },
      userError: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },
      userRemove: (state, action) => {
         state.user = null;
         state.loading = false;
         state.error = null;
      },
   },
});

export const { userLoading, userSuccess, userError, userRemove } = userSlice.actions;

export default userSlice.reducer;
