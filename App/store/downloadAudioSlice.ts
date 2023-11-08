import { createSlice } from "@reduxjs/toolkit";
import { DownloadAudio } from "../types";
import { SliceName } from '../const';

const initialState = {
  downloadAudios: [] as DownloadAudio[],
};

export const downloadAudioSlice = createSlice({
  name: SliceName.DownloadAudio,
  initialState,
  reducers: {
    addDownloadAudio(state, action) {
      state.downloadAudios.push({ id: action.payload, isDownload: true });
    },
    removeDownloadAudio(state, action) {
      state.downloadAudios = state.downloadAudios.filter(
        (downloadAudio) => downloadAudio.id !== action.payload
      );
    },
    clearDownloadAudio(state) {
      state.downloadAudios = [];
    },
  },
});

export const {
  addDownloadAudio,
  removeDownloadAudio,
  clearDownloadAudio,
} = downloadAudioSlice.actions;

export default downloadAudioSlice.reducer;