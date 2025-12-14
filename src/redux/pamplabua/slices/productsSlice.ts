/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, Variant } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type ProductType = Product & { variants: Variant[] };

type FilterKeys =
  | "categorySelectFilters"
  | "producerSelectFilter"
  | "weightSelectFilter"
  | "typeSelectFilter";

type initialStateType = {
  products: ProductType[];
  filteredProducts: ProductType[];
  discountOnly: boolean;

  categorySelectFilters: string[];
  producerSelectFilter: string[];
  weightSelectFilter: string[];
  typeSelectFilter: string[];

  globalCategoryCount: Record<string, number>;
  globalProducerCount: Record<string, number>;
  globalWeightCount: Record<string, number>;
  globalTypeCount: Record<string, number>;

  filteredCategoryCount: Record<string, number>;
  filteredProducerCount: Record<string, number>;
  filteredWeightCount: Record<string, number>;
  filteredTypeCount: Record<string, number>;

  topSellersProducts: ProductType[];
  searchProducts: ProductType[];
};

const initialState: initialStateType = {
  products: [],
  filteredProducts: [],
  discountOnly: false,

  categorySelectFilters: [],
  producerSelectFilter: [],
  weightSelectFilter: [],
  typeSelectFilter: [],

  globalCategoryCount: {},
  globalProducerCount: {},
  globalWeightCount: {},
  globalTypeCount: {},

  filteredCategoryCount: {},
  filteredProducerCount: {},
  filteredWeightCount: {},
  filteredTypeCount: {},

  topSellersProducts: [],
  searchProducts: [],
};

export const UNIT_LABELS: Record<string, string> = {
  g: "г",
  kg: "кг",
  ml: "мл",
  l: "літри",
  pcs: "шт",
  caps: "капсул",
  size: "розмір",
  tabs: "табл",
  gum: "жувальні",
};

// ================= HELPERS =================
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

// ✅ ЄДИНА НОВА ЛОГІКА
function isValidType(type: string | null | undefined) {
  return typeof type === "string" && type.trim() !== "";
}

