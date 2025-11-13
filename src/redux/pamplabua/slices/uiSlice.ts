import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  isOpenAuthModal: boolean;
  userName: string | null | undefined;
  sessionId: string | null | undefined;
  isLogged: boolean;
  accountInfo: User | null;
};

const initialState: initialStateType = {
  isOpenAuthModal: false,
  userName: null,
  sessionId: null,
  isLogged: false,
  accountInfo: null,
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
  },
});

export const { toggleAuthModal, closeAuthModal, setSession, setAccountInfo } =
  uiSlice.actions;

// Експорт редюсера для store
export default uiSlice.reducer;
