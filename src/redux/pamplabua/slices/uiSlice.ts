import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  isOpenAuthModal: boolean;
  isOpenBurger: boolean;
  isOpenBurgerCatalog: boolean;
  isOpenOrderModal: boolean;
  userName: string | null | undefined;
  sessionId: string | null | undefined;
  isLogged: boolean;
  accountInfo: User | null;
  isOpenMobileFilter: boolean;
  favoritesProducts: string[];
};

const initialState: initialStateType = {
  isOpenBurger: false,
  isOpenBurgerCatalog: false,
  isOpenAuthModal: false,
  isOpenOrderModal: false,
  userName: null,
  sessionId: null,
  isLogged: false,
  accountInfo: null,
  favoritesProducts: [],
  isOpenMobileFilter: false,
};

const uiSlice = createSlice({
  name: "UIslice",
  initialState,
  reducers: {
    toggleAuthModal: (state) => {
      state.isOpenAuthModal = !state.isOpenAuthModal;
    },
    closeAuthModal: (state) => {
      state.isOpenAuthModal = false;
    },
    toggleBurger: (state) => {
      state.isOpenBurger = !state.isOpenBurger;
    },
    closeBurger: (state) => {
      state.isOpenBurger = false;
    },
    toggleBurgerCatalog: (state) => {
      state.isOpenBurgerCatalog = !state.isOpenBurgerCatalog;
    },
    closeBurgerCatalog: (state) => {
      state.isOpenBurgerCatalog = false;
    },
    toggleIsOpenOrderModal: (state) => {
      state.isOpenOrderModal = !state.isOpenOrderModal;
    },
    closeOrderModal: (state) => {
      state.isOpenOrderModal = false;
    },
    setSession: (state, action) => {
      const { id, name } = action.payload;
      if (!id || !name) {
        return;
      } else {
        state.isLogged = true;
        state.userName = name;
        state.sessionId = id;
      }
    },
    setAccountInfo: (state, action) => {
      const body = action.payload;
      state.accountInfo = body;
    },
    setFavoritesProducts: (state, action) => {
      const { favoriteProducts } = action.payload;
      state.favoritesProducts = favoriteProducts;
    },
    toogleIsOpenMobileFilter: (state) => {
      state.isOpenMobileFilter = !state.isOpenMobileFilter;
    },
  },
});

export const {
  toggleAuthModal,
  closeAuthModal,
  setSession,
  setAccountInfo,
  toggleBurger,
  closeBurger,
  toggleBurgerCatalog,
  closeBurgerCatalog,
  setFavoritesProducts,
  toogleIsOpenMobileFilter,
  toggleIsOpenOrderModal,
  closeOrderModal,
} = uiSlice.actions;

// Експорт редюсера для store
export default uiSlice.reducer;
