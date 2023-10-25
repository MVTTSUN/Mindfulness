import { array, mixed, object, ref, string } from "yup";
import { ErrorText, MAX_SIZE_IMAGE } from "../const";

const schemaTextLottieImage = (isTask?: boolean) =>
  object({
    title: string().test((value, { createError }) => {
      if (isTask && !value) {
        return createError({
          message: ErrorText.Required,
        });
      }
      return true;
    }),
    kind: string().test((value, { createError }) => {
      if (isTask && !value) {
        return createError({
          message: ErrorText.Required,
        });
      }
      return true;
    }),
    fields: array()
      .of(
        object({
          payload: mixed()
            .transform((value) => (!value ? undefined : value))
            .required(ErrorText.Required)
            .test((value, { createError }) => {
              if (typeof value !== "string") {
                const file = value as File;
                const { size }: { size: number } = file as File;

                if (size / 1024 > MAX_SIZE_IMAGE) {
                  return createError({
                    message: `${
                      ErrorText.SizeFile
                    } ${MAX_SIZE_IMAGE}кб, у вас ${Math.ceil(size / 1024)}кб`,
                  });
                }
              }
              return true;
            }),
        })
      )
      .min(1, ErrorText.MinOneField),
  });

const schemaEmotion = object({
  fields: array()
    .of(
      object({
        value: string()
          .required(ErrorText.Required)
          .matches(/[а-яА-Я]/, ErrorText.OnlyCyrillic),
      })
    )
    .min(1, ErrorText.MinOneField),
});

const schemaInformation = object({
  firstNamePsycho: string()
    .required(ErrorText.Required)
    .matches(/[а-яА-Я]/, ErrorText.OnlyCyrillic),
  secondNamePsycho: string()
    .required(ErrorText.Required)
    .matches(/[а-яА-Я]/, ErrorText.OnlyCyrillic),
  surnamePsycho: string()
    .required(ErrorText.Required)
    .matches(/[а-яА-Я]/, ErrorText.OnlyCyrillic),
  info: string().required(ErrorText.Required),
  avatarPsycho: mixed()
    .required(ErrorText.Required)
    .test((value, { createError }) => {
      if (typeof value !== "string") {
        const file = value as File;
        const { size }: { size: number } = file as File;

        if (size / 1024 > MAX_SIZE_IMAGE) {
          return createError({
            message: `${
              ErrorText.SizeFile
            } ${MAX_SIZE_IMAGE}кб, у вас ${Math.ceil(size / 1024)}кб`,
          });
        }
      }
      return true;
    }),
  nicknameInstagram: string().required(ErrorText.Required),
  nicknameTelegram: string().required(ErrorText.Required),
  nicknameVK: string().required(ErrorText.Required),
  emailPsycho: string()
    .required(ErrorText.Required)
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, ErrorText.Email),
  firstNameDevelop: string()
    .required(ErrorText.Required)
    .matches(/[а-яА-Я]/, ErrorText.OnlyCyrillic),
  secondNameDevelop: string()
    .required(ErrorText.Required)
    .matches(/[а-яА-Я]/, ErrorText.OnlyCyrillic),
  surnameDevelop: string()
    .required(ErrorText.Required)
    .matches(/[а-яА-Я]/, ErrorText.OnlyCyrillic),
  avatarDevelop: mixed()
    .required(ErrorText.Required)
    .test((value, { createError }) => {
      if (typeof value !== "string") {
        const file = value as File;
        const { size }: { size: number } = file as File;

        if (size / 1024 > MAX_SIZE_IMAGE) {
          return createError({
            message: `${
              ErrorText.SizeFile
            } ${MAX_SIZE_IMAGE}кб, у вас ${Math.ceil(size / 1024)}кб`,
          });
        }
      }
      return true;
    }),
  emailDevelop: string()
    .required(ErrorText.Required)
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, ErrorText.Email),
});

const schemaMeditation = object({
  audio: mixed().required(ErrorText.Required),
  image: mixed()
    .required(ErrorText.Required)
    .test((value, { createError }) => {
      if (typeof value !== "string") {
        const file = value as File;
        const { size }: { size: number } = file as File;

        if (size / 1024 > MAX_SIZE_IMAGE) {
          return createError({
            message: `${
              ErrorText.SizeFile
            } ${MAX_SIZE_IMAGE}кб, у вас ${Math.ceil(size / 1024)}кб`,
          });
        }
      }
      return true;
    }),
  kind: string().required(ErrorText.Required),
  title: string().required(ErrorText.Required),
  textLines: array().of(
    object({
      text: string().required(ErrorText.Required),
      timeAt: string().required(ErrorText.Required),
      timeTo: string().required(ErrorText.Required),
    })
  ),
});

const schemaRegister = object({
  nickname: string().required(ErrorText.Required),
  email: string()
    .required(ErrorText.Required)
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, ErrorText.Email),
  password: string()
    .required(ErrorText.Required)
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
      ErrorText.Password
    ),
});

const schemaLogin = object({
  email: string()
    .required(ErrorText.Required)
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, ErrorText.Email),
  password: string().required(ErrorText.Required),
});

const schemaUpdateUser = (isChangePassword?: boolean) =>
  object({
    nickname: string().required(ErrorText.Required),
    email: string()
      .required(ErrorText.Required)
      .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, ErrorText.Email),
    password: string().test((value, { createError }) => {
      if (isChangePassword && !value) {
        return createError({
          message: ErrorText.Required,
        });
      }
      return true;
    }),
    newPassword: string().test((value, { createError }) => {
      if (isChangePassword && !value) {
        return createError({
          message: ErrorText.Required,
        });
      }
      if (
        isChangePassword &&
        !value?.match(
          /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
        )
      ) {
        return createError({
          message: ErrorText.Password,
        });
      }
      return true;
    }),
    confirmPassword: string()
      .oneOf([ref("newPassword")], ErrorText.PasswordCompare)
      .test((value, { createError }) => {
        if (isChangePassword && !value) {
          return createError({
            message: ErrorText.Required,
          });
        }
        return true;
      }),
  });

export {
  schemaTextLottieImage,
  schemaEmotion,
  schemaInformation,
  schemaMeditation,
  schemaRegister,
  schemaLogin,
  schemaUpdateUser,
};
