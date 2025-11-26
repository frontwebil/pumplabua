import { Product, Variant } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type OrderProductsSafe = Omit<Product, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
  selectedVariant: Variant;
  quantityProduct: number;
};

type InitialStateType = {
  orderProducts: OrderProductsSafe[];
};

const initialState: InitialStateType = {
  orderProducts:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],
};

const saveToLocalStorage = (state: InitialStateType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state.orderProducts));
  }
};

export const OrderProductsSlice = createSlice({
  name: "OrderProductsSlice",
  initialState,
  reducers: {
    addProductToOrders: (state, action) => {
      const product: OrderProductsSafe = action.payload;
      const isInOrderIndex = state.orderProducts.findIndex(
        (el) => el.selectedVariant.id === product.selectedVariant.id
      );

      if (isInOrderIndex >= 0) {
        state.orderProducts[isInOrderIndex].quantityProduct +=
          product.quantityProduct;
      } else {
        state.orderProducts.push(product);
      }
      saveToLocalStorage(state);
    },
    removeQuantityProduct: (state, action) => {
      const index = action.payload;

      if (index < 0 || index >= state.orderProducts.length) return;

      state.orderProducts[index].quantityProduct -= 1;
      if (state.orderProducts[index].quantityProduct <= 0) {
        state.orderProducts.splice(index, 1);
      }
      saveToLocalStorage(state);
    },
    addQuantityProduct: (state, action) => {
      const index = action.payload;

      if (index < 0 || index >= state.orderProducts.length) return;

      state.orderProducts[index].quantityProduct += 1;

      saveToLocalStorage(state);
    },
  },
});

export const { addProductToOrders, addQuantityProduct, removeQuantityProduct } =
  OrderProductsSlice.actions;
export default OrderProductsSlice.reducer;
