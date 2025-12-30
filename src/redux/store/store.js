import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../slice/productSlice";
import pageReducer from "../slice/pageSlice";
import categoryReducer from "../slice/categorySlice";
const store = configureStore({
  reducer: {
    product: ProductReducer,
    page: pageReducer,
    category: categoryReducer,
  },
});

export default store;
