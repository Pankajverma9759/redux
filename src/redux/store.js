import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice";
import productsReducer from "./productSlice";
import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    orders: orderReducer,
  },
});

export default store;
