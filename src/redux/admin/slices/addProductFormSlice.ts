/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type initialStateType = {
  nameProduct: string;
  producer: string;
  mainDescription: string;
  description: string;
  category: string;

  // Additional
  features: string;
  purpose: string;
  components: string;
  additional: string;
  variants: Variant[];
  isActive: boolean;
  isBestseller: boolean;
};

export type Variant = {
  flavor: string;
  amount: string;
  unitType: string;
  price: string;
  inStock: boolean;
  discount: string;
  isMain?: boolean;
  images: string[];
};

const initialState: initialStateType = {
  isActive: true,
  isBestseller: false,

  nameProduct: "",
  producer: "",
  mainDescription: "",
  description: "",
  category: "",

  // Additional
  features: "",
  purpose: "",
  components: "",
  additional: "",

  variants: [
    {
      flavor: "",
      amount: "",
      unitType: "g",
      price: "",
      inStock: true,
      discount: "0",
      isMain: true,
      images: [],
    },
  ],
};

const addProductFormSlice = createSlice({
  name: "addProductFormSlice",
  initialState,
  reducers: {
    toggleActive: (state) => {
      state.isActive = !state.isActive;
    },

    toggleBestseller: (state) => {
      state.isBestseller = !state.isBestseller;
    },

    setField: (
      state,
      action: {
        payload: {
          field: keyof initialStateType;
          value: any;
        };
      }
    ) => {
      const { field, value } = action.payload;
      (state[field] as any) = value;
    },
    // Варіанти
    addVariant: (state) => {
      state.variants.push({
        flavor: "",
        amount: "",
        unitType: "g",
        price: "",
        inStock: true,
        discount: "0",
        isMain: false,
        images: [],
      });
    },

    removeVariant: (state, action: PayloadAction<number>) => {
      if (state.variants.length > 1) {
        state.variants.splice(action.payload, 1);
      }
    },

    updateVariant: <K extends keyof Variant>(
      state: initialStateType,
      action: PayloadAction<{ index: number; field: K; value: Variant[K] }>
    ) => {
      const { index, field, value } = action.payload;

      // Якщо оновлюється isMain
      if (field === "isMain") {
        // Вимикаємо у всіх інших
        state.variants = state.variants.map((v, i) => ({
          ...v,
          isMain: i === index ? Boolean(value) : false,
        }));
      } else {
        state.variants[index][field] = value;
      }
    },

    updateVariantImage : () => {},
    setDefaultValues: () => initialState,
  },
});

export const {
  setField,
  addVariant,
  removeVariant,
  updateVariant,
  toggleActive,
  toggleBestseller,
  setDefaultValues,
} = addProductFormSlice.actions;
export default addProductFormSlice.reducer;
