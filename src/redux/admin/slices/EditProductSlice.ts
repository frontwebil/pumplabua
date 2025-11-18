/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Variant = {
  flavor: string;
  amount: string;
  unitType: string;
  price: string;
  inStock: boolean;
  discount: string;
  isMain?: boolean;
};

export type initialStateType = {
  product: Product & { variants: Variant[] };
};

const initialState: initialStateType = {
  product: {
    id: "",
    name: "",
    producer: "",
    mainDescription: "",
    description: null,
    category: "",
    features: null,
    purpose: null,
    components: null,
    additional: null,
    images: [],
    isActive: false,
    isBestseller: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    variants: [],
  },
};

const editProductSlice = createSlice({
  name: "editProductSlice",
  initialState,
  reducers: {
    setActiveProduct: (state, action) => {
      state.product = action.payload;
    },

    toggleActive: (state) => {
      state.product.isActive = !state.product.isActive;
    },

    toggleBestseller: (state) => {
      state.product.isBestseller = !state.product.isBestseller;
    },

    setField: (
      state,
      action: {
        payload: {
          field: keyof (Product & { variants: Variant[] });
          value: any;
        };
      }
    ) => {
      const { field, value } = action.payload;
      (state.product[field] as any) = value;
    },

    // Варіанти
    addVariant: (state) => {
      state.product.variants.push({
        flavor: "",
        amount: "",
        unitType: "g",
        price: "",
        inStock: true,
        discount: "0",
        isMain: state.product.variants.length === 0, // перший варіант main
      });
    },

    removeVariant: (state, action: { payload: number }) => {
      if (state.product.variants.length > 1) {
        state.product.variants.splice(action.payload, 1);
      }
    },

    updateVariant: <K extends keyof Variant>(
      state: { product: { variants: any[] } },
      action: { payload: { index: number; field: K; value: Variant[K] } }
    ) => {
      const { index, field, value } = action.payload;

      if (field === "isMain") {
        // Тільки один варіант main
        state.product.variants = state.product.variants.map(
          (v: any, i: number) => ({
            ...v,
            isMain: i === index ? Boolean(value) : false,
          })
        );
      } else {
        state.product.variants[index][field] = value;
      }
    },

    addImage: (state, action: PayloadAction<string>) => {
      state.product.images.push(action.payload);
    },

    removeImage: (state, action: PayloadAction<number>) => {
      state.product.images.splice(action.payload, 1);
    },

    reorderImages: (state, action: PayloadAction<string[]>) => {
      state.product.images = action.payload;
    },
  },
});

export const {
  toggleActive,
  toggleBestseller,
  setField,
  setActiveProduct,
  addVariant,
  removeVariant,
  updateVariant,
  addImage,
  removeImage,
  reorderImages,
} = editProductSlice.actions;
export default editProductSlice.reducer;
