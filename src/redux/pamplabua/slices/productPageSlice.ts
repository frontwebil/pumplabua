import { Product, Variant } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductSafe = Omit<Product, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
  variants: Variant[];
};

type ProductPageState = {
  selectedVariant: Variant | null;
  currentProduct: ProductSafe | null;
  quantityProduct: number;
  lastProductId: string | null; // 🆕
};

const initialState: ProductPageState = {
  selectedVariant: null,
  currentProduct: null,
  quantityProduct: 1,
  lastProductId: null, // 🆕
};

export const productPageSlice = createSlice({
  name: "productPageSlice",
  initialState,
  reducers: {
    setCurrentProduct(state, action: PayloadAction<ProductSafe>) {
      const product = action.payload;

      // 🛑 якщо product той самий — нічого не міняємо
      if (state.currentProduct?.id === product.id) {
        return;
      }

      // 🟢 інакше оновлюємо
      state.currentProduct = product;

      const main =
        product.variants.find((v) => v.isMain) ?? product.variants[0];

      state.selectedVariant = main;
    },

    setSelectedVariant(state, action: PayloadAction<Variant>) {
      state.selectedVariant = action.payload;
    },

    setQuantity(state, action) {
      state.quantityProduct = action.payload;
    },

    resetVariant(state) {
      state.selectedVariant = null;
      state.currentProduct = null;
      state.quantityProduct = 1;
      state.lastProductId = null; // 🆕 важливо
    },
  },
});

export const {
  setCurrentProduct,
  setSelectedVariant,
  resetVariant,
  setQuantity,
} = productPageSlice.actions;

export default productPageSlice.reducer;
