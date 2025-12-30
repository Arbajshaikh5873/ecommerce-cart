import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    page: 0,
  },
  reducers: {
    next: (state, action) => {
      state.page += 1;
    },
    previous: (state, action) => {
      state.page -= 1;
    },
    setPageValue: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { next, previous, setPageValue } = pageSlice.actions;
export default pageSlice.reducer;
