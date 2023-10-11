import { createSlice } from "@reduxjs/toolkit";
import { Slice } from "../const";

const initialState = {
  src: "",
  currentTime: 0,
  duration: 0,
  isPause: true,
};

export const currentAudioSlice = createSlice({
  name: Slice.CurrentAudio,
  initialState,
  reducers: {
    setAudioSrc(state, action) {
      state.src = action.payload;
    },
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

export const { setAudioSrc, changeCurrentTime, setDuration, changeIsPause } =
  currentAudioSlice.actions;

export default currentAudioSlice.reducer;
