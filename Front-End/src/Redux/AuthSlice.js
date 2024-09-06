import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Auth: false,
  user: null,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setuserdetail: (state, action) => {
      state.Auth = true;
      state.user = action.payload;
    },
    setuserdetailfail: (state, action) => {
      state.Auth = false;
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setuserdetail, setuserdetailfail } = AuthSlice.actions;

export default AuthSlice.reducer;
