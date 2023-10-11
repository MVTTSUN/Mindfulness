import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../const";
import { FormTextLottieImage } from "../types/form";

export const mindfulnessApi = createApi({
  reducerPath: "pokemonApi",
  tagTypes: ["Meditations", "Tasks"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    addTips: builder.mutation<void, FormTextLottieImage>({
      query: (data) => {
        const formData = new FormData();

        for (const field of data.fields) {
          if (field.type === "lottie" || field.type === "image") {
            formData.append("file", field.payload);
            formData.append("type", field.type);
          } else {
            formData.append("text", field.payload);
            formData.append("type", field.type);
          }
        }

        for (const obj in formData) {
          console.log(obj);
        }

        return {
          url: "tips",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useAddTipsMutation } = mindfulnessApi;
