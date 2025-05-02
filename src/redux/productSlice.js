import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: JSON.parse(localStorage.getItem("products")) || [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("products", JSON.stringify(state.items));
    },
    addProduct: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("products", JSON.stringify(state.items));
      }
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.items));
    },
  },
});

export const { setProducts, addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
