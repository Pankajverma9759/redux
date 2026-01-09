import { createSlice } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem("cart"));

    // SAFETY CHECK
    if (data && Array.isArray(data.items)) {
      return data;
    }
  } catch (err) {
    console.log("Cart localStorage error", err);
  }

  return { items: [], value: 0 };
};

const initialState = getCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.value = state.items.length;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.value = state.items.length;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearAllItem: (state) => {
      state.items = [];
      state.value = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, clearAllItem } = cartSlice.actions;
export default cartSlice.reducer;
