enum Color {
  Primary = '#aef0f6',
  PrimaryPressed = '#98d3d8',
  PrimaryPastel = '#d1f9fe',
  PrimaryPastelPressed = '#badbdf',
  TextStandard = '#313131',
  TextWhite = '#edecf5',
  Dark = '#283957',
  Meditation = "#469ab2",
  MeditationPressed = "#377a8c",
  Task = "#d2f2d0",
  TaskPressed = "#b9d5b7",
  PlaceholderLight = "#929292",
  PlaceholderDark = "#656566",
  Error = "#ff6868",
}

enum ApiRoute {
  Meditations = "/meditations",
  Tasks = "/tasks",
  Tips = "/tips",
  Emotions = "/emotions",
  Info = "/info",
  Filename = "/filename",
}

enum SliceName {
  Meditations = "meditations",
  Tasks = "tasks",
  Tips = "tips",
  Emotions = "emotions",
  Infos = 'infos',
  Likes = 'likes',
  TrackPlayer = 'trackPlayer',
  Theme = 'theme',
  DownloadAudio = 'downloadAudio',
  Notes = 'notes',
  Notifications = 'notifications',
  Offline = 'offline',
  Tracker = 'tracker',
  Concentration = 'concentration',
}

enum Theme {
  Dark = "dark",
  Light = "light",
}

enum AppRoute {
  Statistics = "Statistics",
  Meditations = "Meditations",
  Tasks = "Tasks",
  Meditation = "Meditation",
  Task = "Task",
  Home = "Home",
  InfoAndSettings = "InfoAndSettings",
  InfoAndSettingsStack = "InfoAndSettingsStack",
  Contacts = "Contacts",
  Service = "Service",
  MeditationsStack = "MeditationsStack",
  TasksStack = "TasksStack",
  NotesStack = "NotesStack",
  Text = "Text",
  Notes = "Notes",
  Note = "Note",
  Notification = "Notification",
  ImportAndExport = "ImportAndExport",
  Storage = "Storage",
  Tips = "Tips",
}

enum NameFolder {
  Meditations = "meditations",
  Tasks = "tasks",
  Infos = "infos",
  Tips = "tips",
}

enum ErrorMessage {
  NoConnect = "Не удалось связаться с сервером. Проверьте связь или включите оффлайн режим.",
  PositionTrack = "Не удалось получить позицию медитации.",
  Player = "Плеер сломан",
  PreviousTrack = "Не удалось перемотать медитацию в начало",
  SeekTrack = "Не удалось перемотать медитацию",
  DeleteFile = "Не удалось удалить данные",
  CreateNotification = "Не удалось создать уведомление",
  DeleteNotification = "Не удалось удалить уведомление",
  DownloadFile = "Не удалось сохранить данные с сервера, чтобы обновить данные",
  DownloadMeditation = "Не удалось сохранить медитацию",
  DeleteMeditation = "Не удалось удалить медитацию",
  Export = "Не удалось экспортировать данные",
  Import = "Не удалось импортировать данные",
  CapacityAudios = "Не удалось узнать объем медитаций",
  CapacityWithoutAudios = "Не удалось узнать объем без медитаций",
  IntializePlayer = "Не удалось инициализировать плеер",
  HideSplash = "Не удалось скрыть сплэш",
  PermissionSave = "Необходимо предоставить доступ к хранилищу",
}

enum SuccessMessage {
  Export = "Данные успешно экспортированы",
  Import = "Данные успешно импортированы",
  DeleteAllMeditations = "Все медитации удалены",
  DownloadMeditation = "Медитация успешно сохранена",
  DeleteMeditation = "Медитация успешно удалена",
}

enum PlatformEnum {
  Android = "android",
  IOS = "ios",
  IPadOS = "ipados",
};

const MAIN_CARDS = [
  {
    id: 1,
    title: "Медитации",
    screen: AppRoute.MeditationsStack,
  },
  {
    id: 2,
    title: "Осознанность как часть жизни",
    screen: AppRoute.TasksStack,
  },
  {
    id: 3,
    title: "Ежедневник",
    screen: AppRoute.NotesStack,
  },
  {
    id: 4,
    title: "Информация",
    screen: AppRoute.InfoAndSettingsStack,
  },
];

