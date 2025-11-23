import { Product, Variant } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type ProductType = Product & { variants: Variant[] };

// ключі-фільтри
type FilterKeys = "categorySelectFilters" | "producerSelectFilter";

type initialStateType = {
  products: ProductType[];
  filteredProducts: ProductType[];

  // головні фільтри
  categorySelectFilters: string[];
  producerSelectFilter: string[];

  // ГЛОБАЛЬНІ лічильники — не змінюються
  globalCategoryCount: Record<string, number>;
  globalProducerCount: Record<string, number>;

  // ДИНАМІЧНІ — змінюються після фільтрації
  filteredCategoryCount: Record<string, number>;
  filteredProducerCount: Record<string, number>;

  topSellersProducts: ProductType[];
  searchProducts: ProductType[];
};

const initialState: initialStateType = {
  products: [],
  filteredProducts: [],

  categorySelectFilters: [],
  producerSelectFilter: [],

  globalCategoryCount: {},
  globalProducerCount: {},

  filteredCategoryCount: {},
  filteredProducerCount: {},

  topSellersProducts: [],
  searchProducts: [],
};

function countBy<T>(arr: T[], key: keyof T): Record<string, number> {
  return arr.reduce((acc, item) => {
    const value = String(item[key]);
    acc[value] = (acc[value] || 0) + 1;
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
    // ------------------------
    // 1) Коли продукти приходять з API
    // ------------------------
    setProducts: (state, action) => {
      const data = action.payload || [];

      state.products = data;
      
      if (
        state.categorySelectFilters.length === 0 &&
        state.producerSelectFilter.length === 0
      ) {
        state.filteredProducts = data;
      }

      // ГЛОБАЛЬНІ підрахунки — стабільні
      state.globalCategoryCount = countBy(data, "category");
      state.globalProducerCount = countBy(data, "producer");

      // початкові filtered
      state.filteredCategoryCount = countBy(data, "category");
      state.filteredProducerCount = countBy(data, "producer");

      // топи
      state.topSellersProducts = data.filter(
        (product: ProductType) => product.isBestseller === true
      );
    },

    // ------------------------
    // 2) Пошук
    // ------------------------
    searchProduct: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      const baseList: ProductType[] = state.products;

      if (!searchTerm) {
        state.searchProducts = [];
        return;
      }

      const filtered = baseList
        .filter((prod) => prod.name.toLowerCase().includes(searchTerm))
        .sort((a, b) => {
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
    },

    // ------------------------
    // 3) Toggle фільтрів (категорія, виробник)
    // ------------------------
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

      // ------------------------
      // ФІЛЬТРАЦІЯ
      // ------------------------
      let result = [...state.products];

      // фільтр по категоріям (головний)
      if (state.categorySelectFilters.length > 0) {
        result = result.filter((p) =>
          state.categorySelectFilters.includes(p.category)
        );
      }

      // фільтр по виробникам
      if (state.producerSelectFilter.length > 0) {
        result = result.filter((p) =>
          state.producerSelectFilter.includes(p.producer)
        );
      }

      // зберігаємо
      state.filteredProducts = result;

      // ДИНАМІЧНІ підрахунки
      state.filteredCategoryCount = countBy(result, "category");
      state.filteredProducerCount = countBy(result, "producer");
    },
    setFiltersFromLink: (state, action) => {
      const filters = action.payload;
      // ставимо категорії
      state.categorySelectFilters = filters;

      // ------------------------
      // запускаємо фільтрацію
      // ------------------------
      let result = [...state.products];

      if (state.categorySelectFilters.length > 0) {
        result = result.filter((p) =>
          state.categorySelectFilters.includes(p.category)
        );
      }

      if (state.producerSelectFilter.length > 0) {
        result = result.filter((p) =>
          state.producerSelectFilter.includes(p.producer)
        );
      }

      // зберігаємо
      state.filteredProducts = result;

      // оновлюємо лічильники
      state.filteredCategoryCount = countBy(result, "category");
      state.filteredProducerCount = countBy(result, "producer");
    },
  },
});

export const { setProducts, searchProduct, setFilters, setFiltersFromLink } =
  productsSlice.actions;

export default productsSlice.reducer;
