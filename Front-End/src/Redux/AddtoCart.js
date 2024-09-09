import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      console.log(action.payload);

      state.cart = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtocart } = cartSlice.actions;

export default cartSlice.reducer;
