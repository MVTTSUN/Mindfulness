import { createSlice } from "@reduxjs/toolkit";
import { SliceName } from '../const';

const initialState = {
  isConcentration: false,
};

export const concentrationSlice = createSlice({
  name: SliceName.DownloadAudio,
  initialState,
  reducers: {
    setIsConcentration(state, action) {
      state.isConcentration = action.payload;
    },
  },
});

export const { setIsConcentration } = concentrationSlice.actions;

export default concentrationSlice.reducer;