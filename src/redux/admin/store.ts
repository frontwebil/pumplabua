import { configureStore } from "@reduxjs/toolkit";
import addProductFormSlice from "./slices/addProductFormSlice";
import catalogSlice from "./slices/catalogSlice";
import editProductSlice from "./slices/EditProductSlice";

export const store = configureStore({
  reducer: {
    addProductFormSlice,
    catalogSlice,
    editProductSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "addProductFormSlice/setImages",
          "addProductFormSlice/reorderImages",
        ],
        ignoredPaths: [
          "addProductFormSlice.files",
          "editProductSlice.product.createdAt",
          "editProductSlice.product.updatedAt",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
