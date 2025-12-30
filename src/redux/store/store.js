import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../slice/productSlice";
const store = configureStore({
  reducer: {
    product: ProductReducer,
  },
});

export default store;
