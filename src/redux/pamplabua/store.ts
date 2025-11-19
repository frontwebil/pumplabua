import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/uiSlice";
import productsSlice from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    uiSlice,
    productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
