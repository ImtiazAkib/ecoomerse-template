import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducers,
  },
});

export default store;
