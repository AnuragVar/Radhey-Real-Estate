import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
  currentUser: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;

export default userSlice.reducer;
