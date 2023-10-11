type FieldTextLottieImage = {
  type: "text" | "image" | "lottie";
  payload: string | File;
};

type FormTextLottieImage = {
  fields: FieldTextLottieImage[];
};

type FieldEmotion = {
  value: string;
};

type FormEmotion = {
  fields: FieldEmotion[];
};

type FormInformation = {
  firstNamePsycho: string;
  secondNamePsycho: string;
  surnamePsycho: string;
  info: string;
  avatarPsycho: FileList;
  nicknameInstagram: string;
  nicknameTelegram: string;
  nicknameVK: string;
  emailPsycho: string;
  firstNameDevelop: string;
  secondNameDevelop: string;
  surnameDevelop: string;
  avatarDevelop: FileList;
  emailDevelop: string;
};

type TextLine = {
  timeAt: number | null;
  timeTo: number | null;
  text: string;
};

type FormMeditation = {
  title: string;
  image: FileList;
  audio: FileList;
  textLines: TextLine[];
  kind: string;
};

export type {
  FormTextLottieImage,
  FormEmotion,
  FormInformation,
  FormMeditation,
  TextLine,
};
