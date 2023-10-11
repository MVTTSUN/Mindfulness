import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentAudioReducer from "./currentAudioSlice";
import { Slice } from "../const";
import { mindfulnessApi } from "../services/api";

const rootReducer = combineReducers({
  [Slice.CurrentAudio]: currentAudioReducer,
  [mindfulnessApi.reducerPath]: mindfulnessApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mindfulnessApi.middleware),
});
