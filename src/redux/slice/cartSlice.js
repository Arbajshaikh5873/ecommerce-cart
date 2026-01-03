import { createSlice } from "@reduxjs/toolkit";

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    coupon: null,
    loading: false,
  },
  reducers: {
    loadCart: (state, action) => {
      state.items = action.payload.items || [];
      state.coupon = action.payload.coupon || null;
      state.loading = false;
    },
    addToCart: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push({ ...action.payload, quantity: 1 });
        saveCartToStorage(state);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartToStorage(state);
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToStorage(state);
      }
    },
    applyCoupon: (state, action) => {
      state.coupon = action.payload;
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      saveCartToStorage(state);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Helper function to save cart to storage
const saveCartToStorage = (state) => {
  if (typeof window !== "undefined" && window.Storage) {
    const cartData = {
      items: state.items,
      coupon: state.coupon,
    };
    window.Storage.set("cart", JSON.stringify(cartData), false).catch(
      console.error
    );
  }
};

export const {
  loadCart,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  applyCoupon,
  clearCart,
  setLoading,
} = cartSlice.actions;

export default cartSlice.reducer;
