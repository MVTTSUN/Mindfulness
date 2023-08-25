import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInitialized: false,
  lastMeditationId: null as number | null,
};

export const trackPlayerSlice = createSlice({
  name: "trackPlayer",
  initialState,
  reducers: {
    init: (state, action) => {
      state.isInitialized = action.payload;
    },
    setLastMeditationId: (state, action) => {
      state.lastMeditationId = action.payload;
    },
  },
});

export const { init, setLastMeditationId } = trackPlayerSlice.actions;

export default trackPlayerSlice.reducer;
