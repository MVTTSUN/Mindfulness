import { createSelector } from '@reduxjs/toolkit';
import { SliceName } from '../const';
import { RootState } from '../types';

const getNotes = (state: Pick<RootState, SliceName.Notes>) => state[SliceName.Notes].notes;
const getNotesQueries = (state: Pick<RootState, SliceName.Notes>) => state[SliceName.Notes].queries;

const getFilteredNotes = createSelector(
  [getNotes, getNotesQueries],
  (notes, queries) => {
    return notes.filter(
      (note) =>
        (note.title.match(
          RegExp(
            queries.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
            "i"
          )
        ) ||
          note.texts.some((el) =>
            el.match(
              RegExp(
                queries.search.replace(
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
                queries.search.replace(
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
                queries.search.replace(
                  /[-[\]{}()*+?.,\\^$|#\s]/g,
                  "\\$&"
                ),
                "i"
              )
            )
          )) &&
        (queries.type === "Всё"
          ? true
          : note.title.match(
              RegExp(
                `^${queries.type.replace(
                  /[-[\]{}()*+?.,\\^$|#\s]/g,
                  "\\$&"
                )}`,
                "i"
              )
            )) &&
        (queries.month === "Всё"
          ? true
          : new Date(note.createdAt)
              .toLocaleString("ru", {
                month: "long",
                year: "numeric",
                day: "numeric",
              })
              .match(RegExp(`${queries.month.slice(0, -1)}`, "i"))) &&
        (queries.year === "Всё"
          ? true
          : new Date(note.createdAt)
              .toLocaleString("ru", {
                month: "long",
                year: "numeric",
                day: "numeric",
              })
              .match(RegExp(`${queries.year}`, "i")))
    );
  }
);

export { getNotes, getNotesQueries, getFilteredNotes };