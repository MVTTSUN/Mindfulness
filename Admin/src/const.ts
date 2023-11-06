import { getYears } from "./utils/utils";

enum BrowserRoute {
  Main = "/",
  Login = "/login",
  Register = "/registration",
  Statistic = "/statistic",
  NotFoundPage = "*",
  Tip = "/tip",
  Task = "/task",
  Meditation = "/meditation",
  Emotion = "/emotion",
  Information = "/information",
  Edit = "/edit",
  Profile = "/profile",
}

enum ApiRoute {
  Meditations = "/meditations",
  Tasks = "/tasks",
  Tips = "/tips",
  Emotions = "/emotions",
  Info = "/info",
  Filename = "/filename",
  Statistics = "/statistics",
  Validate = "/validate",
  Auth = "/auth",
}

enum Color {
  Primary = "#aef0f6",
  Pastel = "#d1f9fe",
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
  PasswordCompare = "Пароли не совпадают",
  Password = "Пароль должен быть не менее 8 символов, включать в себя строчные и прописные буквы на латинице, хотя бы одну цифру и хотя бы один спецсимвол",
}

enum Slice {
  CurrentAudio = "currentAudio",
  Statistics = "statistics",
}

enum Image {
  Backward = "/images/backward.svg",
  Forward = "/images/forward.svg",
  Pause = "/images/pause.svg",
  Play = "/images/play.svg",
  Burger = "/images/burger.svg",
  Close = "/images/close.svg",
  CloudLoad = "/images/cloud-load.svg",
  Image = "/images/image.svg",
  Move = "/images/move.svg",
  VisiblePassword = "/images/visible-password.svg",
  Profile = "/images/profile.svg",
  EmptyImg = "/images/empty.jpg",
  Logo = "/images/logo.svg"
}

const MEDITATION_AUDIO_ID = "meditation-audio";

const BASE_URL = "https://api.mindflns.ru";

const MAX_SIZE_IMAGE = 500;

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

const AUTH_TOKEN_NAME = "token";

export {
  BrowserRoute,
  ApiRoute,
  Color,
  ErrorText,
  Slice,
  Image,
  BASE_URL,
  MAX_SIZE_IMAGE,
  OPTIONS_KIND_MEDITATIONS,
  OPTIONS_KIND_TASKS,
  FILTER_YEARS,
  FILTER_TYPE,
  FILTER_MONTHS,
  MEDITATION_AUDIO_ID,
  AUTH_TOKEN_NAME,
};
