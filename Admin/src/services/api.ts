import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../const";
import { FormTextLottieImage } from "../types/form";
import { DataTextLottieImage } from "../types/get-results";

export const mindfulnessApi = createApi({
  reducerPath: "mindfulnessApi",
  tagTypes: ["Meditations", "Tasks"],
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
                type: "Meditations" as const,
                id: _id,
              })),
              { type: "Meditations", id: "LIST" },
            ]
          : [{ type: "Meditations", id: "LIST" }],
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
      invalidatesTags: [{ type: "Meditations", id: "LIST" }],
    }),
  }),
});

export const { useAddTipsMutation, useGetTipsQuery } = mindfulnessApi;