const OPTIONS_DATA_TASKS = [
  {
    id: 1,
    title: "Все",
  },
  {
    id: 2,
    title: "Легкое",
  },
  {
    id: 3,
    title: "Среднее",
  },
  {
    id: 4,
    title: "Сложное",
  },
];

const OPTIONS_DATA_MEDITATIONS = [
  {
    id: 1,
    title: "Все",
  },
  {
    id: 2,
    title: "Легкая",
  },
  {
    id: 3,
    title: "Средняя",
  },
  {
    id: 4,
    title: "Сложная",
  },
];

const DATA_INPUTS_NOTE = [
  {
    id: 1,
    title: "Какие ощущения удалось уловить?",
  },
  {
    id: 2,
    title: "Какие возникли сложности?",
  },
  {
    id: 3,
    title: "Что вас удивило?",
  },
  {
    id: 4,
    title: "Вы можете записать любые размышления",
  },
];

const MONTHS = [
  "Всё",
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const NOTIFICATIONS = [
  {
    id: 1,
    hours: 19,
    minutes: 0,
    enable: true,
    isOpen: false,
  },
  {
    id: 2,
    hours: 0,
    minutes: 0,
    enable: false,
    isOpen: false,
  },
  {
    id: 3,
    hours: 0,
    minutes: 0,
    enable: false,
    isOpen: false,
  },
  {
    id: 4,
    hours: 0,
    minutes: 0,
    enable: false,
    isOpen: false,
  },
  {
    id: 5,
    hours: 0,
    minutes: 0,
    enable: false,
    isOpen: false,
  },
];

const NOTIFICATION_MEDITATION = {
  id: 100,
  hours: 20,
  minutes: 0,
  enable: true,
  isOpen: false,
};

const NOTIFICATION_TASK = {
  id: 200,
  hours: 20,
  minutes: 0,
  enable: true,
  isOpen: false,
};

const BASE_URL = 'https://api.mindflns.ru';

const COUNT_DAYS_CALENDAR = 15;

const DAYS_IN_TRACKER = 7;

const NAME_FILE_JSON = "Mindfulness.json";

const THEME_OPTIONS = ["Как на устройстве", "Темная тема", "Светлая тема"];

const TYPES_OPTIONS = ["Всё", "Медитация", "Задание", "..."];

const VERSION_APP = "v 1.0.0";

const NICKNAME_DEVELOPER = "MVTT";

const DARK_THEME = {
  color: {
    standard: "#edecf5",
    selected: "#000",
    selectActive: "#313131",
  },
  backgroundColor: {
    main: "#000",
    tabNavigator: "#1f1f1f",
    selectActive: "#adc0e0",
    blur: "rgba(49, 49, 49, 0.5)",
  },
  borderColor: {
    meditationCard: "#313131",
    searchOutline: "#000",
  },
};

const LIGHT_THEME = {
  color: {
    standard: "#313131",
    selected: "#edecf5",
    selectActive: "#edecf5",
  },
  backgroundColor: {
    main: "#f5f4fa",
    tabNavigator: "#313131",
    selectActive: "#283957",
    blur: "rgba(0, 0, 0, 0.3)",
  },
  borderColor: {
    meditationCard: "#e8e7eb",
    searchOutline: "#f5f4fa",
  },
};

export {
  ApiRoute,
  SliceName,
  Theme,
  AppRoute,
  ErrorMessage,
  SuccessMessage,
  PlatformEnum,
  Color,
  NameFolder,
  DARK_THEME,
  LIGHT_THEME,
  MAIN_CARDS,
  DATA_INPUTS_NOTE,
  BASE_URL,
  OPTIONS_DATA_TASKS,
  OPTIONS_DATA_MEDITATIONS,
  MONTHS,
  COUNT_DAYS_CALENDAR,
  DAYS_IN_TRACKER,
  NAME_FILE_JSON,
  THEME_OPTIONS,
  TYPES_OPTIONS,
  VERSION_APP,
  NICKNAME_DEVELOPER,
  NOTIFICATIONS,
  NOTIFICATION_MEDITATION,
  NOTIFICATION_TASK,
};
