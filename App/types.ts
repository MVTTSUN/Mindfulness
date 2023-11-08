import store from "./store/store";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

type MeditationScreenProp = NativeStackNavigationProp<{
  Tips: undefined;
  Text: undefined | { meditation: MeditationPlayer };
  Meditation: undefined | { meditationId: string };
  Meditations: undefined;
  MeditationsStack:
    | undefined
    | {
        screen: string;
        params: { screen: string; meditationId: string };
      };
}>;

type InfoAndSettingsScreenProp = NativeStackNavigationProp<{
  ImportAndExport: undefined;
  Notification: undefined;
  Service: undefined;
  Contacts: undefined;
  InfoAndSettings: undefined;
  InfoAndSettingsStack: undefined;
  Storage: undefined;
}>;

type NotesScreenProp = NativeStackNavigationProp<{
  Statistics: undefined;
  Note:
    | undefined
    | { meditation: MeditationPlayer }
    | { note: NoteType }
    | { task: DataTextLottieImage };
  Notes: undefined;
  NotesStack:
    | undefined
    | {
        screen: string;
        params: { screen: string; meditation: MeditationPlayer };
      }
    | {
        screen: string;
        params: { screen: string; task: DataTextLottieImage };
      };
}>;

type TasksScreenProp = NativeStackNavigationProp<{
  Task: undefined | { taskId: string };
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
};

type Like = {
  id: string;
  isLike: boolean;
};

type Days = {
  value: number;
  isCheck: boolean;
}

type Tracker = {
  title: string;
  id: string;
  days: Days[]
}

type DownloadAudio = {
  id: string;
  isDownload: boolean;
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

type CountsEmotion = {
  all: number;
  meditation: number;
  task: number;
  unknown: number;
};

type ProcessEmotions = {
  title: string;
  counts: CountsEmotion;
};

type ElementTextLottieImage = {
  type: "text" | "image" | "lottie";
  payload: string;
  _id: string;
};

type DataTextLottieImage = {
  title?: string;
  kind?: string;
  data: ElementTextLottieImage[];
  _id: string;
};

type DataEmotion = {
  value: string;
  _id: string;
};

type DataInformation = {
  firstNamePsycho: string;
  secondNamePsycho: string;
  surnamePsycho: string;
  info: string;
  avatarPsycho: string;
  nicknameInstagram: string;
  nicknameTelegram: string;
  nicknameVK: string;
  emailPsycho: string;
  firstNameDevelop: string;
  secondNameDevelop: string;
  surnameDevelop: string;
  avatarDevelop: string;
  emailDevelop: string;
  _id: string;
};

type TextLine = {
  timeAt: string;
  timeTo: string;
  text: string;
};

type DataMeditation = {
  title: string;
  kind: string;
  image: string;
  audio: string;
  textLines?: TextLine[];
  _id: string;
};

type MeditationPlayer = {
  title: string;
  kind: string;
  artwork: string;
  artist: string;
  url: string;
  textLines?: TextLine[];
  id: string;
  duration: number;
};

type DataTips = {
  type: string;
  payload: string;
  id: string;
}

type ExportJSONData = {
    likes: {
      likesMeditation: Like[];
      likesTask: Like[];
    },
    notes: NoteType[],
    trackers: {
      trackersMeditation: Tracker[];
      trackersTask: Tracker[];
    }
}

export {
  RootState,
  AppDispatch,
  MeditationScreenProp,
  OptionData,
  MeditationPlayer,
  MainCard,
  Like,
  NoteType,
  InfoAndSettingsScreenProp,
  NotesScreenProp,
  DataTime,
  Notification,
  DataInput,
  TasksScreenProp,
  ProcessEmotions,
  DataTextLottieImage,
  DataEmotion,
  DataInformation,
  DataMeditation,
  DataTips,
  DownloadAudio,
  Tracker,
  ExportJSONData
};
