/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, Variant } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type ProductType = Product & { variants: Variant[] };

type FilterKeys =
  | "categorySelectFilters"
  | "producerSelectFilter"
  | "weightSelectFilter";

type initialStateType = {
  products: ProductType[];
  filteredProducts: ProductType[];

  categorySelectFilters: string[];
  producerSelectFilter: string[];
  weightSelectFilter: string[];

  globalCategoryCount: Record<string, number>;
  globalProducerCount: Record<string, number>;
  globalWeightCount: Record<string, number>;

  filteredCategoryCount: Record<string, number>;
  filteredProducerCount: Record<string, number>;
  filteredWeightCount: Record<string, number>;

  topSellersProducts: ProductType[];
  searchProducts: ProductType[];
};

const initialState: initialStateType = {
  products: [],
  filteredProducts: [],

  categorySelectFilters: [],
  producerSelectFilter: [],
  weightSelectFilter: [],

  globalCategoryCount: {},
  globalProducerCount: {},
  globalWeightCount: {},

  filteredCategoryCount: {},
  filteredProducerCount: {},
  filteredWeightCount: {},

  topSellersProducts: [],
  searchProducts: [],
};

function countBy<T>(
  arr: T[],
  keyFn: (item: T) => string
): Record<string, number> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function getMainVariant(product: ProductType) {
  return product.variants.find((v) => v.isMain) || product.variants[0];
}

export const productsSlice = createSlice({
  name: "Products Slice",
  initialState,
  reducers: {
    // ============================
    // 1) PRODUCTS LOADED
    // ============================
    setProducts: (state, action) => {
      const data = action.payload || [];
      state.products = data;

      // ----- GLOBAL CATEGORY -----
      state.globalCategoryCount = countBy(data, (p: any) => p.category);

      // ----- GLOBAL PRODUCER -----
      state.globalProducerCount = countBy(data, (p: any) => p.producer);

      // ----- GLOBAL WEIGHT (SKIP "size") -----
      const weights = data
        .map((p: any) => {
          const m = getMainVariant(p);
          if (m.unitType === "size") return null;
          return `${m.amount}${m.unitType}`;
        })
        .filter(Boolean) as string[];

      state.globalWeightCount = countBy(weights, (w) => w);

      // If filters empty → show all
      if (
        state.categorySelectFilters.length === 0 &&
        state.producerSelectFilter.length === 0 &&
        state.weightSelectFilter.length === 0
      ) {
        state.filteredProducts = data;
        state.filteredCategoryCount = state.globalCategoryCount;
        state.filteredProducerCount = state.globalProducerCount;
        state.filteredWeightCount = state.globalWeightCount;
      }

      // Tops
      state.topSellersProducts = data.filter((p: any) => p.isBestseller);
    },

    // ============================
    // 2) SEARCH
    // ============================
    searchProduct: (state, action) => {
      const term = action.payload.toLowerCase();
      if (!term) {
        state.searchProducts = [];
        return;
      }

      const filtered = state.products
        .filter((p) => p.name.toLowerCase().includes(term))
        .sort((a, b) => {
          if (a.isActive !== b.isActive)
            return Number(b.isActive) - Number(a.isActive);

          const A = getMainVariant(a);
          const B = getMainVariant(b);

          return (Number(B.discount) || 0) - (Number(A.discount) || 0);
        });

      state.searchProducts = filtered;
    },

    // ============================
    // 3) MAIN FILTER ACTION
    // ============================
    setFilters: (state, action) => {
      const { value, filters }: { value: string; filters: FilterKeys } =
        action.payload;

      const arr = state[filters];

      // toggle
      if (arr.includes(value)) {
        state[filters] = arr.filter((el) => el !== value);
      } else {
        state[filters].push(value);
      }

      // -------------------------
      // STEP 1: CATEGORY FILTER
      // -------------------------
      let afterCategory = state.products;

      if (state.categorySelectFilters.length > 0) {
        afterCategory = afterCategory.filter((p) =>
          state.categorySelectFilters.includes(p.category)
        );
      }

      state.filteredProducerCount = countBy(afterCategory, (p) => p.producer);

      state.filteredWeightCount = countBy(
        afterCategory
          .map((p) => {
            const m = getMainVariant(p);
            if (m.unitType === "size") return null;
            return `${m.amount}${m.unitType}`;
          })
          .filter(Boolean) as string[],
        (w) => w
      );

      // -------------------------
      // STEP 2: PRODUCER FILTER
      // -------------------------
      let afterProducer = afterCategory;

      if (state.producerSelectFilter.length > 0) {
        afterProducer = afterProducer.filter((p) =>
          state.producerSelectFilter.includes(p.producer)
        );
      }

      state.filteredCategoryCount = countBy(afterProducer, (p) => p.category);

      state.filteredWeightCount = countBy(
        afterProducer
          .map((p) => {
            const m = getMainVariant(p);
            if (m.unitType === "size") return null;
            return `${m.amount}${m.unitType}`;
          })
          .filter(Boolean) as string[],
        (w) => w
      );

      // -------------------------
      // STEP 3: WEIGHT FILTER
      // -------------------------
      let final = afterProducer;

      if (state.weightSelectFilter.length > 0) {
        final = final.filter((p) => {
          const m = getMainVariant(p);
          if (m.unitType === "size") return false;
          return state.weightSelectFilter.includes(`${m.amount}${m.unitType}`);
        });
      }

      state.filteredProducts = final;
    },

    // ============================
    // 4) FILTER FROM LINK
    // ============================
    setFiltersFromLink: (state, action) => {
      state.categorySelectFilters = action.payload;

      let filtered = state.products;

      if (state.categorySelectFilters.length > 0) {
        filtered = filtered.filter((p) =>
          state.categorySelectFilters.includes(p.category)
        );
      }

      state.filteredProducts = filtered;
      state.filteredCategoryCount = countBy(filtered, (p) => p.category);
      state.filteredProducerCount = countBy(filtered, (p) => p.producer);

      state.filteredWeightCount = countBy(
        filtered
          .map((p) => {
            const m = getMainVariant(p);
            if (m.unitType === "size") return null;
            return `${m.amount}${m.unitType}`;
          })
          .filter(Boolean) as string[],
        (w) => w
      );
    },
  },
});

export const { setProducts, searchProduct, setFilters, setFiltersFromLink } =
  productsSlice.actions;

export default productsSlice.reducer;
