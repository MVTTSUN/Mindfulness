import { createSlice } from "@reduxjs/toolkit";
import { SliceName } from '../const';
import { MeditationPlayer } from '../types';

const initialState = {
  lastMeditation: null as MeditationPlayer | null,
  isUpdatePlayer: false,
};

export const trackPlayerSlice = createSlice({
  name: SliceName.TrackPlayer,
  initialState,
  reducers: {
    setLastMeditation(state, action) {
      state.lastMeditation = action.payload;
    },
    setIsUpdatePlayer(state, action) {
      state.isUpdatePlayer = action.payload;
    },
  },
});

export const { setLastMeditation, setIsUpdatePlayer } = trackPlayerSlice.actions;

export default trackPlayerSlice.reducer;
