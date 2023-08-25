import store from "./store/store";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

type MeditationScreenProp = NativeStackNavigationProp<{
  Tips: undefined;
  Text: undefined | { meditation: MeditationData };
  Audio: undefined | { meditation: MeditationData };
  Meditation: undefined;
  MeditationStack:
    | undefined
    | {
        screen: string;
        params: { screen: string; meditation: MeditationData };
      };
}>;

type InfoAndSettingsScreenProp = NativeStackNavigationProp<{
  InfoAndSettings: undefined;
  InfoAndSettingsStack: undefined;
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

type Text = {
  timeAt: number;
  timeTo: number;
  text: string;
};

type MeditationData = {
  id: number;
  title: string;
  url: string;
  kind: string;
  duration: number;
  textLines: Text[];
};

type Like = {
  id: number;
  isLike: boolean;
};

export {
  RootState,
  AppDispatch,
  MeditationScreenProp,
  OptionData,
  MeditationData,
  MainCard,
  Like,
  InfoAndSettingsScreenProp,
};
