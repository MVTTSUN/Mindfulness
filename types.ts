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
  ImportAndExport: undefined;
  Notification: undefined;
  Service: undefined;
  Contacts: undefined;
  InfoAndSettings: undefined;
  InfoAndSettingsStack: undefined;
}>;

type NotesScreenProp = NativeStackNavigationProp<{
  Note: undefined | { meditation: MeditationData };
  Notes: undefined;
  NotesStack:
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

type Note = {
  id: string;
  color: string;
  title: string;
  text: string;
  icon: NodeRequire;
  createdAt: string;
  kind: string;
};

type TaskContent = {
  type: string;
  text: string;
};

type Task = {
  id: number;
  title: string;
  content: TaskContent[];
  kind: string;
};

type DataTime = {
  id: string;
  value: number;
};

type Notification = {
  id: number;
  hours: number;
  minutes: number;
  enable: boolean;
  isOpen: boolean;
};

type DataInput = {
  id: number;
  title: string;
};

export {
  RootState,
  AppDispatch,
  MeditationScreenProp,
  OptionData,
  MeditationData,
  MainCard,
  Like,
  Note,
  InfoAndSettingsScreenProp,
  NotesScreenProp,
  DataTime,
  Notification,
  Task,
  DataInput,
};
