import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInitialized: false,
};

export const initializePlayerSlice = createSlice({
  name: "initializePlayer",
  initialState,
  reducers: {
    init: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { init } = initializePlayerSlice.actions;

export default initializePlayerSlice.reducer;
