import { NoteType } from "./types";

const processDataForChart = (
  emotions: string[],
  notes: NoteType[],
  type: "after" | "before"
) =>
  emotions
    .map((emotion) => {
      const counts = notes.reduce(
        (acc, note) => {
          if (type === "after" && note.emotionsAfter.includes(emotion)) {
            if (note.title.split(": ")[0] === "Медитация") {
              acc.meditation += 1;
            } else if (note.title.split(": ")[0] === "Задание") {
              acc.task += 1;
            } else {
              acc.unknown += 1;
            }
            acc.all += 1;
          }
          if (type === "before" && note.emotionsBefore.includes(emotion)) {
            if (note.title.split(": ")[0] === "Медитация") {
              acc.meditation += 1;
            } else if (note.title.split(": ")[0] === "Задание") {
              acc.task += 1;
            } else {
              acc.unknown += 1;
            }
            acc.all += 1;
          }
          return acc;
        },
        {
          all: 0,
          meditation: 0,
          task: 0,
          unknown: 0,
        }
      );
      return {
        title: emotion,
        counts: counts,
      };
    })
    .sort((a, b) => b.counts.all - a.counts.all);

export { processDataForChart };
