import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Note } from "../types";

const initialState = {
  notes: [] as Note[],
  notesFiltered: [] as Note[],
  notesSearched: [] as Note[],
  notesLike: [] as Note[],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    filterNotes(state, action) {
      action.payload === "Всё"
        ? (state.notesFiltered = state.notes)
        : (state.notesFiltered = state.notes.filter(
            (note) => note.kind === action.payload
          ));
    },
    searchNotes(state, action) {
      action.payload.trim() === ""
        ? (state.notesSearched = state.notes)
        : (state.notesSearched = state.notes.filter((note) =>
            note.title
              .toLowerCase()
              .split(" ")
              .some((el) => el.match(RegExp(`^${action.payload.trim()}`, "i")))
          ));
    },
    addNote(state, action) {
      state.notes.unshift({
        id: nanoid(),
        color: action.payload.color || "",
        title: action.payload.title || "",
        text: action.payload.text || "",
        icon: action.payload.icon || null,
        createdAt: new Date().toISOString(),
        kind: action.payload.kind || "",
      });
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
  filterNotes,
  searchNotes,
  addNote,
  removeNotes,
  updateNote,
  setNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
