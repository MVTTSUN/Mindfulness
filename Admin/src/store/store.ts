import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentAudioReducer from "./currentAudioSlice";
import statisticsReducer from "./statisticsSlice";
import authReducer from "./authSlice";
import { Slice } from "../const";
import { mindfulnessApi } from "../services/api";
import { rtkQueryErrorLogger } from "./rtkQueryErrorLogger";

const rootReducer = combineReducers({
  [Slice.CurrentAudio]: currentAudioReducer,
  [Slice.Statistics]: statisticsReducer,
  [Slice.Auth]: authReducer,
  [mindfulnessApi.reducerPath]: mindfulnessApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      mindfulnessApi.middleware,
      rtkQueryErrorLogger,
    ]),
});
