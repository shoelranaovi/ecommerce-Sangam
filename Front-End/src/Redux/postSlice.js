import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllPost } = postSlice.actions;

export default postSlice.reducer;
