import { Dimensions, PixelRatio } from 'react-native';
import { DataEmotion, NoteType } from "./types";
import { COUNT_DAYS_CALENDAR } from './const';

const processDataForChart = (
  emotions: DataEmotion[],
  notes: NoteType[],
  type: "after" | "before"
) =>
  emotions
    .map((emotion) => {
      const counts = notes.reduce(
        (acc, note) => {
          if (type === "after" && note.emotionsAfter.includes(emotion.value)) {
            if (note.title.split(": ")[0] === "Медитация") {
              acc.meditation += 1;
            } else if (note.title.split(": ")[0] === "Задание") {
              acc.task += 1;
            } else {
              acc.unknown += 1;
            }
            acc.all += 1;
          }
          if (type === "before" && note.emotionsBefore.includes(emotion.value)) {
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
        title: emotion.value,
        counts: counts,
      };
    })
    .sort((a, b) => b.counts.all - a.counts.all);

const normalize = (size: number) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const scale = SCREEN_WIDTH / 392;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const getYearsFilterVariants = () => {
  const years = ["Всё"];

  for (let i = 2023; i <= new Date().getFullYear(); i++) {
    years.push(String(i));
  }

  return years;
};

const getFirstFutureThirtyDays = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < COUNT_DAYS_CALENDAR; i++) {
    days.push(new Date(new Date().setDate(today.getDate() + i)));
  }

  return days;
};

const bytesFormatTo = (bytes?: number) => {
  if (bytes || bytes === 0) {
    const KB = bytes / 1024;
    if (KB < 1024) {
      return `${KB.toFixed(1).split(".").join(",")} КБ`;
    }

    const MB = KB / 1024;
    if (MB < 1024) {
      return `${MB.toFixed(1).split(".").join(",")} МБ`;
    }

    const GB = MB / 1024;
    if (GB < 1024) {
      return `${GB.toFixed(1).split(".").join(",")} ГБ`;
    }

    return `${(GB / 1024).toFixed(1).split(".").join(",")} ТБ`;
  }
};

const levelAdapter = (level?: string) => {
  if (level) {
    if (level.includes('Легк')) {
      return 'низкая';
    } else if (level.includes('Средн')) {
      return 'средняя';
    } else if (level.includes('Сложн')) {
      return 'высокая';
    }
  } else return '';
}

export { processDataForChart, normalize, getYearsFilterVariants, getFirstFutureThirtyDays, bytesFormatTo, levelAdapter };
