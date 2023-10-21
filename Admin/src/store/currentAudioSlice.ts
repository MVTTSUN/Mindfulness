import { createSlice } from "@reduxjs/toolkit";
import { Slice } from "../const";

const initialState = {
  currentTime: 0,
  duration: 0,
  isPause: true,
};

export const currentAudioSlice = createSlice({
  name: Slice.CurrentAudio,
  initialState,
  reducers: {
    changeCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    changeIsPause(state, action) {
      state.isPause = action.payload;
    },
  },
});

export const { changeCurrentTime, setDuration, changeIsPause } =
  currentAudioSlice.actions;

export default currentAudioSlice.reducer;
