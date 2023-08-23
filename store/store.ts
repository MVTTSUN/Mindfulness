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
import initializePlayerReducer from "./initializePlayerSlice";
import likesReducer from "./likesSlice";
import lastMeditationReducer from "./lastMeditationSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  meditations: meditationsReducer,
  initializePlayer: initializePlayerReducer,
  likes: likesReducer,
  lastMeditation: lastMeditationReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme", "initializePlayer", "likes", "lastMeditation"],
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
