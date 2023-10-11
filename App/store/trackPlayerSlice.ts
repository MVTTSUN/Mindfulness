import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastMeditationId: null as number | null,
};

export const trackPlayerSlice = createSlice({
  name: "trackPlayer",
  initialState,
  reducers: {
    setLastMeditationId(state, action) {
      state.lastMeditationId = action.payload;
    },
  },
});

export const { setLastMeditationId } = trackPlayerSlice.actions;

export default trackPlayerSlice.reducer;
