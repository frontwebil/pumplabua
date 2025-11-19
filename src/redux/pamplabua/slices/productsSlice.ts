import { Product, Variant } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  topSellersProducts: (Product & { variants: Variant[] })[];
  products: (Product & { variants: Variant[] })[];
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
        (product) => product.isBestseller == true
      );

      state.topSellersProducts = bestSellers;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
