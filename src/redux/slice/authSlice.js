import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
    },
    loadUser: (state) => {
      const user = localStorage.getItem("currentUser");
      if (user) {
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
  },
});

export const { login, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