// ================= SLICE =================
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

      state.globalCategoryCount = countBy(data, (p: any) => p.category);
      state.globalProducerCount = countBy(data, (p: any) => p.producer);

      const weights = data
        .map((p: any) => {
          const m = getMainVariant(p);
          if (m.unitType === "size") return null;
          return `${m.amount}${m.unitType}`;
        })
        .filter(Boolean) as string[];

      state.globalWeightCount = countBy(weights, (w) => w);

      // ✅ FIX
      state.globalTypeCount = countBy(
        data.filter((p: any) => isValidType(p.type)),
        (p: any) => p.type.trim()
      );

      if (
        state.categorySelectFilters.length === 0 &&
        state.producerSelectFilter.length === 0 &&
        state.weightSelectFilter.length === 0 &&
        state.typeSelectFilter.length === 0 &&
        !state.discountOnly
      ) {
        state.filteredProducts = data;
        state.filteredCategoryCount = state.globalCategoryCount;
        state.filteredProducerCount = state.globalProducerCount;
        state.filteredWeightCount = state.globalWeightCount;
        state.filteredTypeCount = state.globalTypeCount;
      }

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

      state.searchProducts = state.products.filter((p) =>
        p.name.toLowerCase().includes(term)
      );
    },

    // ============================
    // 3) MAIN FILTER ACTION
    // ============================
    setFilters: (state, action) => {
      const { value, filters }: { value: string; filters: FilterKeys } =
        action.payload;

      const arr = state[filters];
      state[filters] = arr.includes(value)
        ? arr.filter((el) => el !== value)
        : [...arr, value];

      let final = state.products;

      if (state.categorySelectFilters.length > 0) {
        final = final.filter((p) =>
          state.categorySelectFilters.includes(p.category)
        );
      }

      if (state.producerSelectFilter.length > 0) {
        final = final.filter((p) =>
          state.producerSelectFilter.includes(p.producer)
        );
      }

      // ✅ FIX
      if (state.typeSelectFilter.length > 0) {
        final = final.filter(
          (p) =>
            isValidType(p.type) &&
            state.typeSelectFilter.includes(p.type.trim())
        );
      }

      if (state.weightSelectFilter.length > 0) {
        final = final.filter((p) => {
          const m = getMainVariant(p);
          if (m.unitType === "size") return false;
          return state.weightSelectFilter.includes(`${m.amount}${m.unitType}`);
        });
      }

      if (state.discountOnly) {
        final = final.filter((p) => {
          const m = getMainVariant(p);
          return m.discount && m.discount > 0;
        });
      }

      state.filteredProducts = final;
      state.filteredCategoryCount = countBy(final, (p) => p.category);
      state.filteredProducerCount = countBy(final, (p) => p.producer);

      const finalWeights = final
        .map((p) => {
          const m = getMainVariant(p);
          if (m.unitType === "size") return null;
          return `${m.amount}${m.unitType}`;
        })
        .filter(Boolean) as string[];

      state.filteredWeightCount = countBy(finalWeights, (w) => w);

      state.filteredTypeCount = countBy(
        final.filter((p) => isValidType(p.type)),
        (p) => p.type.trim()
      );
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

      const weights = filtered
        .map((p) => {
          const m = getMainVariant(p);
          if (m.unitType === "size") return null;
          return `${m.amount}${m.unitType}`;
        })
        .filter(Boolean) as string[];

      state.filteredWeightCount = countBy(weights, (w) => w);

      state.filteredTypeCount = countBy(
        filtered.filter((p) => isValidType(p.type)),
        (p) => p.type.trim()
      );
    },

    resetFilters: (state) => {
      state.categorySelectFilters = [];
      state.producerSelectFilter = [];
      state.weightSelectFilter = [];
      state.typeSelectFilter = [];
      state.discountOnly = false;

      state.filteredProducts = state.products;
      state.filteredCategoryCount = state.globalCategoryCount;
      state.filteredProducerCount = state.globalProducerCount;
      state.filteredWeightCount = state.globalWeightCount;
      state.filteredTypeCount = state.globalTypeCount;
    },

    toggleDiscountOnly: (state) => {
      state.discountOnly = !state.discountOnly;

      let final = state.products;

      // CATEGORY
      if (state.categorySelectFilters.length > 0) {
        final = final.filter((p) =>
          state.categorySelectFilters.includes(p.category)
        );
      }

      // PRODUCER
      if (state.producerSelectFilter.length > 0) {
        final = final.filter((p) =>
          state.producerSelectFilter.includes(p.producer)
        );
      }

      // TYPE ✅
      if (state.typeSelectFilter.length > 0) {
        final = final.filter(
          (p) =>
            isValidType(p.type) &&
            state.typeSelectFilter.includes(p.type.trim())
        );
      }

      // WEIGHT
      if (state.weightSelectFilter.length > 0) {
        final = final.filter((p) => {
          const m = getMainVariant(p);
          if (m.unitType === "size") return false;
          return state.weightSelectFilter.includes(`${m.amount}${m.unitType}`);
        });
      }

      // DISCOUNT ✅
      if (state.discountOnly) {
        final = final.filter((p) => {
          const m = getMainVariant(p);
          return m.discount && m.discount > 0;
        });
      }

      // 🔁 ПЕРЕЗАПИС
      state.filteredProducts = final;

      // 🔁 ЛІЧИЛЬНИКИ
      state.filteredCategoryCount = countBy(final, (p) => p.category);
      state.filteredProducerCount = countBy(final, (p) => p.producer);

      const weights = final
        .map((p) => {
          const m = getMainVariant(p);
          if (m.unitType === "size") return null;
          return `${m.amount}${m.unitType}`;
        })
        .filter(Boolean) as string[];

      state.filteredWeightCount = countBy(weights, (w) => w);

      state.filteredTypeCount = countBy(
        final.filter((p) => isValidType(p.type)),
        (p) => p.type.trim()
      );
    },
  },
});

export const {
  setProducts,
  searchProduct,
  setFilters,
  setFiltersFromLink,
  resetFilters,
  toggleDiscountOnly,
} = productsSlice.actions;

export default productsSlice.reducer;
