import { createSlice } from "@reduxjs/toolkit";
import { SliceName } from "../const";
import { DataTips } from '../types';

const initialState = {
  tips: [] as DataTips[],
  dataTipsCopy: [] as DataTips[],
};

export const tipsSlice = createSlice({
  name: SliceName.Tips,
  initialState,
  reducers: {
    setTips(state, action) {
      state.tips = action.payload;
    },
    setDataTipsCopy(state, action) {
      state.dataTipsCopy = action.payload;
    }
  },
});

export const { setTips, setDataTipsCopy } = tipsSlice.actions;

export default tipsSlice.reducer;
