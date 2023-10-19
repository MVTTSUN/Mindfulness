import { getYears } from "./utils/utils";

enum BrowserRoute {
  Main = "/",
  Login = "/signin",
  Register = "/signup",
  Statistic = "/statistic",
  NotFoundPage = "*",
  Tip = "/tip",
  Task = "/task",
  Meditation = "/meditation",
  Emotion = "/emotion",
  Information = "/information",
  Edit = "/edit",
}

enum Color {
  Primary = "#b5f2ea",
  Pastel = "#d4f4ef",
  Dark = "#283957",
  Meditation = "#469ab2",
  Task = "#d2f2d0",
  Errors = "#ff6868",
  TextStandard = "#313131",
  BackgroundMain = "#f5f4fa",
  TextWhite = "#edecf5",
}

enum ErrorText {
  Required = "Поле обязательно для заполнения",
  MinOneField = "Пожалуйста, добавьте хотя бы одно поле",
  SizeFile = "Максимальный размер",
  OnlyCyrillic = "Только кириллические буквы",
  Email = "Неверный формат почты",
}

enum Slice {
  CurrentAudio = "currentAudio",
  Statistics = "statistics",
}

const BASE_URL = "http://192.168.1.111:3000";

const MAX_SIZE_IMAGE = 200;

const OPTIONS_KIND_MEDITATIONS = ["Легкая", "Средняя", "Сложная"];
const OPTIONS_KIND_TASKS = ["Легкое", "Среднее", "Сложное"];

const FILTER_YEARS = getYears();
const FILTER_TYPE = [
  { name: "Все", value: "all" },
  { name: "Медитации", value: "meditations" },
  { name: "Задания", value: "tasks" },
];
const FILTER_MONTHS = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

export {
  BrowserRoute,
  Color,
  ErrorText,
  Slice,
  BASE_URL,
  MAX_SIZE_IMAGE,
  OPTIONS_KIND_MEDITATIONS,
  OPTIONS_KIND_TASKS,
  FILTER_YEARS,
  FILTER_TYPE,
  FILTER_MONTHS,
};
