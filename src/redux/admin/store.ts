import { configureStore } from "@reduxjs/toolkit";
import addProductFormSlice from "./slices/addProductFormSlice";

export const store = configureStore({
  reducer: {
    addProductFormSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "addProductFormSlice/setImages",
          "addProductFormSlice/reorderImages",
        ],
        ignoredPaths: ["addProductFormSlice.files"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
