import {
  FormEmotion,
  FormInformation,
  FormTextLottieImage,
} from "../types/form";

const addTipsAdapter = (data: FormTextLottieImage) => {
  const formData = new FormData();

  for (const field of data.fields) {
    if (field.type === "lottie" || field.type === "image") {
      formData.append("file", field.payload);
      formData.append("type", field.type);
    } else {
      const text = field.payload as string;
      formData.append("text", text.trim());
      formData.append("type", field.type);
    }
  }

  return formData;
};

const addEmotionsAdapter = (data: FormEmotion) => {
  const body: { data: string[] } = { data: [] };

  data.fields.map((field) => {
    body.data.push(
      (
        field.value.charAt(0).toUpperCase() + field.value.slice(1).toLowerCase()
      ).trim()
    );
  });

  return body;
};

const addInfoAdapter = (data: FormInformation) => {
  const formData = new FormData();

  formData.append(
    "firstNamePsycho",
    (
      data.firstNamePsycho.charAt(0).toUpperCase() +
      data.firstNamePsycho.slice(1).toLowerCase()
    ).trim()
  );
  formData.append(
    "secondNamePsycho",
    (
      data.secondNamePsycho.charAt(0).toUpperCase() +
      data.secondNamePsycho.slice(1).toLowerCase()
    ).trim()
  );
  formData.append(
    "surnamePsycho",
    (
      data.surnamePsycho.charAt(0).toUpperCase() +
      data.surnamePsycho.slice(1).toLowerCase()
    ).trim()
  );
  formData.append("info", data.info.trim());
  formData.append("file", data.avatarPsycho);
  formData.append("nicknameInstagram", data.nicknameInstagram.trim());
  formData.append("nicknameTelegram", data.nicknameTelegram.trim());
  formData.append("nicknameVK", data.nicknameVK.trim());
  formData.append("emailPsycho", data.emailPsycho.trim());
  formData.append(
    "firstNameDevelop",
    (
      data.firstNameDevelop.charAt(0).toUpperCase() +
      data.firstNameDevelop.slice(1).toLowerCase()
    ).trim()
  );
  formData.append(
    "secondNameDevelop",
    (
      data.secondNameDevelop.charAt(0).toUpperCase() +
      data.secondNameDevelop.slice(1).toLowerCase()
    ).trim()
  );
  formData.append(
    "surnameDevelop",
    (
      data.surnameDevelop.charAt(0).toUpperCase() +
      data.surnameDevelop.slice(1).toLowerCase()
    ).trim()
  );
  formData.append("file", data.avatarDevelop);
  formData.append("emailDevelop", data.emailDevelop.trim());

  return formData;
};

const addTaskAdapter = (data: FormTextLottieImage) => {
  const formData = addTipsAdapter(data);
  data.title && formData.append("title", data.title);

  return formData;
};

export { addTipsAdapter, addEmotionsAdapter, addInfoAdapter, addTaskAdapter };
