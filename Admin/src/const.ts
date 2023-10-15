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
}

const BASE_URL = "http://localhost:3000";

const MAX_SIZE_IMAGE = 200;

export { BrowserRoute, Color, ErrorText, Slice, BASE_URL, MAX_SIZE_IMAGE };
