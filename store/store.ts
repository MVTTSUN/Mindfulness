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
import meditationsReducer from "./meditationsSlice";
import trackPlayerReducer from "./trackPlayerSlice";
import likesReducer from "./likesSlice";
import lastMeditationReducer from "./lastMeditationSlice";
import notesReducer from "./notesSlice";
import notificationsReducer from "./notificationsSlice";
import tasksReducer from "./tasksSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  meditations: meditationsReducer,
  trackPlayer: trackPlayerReducer,
  likes: likesReducer,
  lastMeditation: lastMeditationReducer,
  notes: notesReducer,
  notifications: notificationsReducer,
  tasks: tasksReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    "theme",
    "trackPlayer",
    "likes",
    // "meditations",
    "lastMeditation",
    "notes",
    "notifications",
    "tasks",
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
    }),
});

export const persistor = persistStore(store);
export default store;
