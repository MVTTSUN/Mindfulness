type FieldTextLottieImage = {
  type: "text" | "image" | "lottie";
  payload: string | File;
};

type FormTextLottieImage = {
  title?: string;
  kind?: string;
  fields?: FieldTextLottieImage[];
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
  avatarPsycho: string | File;
  nicknameInstagram: string;
  nicknameTelegram: string;
  nicknameVK: string;
  emailPsycho: string;
  firstNameDevelop: string;
  secondNameDevelop: string;
  surnameDevelop: string;
  avatarDevelop: string | File;
  emailDevelop: string;
};

type TextLine = {
  timeAt: number | null | string;
  timeTo: number | null | string;
  text: string;
};

type FormMeditation = {
  title: string;
  image?: File | string;
  audio?: File | string;
  textLines: TextLine[];
  kind: string;
};

type FormAuth = {
  nickname: string;
  email: string;
  password: string;
};

type FormProfile = {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  newPassword: string;
};

export type {
  FormTextLottieImage,
  FormEmotion,
  FormInformation,
  FormMeditation,
  TextLine,
  FieldTextLottieImage,
  FormAuth,
  FormProfile,
};
