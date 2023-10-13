import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../const";
import {
  FormEmotion,
  FormInformation,
  FormTextLottieImage,
} from "../types/form";
import {
  DataEmotion,
  DataInformation,
  DataTextLottieImage,
} from "../types/get-results";

export const mindfulnessApi = createApi({
  reducerPath: "mindfulnessApi",
  tagTypes: ["Tips", "Emotions", "Info"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTips: builder.query<DataTextLottieImage[], void>({
      query: () => {
        return "tips";
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Tips" as const,
                id: _id,
              })),
              { type: "Tips", id: "LIST" },
            ]
          : [{ type: "Tips", id: "LIST" }],
    }),
    addTips: builder.mutation<void, FormTextLottieImage>({
      query: (data) => {
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

        return {
          url: "tips",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Tips", id: "LIST" }],
    }),
    getEmotions: builder.query<DataEmotion[], void>({
      query: () => {
        return "emotions";
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Emotions" as const,
                id: _id,
              })),
              { type: "Emotions", id: "LIST" },
            ]
          : [{ type: "Emotions", id: "LIST" }],
    }),
    addEmotions: builder.mutation<void, FormEmotion>({
      query: (data) => {
        const body: { data: string[] } = { data: [] };

        data.fields.map((field) => {
          body.data.push(
            (
              field.value.charAt(0).toUpperCase() +
              field.value.slice(1).toLowerCase()
            ).trim()
          );
        });

        return {
          url: "emotions",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Emotions", id: "LIST" }],
    }),
    deleteEmotion: builder.mutation<DataEmotion, string>({
      query: (id) => {
        return {
          url: `emotions/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Emotions", id: "LIST" }],
    }),
    getInfo: builder.query<DataInformation[], void>({
      query: () => {
        return "info";
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Info" as const,
                id: _id,
              })),
              { type: "Info", id: "LIST" },
            ]
          : [{ type: "Info", id: "LIST" }],
    }),
    addInfo: builder.mutation<void, FormInformation>({
      query: (data) => {
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

        return {
          url: "info",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Info", id: "LIST" }],
    }),
  }),
});

export const {
  useAddTipsMutation,
  useGetTipsQuery,
  useAddEmotionsMutation,
  useGetEmotionsQuery,
  useDeleteEmotionMutation,
  useGetInfoQuery,
  useAddInfoMutation,
} = mindfulnessApi;
