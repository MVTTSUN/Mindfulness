import { createSlice } from "@reduxjs/toolkit";
import { SliceName } from '../const';

const initialState = {
  isOffline: false,
};

export const offlineSlice = createSlice({
  name: SliceName.Offline,
  initialState,
  reducers: {
    setIsOffline(state, action) {
      state.isOffline = action.payload;
    },
  },
});

export const { setIsOffline } = offlineSlice.actions;

export default offlineSlice.reducer;