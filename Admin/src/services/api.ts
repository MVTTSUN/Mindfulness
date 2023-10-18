import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../const";
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
        return "tips";
      },
      providesTags: (result) => providesTags(result, "Tips"),
    }),
    addTips: builder.mutation<void, FormTextLottieImage>({
      query: (data) => {
        return {
          url: "tips",
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
        return "emotions";
      },
      providesTags: (result) => providesTags(result, "Emotions"),
    }),
    addEmotions: builder.mutation<void, FormEmotion>({
      query: (data) => {
        return {
          url: "emotions",
          method: "POST",
          body: addEmotionsAdapter(data),
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
      providesTags: (result) => providesTags(result, "Info"),
    }),
    addInfo: builder.mutation<void, FormInformation>({
      query: (data) => {
        return {
          url: "info",
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
        return "tasks";
      },
      providesTags: (result) => providesTags(result, "Tasks"),
    }),
    getTask: builder.query<DataTextLottieImage, string>({
      query: (id) => {
        return `tasks/${id}`;
      },
      providesTags: (result) => providesTags(result, "Tasks"),
    }),
    addTask: builder.mutation<void, FormTextLottieImage>({
      query: (data) => {
        return {
          url: "tasks",
          method: "POST",
          body: addTaskAdapter(data),
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    deleteTask: builder.mutation<DataTextLottieImage, string>({
      query: (id) => {
        return {
          url: `tasks/${id}`,
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
          url: `tasks/${id}`,
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
    getMeditations: builder.query<DataMeditation[], void>({
      query: () => {
        return "meditations";
      },
      providesTags: (result) => providesTags(result, "Meditations"),
    }),
    getMeditation: builder.query<DataMeditation, string>({
      query: (id) => {
        return `meditations/${id}`;
      },
      providesTags: (result) => providesTags(result, "Meditations"),
    }),
    addMeditation: builder.mutation<void, FormMeditation>({
      query: (data) => {
        return {
          url: "meditations",
          method: "POST",
          body: addMeditationAdapter(data),
        };
      },
      invalidatesTags: [{ type: "Meditations", id: "LIST" }],
    }),
    deleteMeditation: builder.mutation<DataMeditation, string>({
      query: (id) => {
        return {
          url: `meditations/${id}`,
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
          url: `meditations/${id}`,
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
    getStatistics: builder.query<DataStatistics[], void>({
      query: () => "statistics",
      async onCacheEntryAdded(
        _,
        { cacheEntryRemoved, updateCachedData, cacheDataLoaded }
      ) {
        const socket = io(BASE_URL);
        await cacheDataLoaded;

        socket.on("statistics", (data) =>
          updateCachedData((draft) => {
            draft.push(data);
          })
        );

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
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetMeditationsQuery,
  useGetMeditationQuery,
  useAddMeditationMutation,
  useDeleteMeditationMutation,
  useUpdateMeditationMutation,
  useGetStatisticsQuery,
} = mindfulnessApi;
