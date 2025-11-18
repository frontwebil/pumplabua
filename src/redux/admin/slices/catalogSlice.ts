import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState,
  reducers: {},
});

export const {} = catalogSlice.actions;
export default catalogSlice.reducer;
