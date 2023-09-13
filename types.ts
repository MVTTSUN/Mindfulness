import { ImageSourcePropType } from "react-native";
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
  Note:
    | undefined
    | { meditation: MeditationData }
    | { note: NoteType }
    | { task: TaskType };
  Notes: undefined;
  NotesStack:
    | undefined
    | {
        screen: string;
        params: { screen: string; meditation: MeditationData };
      }
    | {
        screen: string;
        params: { screen: string; task: TaskType };
      };
}>;

type TasksScreenProp = NativeStackNavigationProp<{
  Task: undefined | { task: TaskType };
  Tasks: undefined;
  TasksStack: undefined;
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

type NoteType = {
  id: string;
  color: string;
  backgroundColor: string;
  underlayColor: string;
  emotionsBefore: string[];
  emotionsAfter: string[];
  title: string;
  texts: string[];
  createdAt: string;
};

type TaskContent = {
  type: string;
  payload: string & ImageSourcePropType;
};

type TaskType = {
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
  NoteType,
  InfoAndSettingsScreenProp,
  NotesScreenProp,
  DataTime,
  Notification,
  TaskType,
  DataInput,
  TasksScreenProp,
};
