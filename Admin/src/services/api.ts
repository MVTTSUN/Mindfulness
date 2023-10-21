import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiRoute, BASE_URL } from "../const";
import {
  FormEmotion,
  FormInformation,
  FormMeditation,
  FormTextLottieImage,
} from "../types/form";
import {
  DataEmotion,
  DataInformation,
  DataMeditation,
  DataStatistics,
  DataTextLottieImage,
  DataValidate,
} from "../types/get-results";
import {
  addEmotionsAdapter,
  addInfoAdapter,
  addMeditationAdapter,
  addTaskAdapter,
  addTipsAdapter,
} from "../utils/adapters";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const providesTags = <T>(
  result: T | undefined,
  type: "Tips" | "Emotions" | "Info" | "Tasks" | "Meditations"
) => {
  return result && Array.isArray(result)
    ? [...result.map(({ _id }) => ({ type, id: _id })), { type, id: "LIST" }]
    : [{ type, id: "LIST" }];
};

export const mindfulnessApi = createApi({
  reducerPath: "mindfulnessApi",
  tagTypes: ["Tips", "Emotions", "Info", "Tasks", "Meditations"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (builder) => ({
    getTips: builder.query<DataTextLottieImage[], void>({
      query: () => {
        return ApiRoute.Tips;
      },
      providesTags: (result) => providesTags(result, "Tips"),
    }),
    addTips: builder.mutation<void, FormTextLottieImage>({
      query: (data) => {
        return {
          url: ApiRoute.Tips,
          method: "POST",
          body: addTipsAdapter(data),
        };
      },
      invalidatesTags: [{ type: "Tips", id: "LIST" }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            mindfulnessApi.util.upsertQueryData(
              "getTips",
              undefined,
              data as unknown as DataTextLottieImage[]
            )
          );
        } catch (err) {
          toast.error("Не удалось связаться с сервером", { autoClose: 3000 });
        }
      },
    }),
    getEmotions: builder.query<DataEmotion[], void>({
      query: () => {
        return ApiRoute.Emotions;
      },
      providesTags: (result) => providesTags(result, "Emotions"),
    }),
    addEmotions: builder.mutation<void, FormEmotion>({
      query: (data) => {
        return {
          url: ApiRoute.Emotions,
          method: "POST",
          body: addEmotionsAdapter(data),
        };
      },
      invalidatesTags: [{ type: "Emotions", id: "LIST" }],
    }),
    deleteEmotion: builder.mutation<DataEmotion, string>({
      query: (id) => {
        return {
          url: `${ApiRoute.Emotions}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Emotions", id: "LIST" }],
    }),
    getInfo: builder.query<DataInformation[], void>({
      query: () => {
        return ApiRoute.Info;
      },
      providesTags: (result) => providesTags(result, "Info"),
    }),
    addInfo: builder.mutation<void, FormInformation>({
      query: (data) => {
        return {
          url: ApiRoute.Info,
          method: "POST",
          body: addInfoAdapter(data),
        };
      },
      invalidatesTags: [{ type: "Info", id: "LIST" }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            mindfulnessApi.util.upsertQueryData(
              "getInfo",
              undefined,
              data as unknown as DataInformation[]
            )
          );
        } catch (err) {
          toast.error("Не удалось связаться с сервером", { autoClose: 3000 });
        }
      },
    }),
    getTasks: builder.query<DataTextLottieImage[], void>({
      query: () => {
        return ApiRoute.Tasks;
      },
      providesTags: (result) => providesTags(result, "Tasks"),
    }),
    getTask: builder.query<DataTextLottieImage, string>({
      query: (id) => {
        return `${ApiRoute.Tasks}/${id}`;
      },
      providesTags: (result) => providesTags(result, "Tasks"),
    }),
    addTask: builder.mutation<void, FormTextLottieImage>({
      query: (data) => {
        return {
          url: ApiRoute.Tasks,
          method: "POST",
          body: addTaskAdapter(data),
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    validateAddTask: builder.mutation<DataValidate, FormTextLottieImage>({
      query: (data) => {
        return {
          url: ApiRoute.Tasks + ApiRoute.Validate,
          method: "POST",
          body: addTaskAdapter(data),
        };
      },
    }),
    deleteTask: builder.mutation<DataTextLottieImage, string>({
      query: (id) => {
        return {
          url: `${ApiRoute.Tasks}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    updateTask: builder.mutation<
      void,
      { id: string; data: FormTextLottieImage }
    >({
      query: ({ id, data }) => {
        return {
          url: `${ApiRoute.Tasks}/${id}`,
          method: "PATCH",
          body: addTaskAdapter(data),
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            mindfulnessApi.util.upsertQueryData(
              "getTask",
              id,
              data as unknown as DataTextLottieImage
            )
          );
        } catch {
          toast.error("Не удалось связаться с сервером", { autoClose: 3000 });
        }
      },
    }),
    validateUpdateTask: builder.mutation<
      DataValidate,
      { id: string; data: FormTextLottieImage }
    >({
      query: ({ id, data }) => {
        return {
          url: ApiRoute.Tasks + ApiRoute.Validate + `/${id}`,
          method: "PATCH",
          body: addTaskAdapter(data),
        };
      },
    }),
    getMeditations: builder.query<DataMeditation[], void>({
      query: () => {
        return ApiRoute.Meditations;
      },
      providesTags: (result) => providesTags(result, "Meditations"),
    }),
    getMeditation: builder.query<DataMeditation, string>({
      query: (id) => {
        return `${ApiRoute.Meditations}/${id}`;
      },
      providesTags: (result) => providesTags(result, "Meditations"),
    }),
    addMeditation: builder.mutation<void, FormMeditation>({
      query: (data) => {
        return {
          url: ApiRoute.Meditations,
          method: "POST",
          body: addMeditationAdapter(data),
        };
      },
      invalidatesTags: [{ type: "Meditations", id: "LIST" }],
    }),
    validateAddMeditation: builder.mutation<DataValidate, FormMeditation>({
      query: (data) => {
        return {
          url: ApiRoute.Meditations + ApiRoute.Validate,
          method: "POST",
          body: addMeditationAdapter(data),
        };
      },
    }),
    deleteMeditation: builder.mutation<DataMeditation, string>({
      query: (id) => {
        return {
          url: `${ApiRoute.Meditations}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Meditations", id: "LIST" }],
    }),
    updateMeditation: builder.mutation<
      void,
      { id: string; data: FormMeditation }
    >({
      query: ({ id, data }) => {
        return {
          url: `${ApiRoute.Meditations}/${id}`,
          method: "PATCH",
          body: addMeditationAdapter(data),
        };
      },
      invalidatesTags: [{ type: "Meditations", id: "LIST" }],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            mindfulnessApi.util.upsertQueryData(
              "getMeditation",
              id,
              data as unknown as DataMeditation
            )
          );
        } catch {
          toast.error("Не удалось связаться с сервером", { autoClose: 3000 });
        }
      },
    }),
    validateUpdateMeditation: builder.mutation<
      DataValidate,
      { id: string; data: FormMeditation }
    >({
      query: ({ id, data }) => {
        return {
          url: ApiRoute.Meditations + ApiRoute.Validate + `/${id}`,
          method: "PATCH",
          body: addMeditationAdapter(data),
        };
      },
    }),
    getStatistics: builder.query<DataStatistics, void>({
      query: () => ApiRoute.Statistics,
      async onCacheEntryAdded(
        _,
        { cacheEntryRemoved, updateCachedData, cacheDataLoaded }
      ) {
        const socket = io(BASE_URL);

        await cacheDataLoaded;
        socket.on("statistics", (data) => updateCachedData(() => data));
        await cacheEntryRemoved;
        socket.close();
      },
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
  useGetTasksQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useValidateAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useValidateUpdateTaskMutation,
  useGetMeditationsQuery,
  useGetMeditationQuery,
  useAddMeditationMutation,
  useValidateAddMeditationMutation,
  useDeleteMeditationMutation,
  useUpdateMeditationMutation,
  useValidateUpdateMeditationMutation,
  useGetStatisticsQuery,
} = mindfulnessApi;
