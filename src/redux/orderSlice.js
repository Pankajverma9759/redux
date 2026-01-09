import { createSlice } from "@reduxjs/toolkit";

/* 🔹 Load orders from localStorage */
const loadOrders = () => {
  const data = localStorage.getItem("orders");
  return data ? JSON.parse(data) : [];
};

const initialState = {
  orders: loadOrders(),
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    clearOrders: (state) => {
      state.orders = [];
      localStorage.setItem("orders", JSON.stringify([]));
    },
  },
});

export const { placeOrder, deleteOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
