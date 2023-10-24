import { createSlice } from "@reduxjs/toolkit";
import { Slice } from "../const";

const initialState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: Slice.Auth,
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
