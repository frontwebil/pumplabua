import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/uiSlice";
import productsSlice from "./slices/productsSlice";
import productPageSlice from "./slices/productPageSlice";
import OrderProductsSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    uiSlice,
    productsSlice,
    productPageSlice,
    OrderProductsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
