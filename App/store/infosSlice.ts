import { createSlice } from "@reduxjs/toolkit";
import { SliceName } from "../const";
import { DataInformation } from '../types';

const initialState = {
  infos: {} as DataInformation,
  dataInfosCopy: [] as DataInformation[],
};

export const infosSlice = createSlice({
  name: SliceName.Infos,
  initialState,
  reducers: {
    setInfos(state, action) {
      state.infos = action.payload;
    },
    setDataInfosCopy(state, action) {
      state.dataInfosCopy = action.payload;
    }
  },
});

export const { setInfos, setDataInfosCopy } = infosSlice.actions;

export default infosSlice.reducer;