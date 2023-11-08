import { createSlice, nanoid } from "@reduxjs/toolkit";
import { NoteType } from "../types";
import { SliceName } from '../const';

const initialState = {
  notes: [] as NoteType[],
  queries: {
    search: "",
    type: "Всё",
    month: "Всё",
    year: "Всё",
  },
};

export const notesSlice = createSlice({
  name: SliceName.Notes,
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
  addNote,
  removeNotes,
  updateNote,
  setNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
