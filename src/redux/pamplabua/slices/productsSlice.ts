import { Product, Variant } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type ProductType = Product & { variants: Variant[] };

type initialStateType = {
  topSellersProducts: (Product & { variants: Variant[] })[];
  products: ProductType[];
};

const initialState: initialStateType = {
  topSellersProducts: [],
  products: [],
};

const productsSlice = createSlice({
  name: "Products Slice",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const data = action.payload;
      state.products = data;
      if (!data) return;

      const bestSellers = data.filter(
        (product: ProductType) => product.isBestseller == true
      );

      state.topSellersProducts = bestSellers;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
