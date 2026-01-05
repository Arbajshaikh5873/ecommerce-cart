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
      const { product, userId } = action.payload;
      const exists = state.items.find((item) => item.id === product.id);
      if (!exists) {
        state.items.push({ ...product, quantity: 1 });
        saveCartToStorage(state, userId);
      }
    },
    removeFromCart: (state, action) => {
      const { id, userId } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveCartToStorage(state, userId);
    },
    incrementQuantity: (state, action) => {
      const { id, userId } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
        saveCartToStorage(state, userId);
      }
    },
    decrementQuantity: (state, action) => {
      const { id, userId } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToStorage(state, userId);
      }
    },
    applyCoupon: (state, action) => {
      const { code, percentage, userId } = action.payload;
      state.coupon = { code, percentage };
      saveCartToStorage(state, userId);
    },
    clearCart: (state, action) => {
      state.items = [];
      state.coupon = null;
      saveCartToStorage(state, action.payload?.userId);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// // Helper function to save cart to storage
// const saveCartToStorage = (state) => {
//   if (typeof window != "undefined" && window.Storage) {
//     const cartData = {
//       items: state.items,
//       coupon: state.coupon,
//     };
//     window.Storage.set("cart", JSON.stringify(cartData), false).catch(
//       console.error
//     );
//   } else {
//     console.log("cart not stored into the localstorage");
//   }
// };

const saveCartToStorage = (state, userId = null) => {
  if (typeof window !== "undefined") {
    const cartData = {
      items: state.items,
      coupon: state.coupon,
    };

    try {
      const storageKey = userId ? `cart_${userId}` : "cart";
      localStorage.setItem(storageKey, JSON.stringify(cartData));
    } catch (error) {
      console.error("Failed to save cart", error);
    }
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
