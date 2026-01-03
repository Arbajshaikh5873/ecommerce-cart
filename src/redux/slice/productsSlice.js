import { createSlice } from "@reduxjs/toolkit";

// Products Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    total: 0,
    loading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload.products;
      state.total = action.payload.total;
      state.loading = false;
    },
    setProductsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setProductsLoading } = productsSlice.actions;

export default productsSlice.reducer;
