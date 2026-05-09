import { Product, Variant } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type OrderProductsSafe = Omit<Product, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
  selectedVariant: Variant;
  quantityProduct: number;
};

type PersonInfo = {
  name: string;
  surname: string;
  middleName: string;
  phoneNumber: string;
  email: string;
  delivery: string;
  villageCity: string;
  street: string;
  department: string;
  typeOfPay: "online" | "when received" | "vet_sport";
};

type InitialStateType = {
  orderProducts: OrderProductsSafe[];
};

const initialState: InitialStateType & PersonInfo = {
  name: "",
  surname: "",
  middleName: "",
  phoneNumber: "",
  email: "",
  delivery: "Відділення",
  villageCity: "",
  street: "",
  department: "",
  orderProducts:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],
  typeOfPay: "when received",
};

const saveToLocalStorage = (state: InitialStateType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state.orderProducts));
  }
};

export const OrderProductsSlice = createSlice({
  name: "OrderProductsSlice",
  initialState,
  reducers: {
    addProductToOrders: (state, action) => {
      const product: OrderProductsSafe = action.payload;
      const isInOrderIndex = state.orderProducts.findIndex(
        (el) => el.selectedVariant.id === product.selectedVariant.id
      );

      if (isInOrderIndex >= 0) {
        state.orderProducts[isInOrderIndex].quantityProduct +=
          product.quantityProduct;
      } else {
        state.orderProducts.push(product);
      }
      saveToLocalStorage(state);
    },
    removeQuantityProduct: (state, action) => {
      const index = action.payload;

      if (index < 0 || index >= state.orderProducts.length) return;

      state.orderProducts[index].quantityProduct -= 1;
      if (state.orderProducts[index].quantityProduct <= 0) {
        state.orderProducts.splice(index, 1);
      }
      saveToLocalStorage(state);
    },
    addQuantityProduct: (state, action) => {
      const index = action.payload;

      if (index < 0 || index >= state.orderProducts.length) return;

      state.orderProducts[index].quantityProduct += 1;

      saveToLocalStorage(state);
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSurname: (state, action) => {
      state.surname = action.payload;
    },
    setMiddleName: (state, action) => {
      state.middleName = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDeliveryType: (state, action) => {
      state.delivery = action.payload;
      state.department = "";
    },
    setVillageCity: (state, action) => {
      state.villageCity = action.payload;
    },
    setStreet: (state, action) => {
      state.street = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
    setTypeOfPay: (state, action) => {
      state.typeOfPay = action.payload;
    },
    resetOrder: (state) => {
      state.orderProducts = [];
      state.name = "";
      state.surname = "";
      state.middleName = "";
      state.phoneNumber = "";
      state.email = "";
      state.delivery = "Відділення";
      state.villageCity = "";
      state.street = "";
      state.department = "";
      state.typeOfPay = "when received";

      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
  },
});

export const {
  addProductToOrders,
  addQuantityProduct,
  removeQuantityProduct,
  setName,
  setSurname,
  setMiddleName,
  setPhoneNumber,
  setEmail,
  setDeliveryType,
  setVillageCity,
  setStreet,
  setDepartment,
  setTypeOfPay,
  resetOrder,
} = OrderProductsSlice.actions;
export default OrderProductsSlice.reducer;
