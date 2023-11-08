import { createSlice } from "@reduxjs/toolkit";
import { SliceName } from '../const';
import { MeditationPlayer } from '../types';

const initialState = {
  lastMeditation: null as MeditationPlayer | null,
  isInitializedPlayer: false,
};

export const trackPlayerSlice = createSlice({
  name: SliceName.TrackPlayer,
  initialState,
  reducers: {
    setLastMeditation(state, action) {
      state.lastMeditation = action.payload;
    },
    setIsInitializedPlayer(state, action) {
      state.isInitializedPlayer = action.payload;
    }
  },
});

export const { setLastMeditation, setIsInitializedPlayer } = trackPlayerSlice.actions;

export default trackPlayerSlice.reducer;
