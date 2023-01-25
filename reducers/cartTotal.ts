// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

// create the initial state, similar to useState()
const initialState = {
  value: 0,
};

export const cartTotalSlice = createSlice({
  name: "cartTotal",
  initialState,
  reducers: {
    // add an article's cost to the cart
    addArticlePrice: (state, action) => {
      state.value += parseInt(action.payload.price);
    },
    // remove an article from the cart
    removeArticlePrice: (state, action) => {
      state.value -= parseInt(action.payload.price);
    },
    resetCartTotal: (state, action) => {
      state.value = 0;
    },
  },
});

export const { addArticlePrice, removeArticlePrice, resetCartTotal } = cartTotalSlice.actions;
export default cartTotalSlice.reducer;