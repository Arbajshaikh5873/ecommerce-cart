import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "../slice/cartSlice";
import productsSliceReducer from "../slice/productsSlice";
import categoryReducer from "../slice/categorySlice";
// Configure Store
const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    products: productsSliceReducer,
  },
});

export default store;
