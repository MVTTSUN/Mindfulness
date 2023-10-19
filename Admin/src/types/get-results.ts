type ElementTextLottieImage = {
  type: "text" | "image" | "lottie";
  payload: string | object;
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

type MonthStatistics = {
  month: number;
  count: number;
  android: number;
  ios: number;
};

type YearStatistics = {
  year: number;
  months: MonthStatistics[];
  count: number;
};

type TaskAndMeditationStatistics = {
  title: string;
  count: number;
  years: YearStatistics[];
};

type DataStatistics = {
  meditations: TaskAndMeditationStatistics[];
  tasks: TaskAndMeditationStatistics[];
  count: number;
};

export type {
  ElementTextLottieImage,
  DataTextLottieImage,
  DataEmotion,
  DataInformation,
  DataMeditation,
  DataStatistics,
};
