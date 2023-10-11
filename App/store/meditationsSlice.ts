import { createSlice } from "@reduxjs/toolkit";
import { MEDITATIONS_DATA } from "../const";

const initialState = {
  meditations: MEDITATIONS_DATA,
  meditationsFiltered: MEDITATIONS_DATA,
  meditationsSearched: MEDITATIONS_DATA,
  meditationsLike: MEDITATIONS_DATA,
};

export const meditationsSlice = createSlice({
  name: "meditations",
  initialState,
  reducers: {
    filterMeditations(state, action) {
      action.payload === "Всё"
        ? (state.meditationsFiltered = state.meditations)
        : (state.meditationsFiltered = state.meditations.filter(
            (meditation) => meditation.kind === action.payload
          ));
    },
    searchMeditations(state, action) {
      action.payload.trim() === ""
        ? (state.meditationsSearched = state.meditations)
        : (state.meditationsSearched = state.meditations.filter((meditation) =>
            meditation.title
              .split(" ")
              .reverse()
              .reduce(
                (acc: string[], curr) => (
                  acc.push(`${curr} ${acc}`.trim()), acc
                ),
                []
              )
              .some((el) =>
                el.match(
                  RegExp(
                    `^${action.payload
                      .trim()
                      .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}`,
                    "i"
                  )
                )
              )
          ));
    },
    likeMeditations(state, action) {
      action.payload === null
        ? (state.meditationsLike = state.meditations)
        : (state.meditationsLike = state.meditations.filter((meditation) =>
            action.payload.some(
              (like: { id: number; isLike: boolean }) =>
                like.id === meditation.id
            )
          ));
    },
  },
});

export const { filterMeditations, searchMeditations, likeMeditations } =
  meditationsSlice.actions;

export default meditationsSlice.reducer;
