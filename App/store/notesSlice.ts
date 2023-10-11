import { createSlice, nanoid } from "@reduxjs/toolkit";
import { NoteType } from "../types";

const initialState = {
  notes: [] as NoteType[],
  notesSearched: [] as NoteType[],
  notesLike: [] as NoteType[],
  queries: {
    search: "",
    type: "Всё",
    month: "Всё",
    year: "Всё",
  },
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    updateQueries(state, action) {
      state.queries[
        action.payload.property as "search" | "type" | "month" | "year"
      ] = action.payload.value.trim();
    },
    resetQueries(state) {
      state.queries = {
        search: "",
        type: "Всё",
        month: "Всё",
        year: "Всё",
      };
    },
    searchNotes(state) {
      state.notesSearched = state.notes.filter(
        (note) =>
          (note.title.match(
            RegExp(
              state.queries.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
              "i"
            )
          ) ||
            note.texts.some((el) =>
              el.match(
                RegExp(
                  state.queries.search.replace(
                    /[-[\]{}()*+?.,\\^$|#\s]/g,
                    "\\$&"
                  ),
                  "i"
                )
              )
            ) ||
            note.emotionsAfter.some((el) =>
              el.match(
                RegExp(
                  state.queries.search.replace(
                    /[-[\]{}()*+?.,\\^$|#\s]/g,
                    "\\$&"
                  ),
                  "i"
                )
              )
            ) ||
            note.emotionsBefore.some((el) =>
              el.match(
                RegExp(
                  state.queries.search.replace(
                    /[-[\]{}()*+?.,\\^$|#\s]/g,
                    "\\$&"
                  ),
                  "i"
                )
              )
            )) &&
          (state.queries.type === "Всё"
            ? true
            : note.title.match(
                RegExp(
                  `^${state.queries.type.replace(
                    /[-[\]{}()*+?.,\\^$|#\s]/g,
                    "\\$&"
                  )}`,
                  "i"
                )
              )) &&
          (state.queries.month === "Всё"
            ? true
            : new Date(note.createdAt)
                .toLocaleString("ru", {
                  month: "long",
                  year: "numeric",
                  day: "numeric",
                })
                .match(RegExp(`${state.queries.month.slice(0, -1)}`, "i"))) &&
          (state.queries.year === "Всё"
            ? true
            : new Date(note.createdAt)
                .toLocaleString("ru", {
                  month: "long",
                  year: "numeric",
                  day: "numeric",
                })
                .match(RegExp(`${state.queries.year}`, "i")))
      );
    },
    addNote(state, action) {
      state.notes.unshift({
        id: nanoid(),
        emotionsBefore: action.payload.emotionsBefore,
        emotionsAfter: action.payload.emotionsAfter,
        title: action.payload.title || "...",
        texts: action.payload.texts,
        createdAt: String(new Date()),
        color: action.payload.color,
        backgroundColor: action.payload.backgroundColor,
        underlayColor: action.payload.underlayColor,
      });
      state.notesSearched = state.notes;
    },
    removeNotes(state, action) {
      state.notes = state.notes.filter(
        (note) => !action.payload.includes(note.id)
      );
    },
    updateNote(state, action) {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    },
    setNotes(state, action) {
      state.notes = action.payload;
    },
  },
});

export const {
  updateQueries,
  resetQueries,
  searchNotes,
  addNote,
  removeNotes,
  updateNote,
  setNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
