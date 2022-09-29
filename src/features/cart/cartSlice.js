import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  myItems: [],
  amount: [],
  totalAmount: 0,
  total: 0,
  user: {},
  isLoading: false,
};

const url = "https://dummyjson.com/products";

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAmount: (state, action) => {
      state.totalAmount = state.totalAmount + 1;
    },
    addToCart: (state, action) => {
      //   console.log(action);
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      state.myItems.push(cartItem);
      if (state.amount.length === 0) {
        state.amount.push({ product: cartItem, amount: 1 });
      } else if (
        state.amount.length !== 0 &&
        !state.amount.find((item) => item.product.id === action.payload.id)
      ) {
        state.amount.push({ product: cartItem, amount: 1 });
      } else if (
        state.amount.length !== 0 &&
        state.amount.find((item) => item.product.id === action.payload.id)
      ) {
        const item = state.amount.find(
          (item) => item.product.id === action.payload.id
        );
        item.amount = item.amount + 1;
      }
    },
    calculateTotal: (state) => {
      let total = 0;
      state.amount.map(
        (item) => (total = total + item.product.price * item.amount)
      );
      state.total = total;
    },
    clearCartItem: (state, action) => {
      const itemId = action.payload;
      state.amount = state.amount.filter((item) => item.id !== itemId);
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.products;
    },
  },
});

export const { cartAmount, addToCart, calculateTotal, clearCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
