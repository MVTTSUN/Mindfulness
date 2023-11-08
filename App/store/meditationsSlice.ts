import { createSlice } from "@reduxjs/toolkit";
import { SliceName } from "../const";
import { DataMeditation, MeditationPlayer } from '../types';

const initialState = {
  meditations: [] as DataMeditation[],
  meditationsInMeditation: [] as MeditationPlayer[],
  dataMeditationsCopy: [] as DataMeditation[],
  searchMeditations: "",
  kindMeditations: "Все",
  isLikeMeditations: false,
  isDownloadMeditations: false,
  countMeditations: 0,
};

export const meditationsSlice = createSlice({
  name: SliceName.Meditations,
  initialState,
  reducers: {
    setMeditations(state, action) {
      const meditations = JSON.parse(JSON.stringify(action.payload)) as DataMeditation[];

      state.meditations = meditations.sort((a, b) => a.title && b.title ? a.title.localeCompare(b.title) : -1);
    },
    setMeditationsInMeditation(state, action) {
      if (state.meditationsInMeditation.some((meditation) => meditation.id === action.payload._id || meditation.id === action.payload.id)) {
        state.meditationsInMeditation = state.meditationsInMeditation.map((meditation) => {
          if (meditation.id === action.payload._id || meditation.id === action.payload.id) {
            return action.payload;
          }
          return meditation;
        });
      } else {
        state.meditationsInMeditation.push(action.payload);
      }
    },
    setDataMeditationsCopy (state, action) {
      if (state.dataMeditationsCopy.some((meditation) => meditation._id === action.payload._id)) {
        state.dataMeditationsCopy = state.dataMeditationsCopy.map((meditation) => {
          if (meditation._id === action.payload._id) {
            return action.payload;
          }
          return meditation;
        });
      } else {
        state.dataMeditationsCopy.push(action.payload);
      }
    },
    deleteMeditationsInMeditation(state, action) {
      state.meditationsInMeditation = state.meditationsInMeditation.filter((meditation) => meditation.id !== action.payload._id);
    },
    deleteDataMeditationsCopy(state, action) {
      state.dataMeditationsCopy = state.dataMeditationsCopy.filter((meditation) => meditation._id !== action.payload._id);
    },
    setSearchMeditations(state, action) {
      state.searchMeditations = action.payload;
    },
    setKindMeditations(state, action) {
      state.kindMeditations = action.payload;
    },
    setIsLikeMeditations(state, action) {
      state.isLikeMeditations = action.payload;
    },
    setIsDownloadMeditations(state, action) {
      state.isDownloadMeditations = action.payload;
    },
    setCountMeditations(state, action) {
      state.countMeditations = action.payload;
    },
  },
});

export const { 
  setMeditations,
  setMeditationsInMeditation,
  setSearchMeditations,
  deleteMeditationsInMeditation,
  setKindMeditations,
  setIsLikeMeditations,
  setIsDownloadMeditations,
  setCountMeditations,
  setDataMeditationsCopy,
  deleteDataMeditationsCopy,
} = meditationsSlice.actions;

export default meditationsSlice.reducer;
