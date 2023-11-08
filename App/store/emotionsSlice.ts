import { createSlice } from "@reduxjs/toolkit";
import { SliceName } from "../const";
import { DataEmotion } from '../types';

const initialState = {
  emotions: [] as DataEmotion[],
  dataEmotionsCopy: [] as DataEmotion[],
};

export const emotionsSlice = createSlice({
  name: SliceName.Emotions,
  initialState,
  reducers: {
    setEmotions(state, action) {
      const emotions = JSON.parse(JSON.stringify(action.payload)) as DataEmotion[];

      state.emotions = emotions.sort((a, b) => a.value.localeCompare(b.value));
    },
    setDataEmotionsCopy(state, action) {
      state.dataEmotionsCopy = action.payload;
    }
  },
});

export const { setEmotions, setDataEmotionsCopy } = emotionsSlice.actions;

export default emotionsSlice.reducer;
