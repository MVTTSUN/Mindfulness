import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiRoute, BASE_URL } from "../const";
import {
  DataEmotion,
  DataInformation,
  DataMeditation,
  DataTextLottieImage,
} from "../types";
import { Platform } from 'react-native';

export const mindfulnessApi = createApi({
  reducerPath: "mindfulnessApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getTips: builder.query<DataTextLottieImage[], void>({
      query: () => {
        return ApiRoute.Tips;
      },
    }),
    getTipsLottie: builder.query<Object, string>({
      query: (filename) => {
        return {
          url: ApiRoute.Tips + ApiRoute.Filename + `/${filename}`,
          responseHandler: (response) => response.json(),
        }
      },
    }),
    getEmotions: builder.query<DataEmotion[], void>({
      query: () => {
        return ApiRoute.Emotions;
      },
    }),
    getInfo: builder.query<DataInformation[], void>({
      query: () => {
        return ApiRoute.Info;
      },
    }),
    getTasks: builder.query<DataTextLottieImage[], void>({
      query: () => {
        return ApiRoute.Tasks;
      },
    }),
    getTask: builder.query<DataTextLottieImage, string>({
      query: (id) => {
        return {
          url: `${ApiRoute.Tasks}/${id}`,
          headers: {
            "platform": Platform.OS,
          },
        }
      },
    }),
    getTaskLottie: builder.query<Object, string>({
      query: (filename) => {
        return {
          url: ApiRoute.Tasks + ApiRoute.Filename + `/${filename}`,
          responseHandler: (response) => response.json(),
        }
      },
    }),
    getMeditations: builder.query<DataMeditation[], void>({
      query: () => {
        return ApiRoute.Meditations;
      },
    }),
    getMeditation: builder.query<DataMeditation, string>({
      query: (id) => {
        return {
          url: `${ApiRoute.Meditations}/${id}`,
          headers: {
            "platform": Platform.OS,
          },
        }
      },
    }),
  }),
});

export const {
  useLazyGetTipsQuery,
  useLazyGetTipsLottieQuery,
  useLazyGetEmotionsQuery,
  useLazyGetInfoQuery,
  useLazyGetTasksQuery,
  useLazyGetTaskQuery,
  useLazyGetTaskLottieQuery,
  useLazyGetMeditationsQuery,
  useLazyGetMeditationQuery,
} = mindfulnessApi;