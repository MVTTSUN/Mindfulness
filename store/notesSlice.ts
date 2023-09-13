import { createSlice, nanoid } from "@reduxjs/toolkit";
import { NoteType } from "../types";

const initialState = {
  notes: [] as NoteType[],
  notesFiltered: [] as NoteType[],
  notesSearched: [] as NoteType[],
  notesLike: [] as NoteType[],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
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

export const { searchNotes, addNote, removeNotes, updateNote, setNotes } =
  notesSlice.actions;

export default notesSlice.reducer;
