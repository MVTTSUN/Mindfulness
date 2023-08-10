import { createSlice } from "@reduxjs/toolkit";
import { MEDITATIONS_DATA } from "../const";

const initialState = {
  meditations: MEDITATIONS_DATA,
  meditationsFiltered: MEDITATIONS_DATA,
  meditationsSearched: MEDITATIONS_DATA,
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
              .toLowerCase()
              .match(RegExp(`^${action.payload.trim()}`, "i"))
          ));
    },
  },
});

export const { filterMeditations, searchMeditations } =
  meditationsSlice.actions;

export default meditationsSlice.reducer;
