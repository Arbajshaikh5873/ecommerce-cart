import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    cartList: [],
    productList: [],
    total: 0,
    totalPrice: null,
  },
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload.products;
      state.total = action.payload.total;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    addToCart: (state, action) => {
      state.cartList.push(action.payload);
      state.totalPrice = state.cartList.reduce(
        (totalPrice, item) => (totalPrice += item.price)
      );
    },
    removeFromCart: (state, action) => {
      // remove product
      state.cartList = state.cartList.filter(
        (item) => item._id != action.payload._id
      );

      // update price
      const item = state.cartList.find(action.payload);
      const price = item.quantity * item.price;
      state.totalPrice -= price;
    },
    IncrementQuantity: (state, action) => {
      state.cartList = state.cartList.map((item) => {
        if (item._id == action.payload._id) {
          item.quantity += 1;
          state.totalPrice += item.price;
        }
        return item;
      });
    },
    decrementQuantity: (state, action) => {
      state.cartList = state.cartList.map((item) => {
        if (item._id == action.payload._id) {
          item.quantity -= 1;
          state.totalPrice -= item.price;
        }

        return item;
      });
    },
  },
});

export const {
  setProductList,
  addToCart,
  removeFromCart,
  IncrementQuantity,
  decrementQuantity,
} = ProductSlice.actions;
export default ProductSlice.reducer;
