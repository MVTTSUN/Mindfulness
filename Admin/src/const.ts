enum BrowserRoute {
  Main = "/",
  Login = "/login",
  NotFoundPage = "*",
  Tip = "/tip",
  Task = "/task",
  Meditation = "/meditation",
  Emotion = "/emotion",
  Information = "/information",
}

enum Color {
  Primary = "#b5f2ea",
  Pastel = "#d4f4ef",
  Dark = "#283957",
  Meditation = "#469ab2",
  Errors = "#ff6868",
  TextStandard = "#313131",
  BackgroundMain = "#f5f4fa",
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

export { BrowserRoute, Color, ErrorText, Slice, BASE_URL };
