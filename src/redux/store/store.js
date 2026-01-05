import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "../slice/cartSlice";
import productsSliceReducer from "../slice/productsSlice";
import categoryReducer from "../slice/categorySlice";
import authSliceReducer from "../slice/authSlice";
// Configure Store
const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    products: productsSliceReducer,
    category: categoryReducer,
    auth: authSliceReducer,
  },
});

export default store;
