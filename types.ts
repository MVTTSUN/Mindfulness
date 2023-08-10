import { AVPlaybackSource } from "expo-av";
import store from "./store/store";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

type HomeScreenProp = NativeStackNavigationProp<{
  Audio: undefined | { meditation: MeditationData };
  Meditation: undefined;
  MeditationStack:
    | undefined
    | {
        screen: string;
        params: { screen: string; meditation: MeditationData };
      };
}>;

type MainCard = {
  id: number;
  title: string;
  screen: string;
};

type OptionData = {
  id: number;
  title: string;
  isActive: boolean;
};

type MeditationData = {
  id: number;
  title: string;
  url: string;
  kind: string;
  duration: number;
};

export {
  RootState,
  AppDispatch,
  HomeScreenProp,
  OptionData,
  MeditationData,
  MainCard,
};
