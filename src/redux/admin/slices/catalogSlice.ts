import { Product, Variant } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  products: (Product & { variants: Variant[] })[];
};

const initialState: initialStateType = {
  products: [],
};

const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const { products } = action.payload;
      state.products = products;
    },
  },
});

export const { setProducts } = catalogSlice.actions;
export default catalogSlice.reducer;
