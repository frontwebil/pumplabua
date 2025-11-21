import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/uiSlice";
import productsSlice from "./slices/productsSlice";
import productPageSlice from "./slices/productPageSlice";

export const store = configureStore({
  reducer: {
    uiSlice,
    productsSlice,
    productPageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
