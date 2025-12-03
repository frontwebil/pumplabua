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

function hasDiscount(product: ProductType) {
  const main = getMainVariant(product);
  return main?.discount && main.discount > 0;
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

      // ----- GLOBAL TYPE -----
      state.globalTypeCount = countBy(
        data.filter((p: any) => p.type !== null),
        (p: any) => p.type as string
      );

      // Якщо ВСІ фільтри пусті → показуємо все і копіюємо глобальні лічильники
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

      // TOP SELLERS
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

      state.filteredTypeCount = countBy(
        afterCategory.filter((p) => p.type !== null),
        (p) => p.type as string
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

      state.filteredTypeCount = countBy(
        afterProducer.filter((p) => p.type !== null),
        (p) => p.type as string
      );

      // -------------------------
      // STEP 3: TYPE FILTER
      // -------------------------
      let afterType = afterProducer;

      if (state.typeSelectFilter.length > 0) {
        afterType = afterType.filter(
          (p) => p.type && state.typeSelectFilter.includes(p.type)
        );
      }

      // -------------------------
      // STEP 4: WEIGHT FILTER
      // -------------------------
      let final = afterType;

      if (state.weightSelectFilter.length > 0) {
        final = final.filter((p) => {
          const m = getMainVariant(p);
          if (m.unitType === "size") return false;
          return state.weightSelectFilter.includes(`${m.amount}${m.unitType}`);
        });
      }

      // -------------------------
      // DISCOUNT
      // -------------------------
      if (state.discountOnly) {
        final = final.filter((p) => {
          const m = getMainVariant(p);
          return m.discount && m.discount > 0;
        });
      }

      // ✅ ПЕРЕРАХУНОК
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
        final.filter((p) => p.type !== null),
        (p) => p.type as string
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

      state.filteredTypeCount = countBy(
        filtered.filter((p) => p.type !== null),
        (p) => p.type as string
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

      // TYPE
      if (state.typeSelectFilter.length > 0) {
        final = final.filter(
          (p) => p.type && state.typeSelectFilter.includes(p.type)
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

      // DISCOUNT
      if (state.discountOnly) {
        final = final.filter((p) => {
          const m = getMainVariant(p);
          return m.discount && m.discount > 0;
        });
      }

      // ✅ ПЕРЕЗАПИС filteredProducts
      state.filteredProducts = final;

      // ✅ ПЕРЕРАХУНОК ЛІЧИЛЬНИКІВ
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
        final.filter((p) => p.type !== null),
        (p) => p.type as string
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
