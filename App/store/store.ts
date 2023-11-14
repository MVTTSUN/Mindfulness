import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import tipsReducer from "./tipsSlice";
import emotionsReducer from "./emotionsSlice";
import infosReducer from "./infosSlice";
import meditationsReducer from "./meditationsSlice";
import trackPlayerReducer from "./trackPlayerSlice";
import likesReducer from "./likesSlice";
import notesReducer from "./notesSlice";
import notificationsReducer from "./notificationsSlice";
import tasksReducer from "./tasksSlice";
import downloadAudioReducer from "./downloadAudioSlice";
import offlineReducer from "./offlineSlice";
import trackerReducer from "./trackerSlice";
import concentrationReducer from "./concentrationSlice";
import { mindfulnessApi } from '../api/api';
import { SliceName } from '../const';
import { rtkQueryErrorLogger } from '../api/rtkQueryErrorLogger';

const rootReducer = combineReducers({
  [SliceName.Theme]: themeReducer,
  [SliceName.Meditations]: meditationsReducer,
  [SliceName.TrackPlayer]: trackPlayerReducer,
  [SliceName.Likes]: likesReducer,
  [SliceName.Notes]: notesReducer,
  [SliceName.Notifications]: notificationsReducer,
  [SliceName.Tasks]: tasksReducer,
  [SliceName.Tips]: tipsReducer,
  [SliceName.Emotions]: emotionsReducer,
  [SliceName.Infos]: infosReducer,
  [SliceName.DownloadAudio]: downloadAudioReducer,
  [SliceName.Offline]: offlineReducer,
  [SliceName.Tracker]: trackerReducer,
  [SliceName.Concentration]: concentrationReducer,
  [mindfulnessApi.reducerPath]: mindfulnessApi.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    SliceName.Theme,
    SliceName.TrackPlayer,
    SliceName.Likes,
    SliceName.Meditations,
    SliceName.Notes,
    SliceName.Notifications,
    SliceName.Tasks,
    SliceName.Tips,
    SliceName.Emotions,
    SliceName.Infos,
    SliceName.DownloadAudio,
    SliceName.Offline,
    SliceName.Tracker,
    SliceName.Concentration,
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mindfulnessApi.middleware, rtkQueryErrorLogger),
});

export const persistor = persistStore(store);
export default store;
