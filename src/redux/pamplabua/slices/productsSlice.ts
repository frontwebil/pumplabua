import { Product, Variant } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type ProductType = Product & { variants: Variant[] };

type initialStateType = {
  topSellersProducts: (Product & { variants: Variant[] })[];
  products: ProductType[];
  categoryCount: Record<string, number>;
  producerCount: Record<string, number>;
  weightCount: Record<string, number>;
  searchProducts: ProductType[];
};

const initialState: initialStateType = {
  topSellersProducts: [],
  products: [],

  categoryCount: {},
  producerCount: {},
  weightCount: {},

  searchProducts: [],
};

function getMainVariant(product: ProductType) {
  return product.variants.find((v) => v.isMain) || product.variants[0];
}

function countBy<T>(arr: T[], key: keyof T): Record<string, number> {
  return arr.reduce((acc, item) => {
    const value = String(item[key]);
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function countVariantWeight(products: ProductType[]): Record<string, number> {
  return products
    .flatMap((p) =>
      p.variants.map((v) => ({
        weight: `${v.amount} ${v.unitType}`,
      }))
    )
    .reduce((acc, item) => {
      acc[item.weight] = (acc[item.weight] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
}

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

      state.categoryCount = countBy(data, "category");
      state.producerCount = countBy(data, "producer");
      state.weightCount = countVariantWeight(data);

      state.topSellersProducts = bestSellers;
    },
    searchProduct: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      const baseList: ProductType[] = state.products;

      if (action.payload === "") {
        state.searchProducts = [];
      } else {
        const filtered = baseList.filter((prod) =>
          prod.name.toLowerCase().includes(searchTerm)
        );

        filtered.sort((a, b) => {
          // 1 — активні спочатку
          if (a.isActive !== b.isActive) {
            return Number(b.isActive) - Number(a.isActive);
          }

          const mainA = getMainVariant(a);
          const mainB = getMainVariant(b);

          const discA = Number(mainA.discount) || 0;
          const discB = Number(mainB.discount) || 0;

          return discB - discA;
        });

        state.searchProducts = filtered;
      }
    },
  },
});

export const { setProducts, searchProduct } = productsSlice.actions;

export default productsSlice.reducer;
