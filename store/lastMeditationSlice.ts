import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastMeditation: null,
};

export const lastMeditationSlice = createSlice({
  name: "lastMeditation",
  initialState,
  reducers: {
    addLastMeditation(state, action) {
      state.lastMeditation = action.payload;
    },
  },
});

export const { addLastMeditation } = lastMeditationSlice.actions;

export default lastMeditationSlice.reducer;
