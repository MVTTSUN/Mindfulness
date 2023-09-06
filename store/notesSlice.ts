import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Note } from "../types";

const initialState = {
  notes: [] as Note[],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote(state, action) {
      state.notes.unshift({
        id: nanoid(),
        color: action.payload.color || "",
        title: action.payload.title || "",
        text: action.payload.text || "",
        icon: action.payload.icon || null,
        createdAt: new Date().toISOString(),
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

export const { addNote, removeNotes, updateNote, setNotes } =
  notesSlice.actions;

export default notesSlice.reducer;
