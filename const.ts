const DARK_THEME = {
  color: {
    standard: "#edecf5",
    selected: "#000",
    selectActive: "#313131",
    meditation: "#edecf5",
    task: "#313131",
  },
  backgroundColor: {
    main: "#000",
    primary: "#b5f2ea",
    tabNavigator: "#1f1f1f",
    selectActive: "#adc0e0",
    taskCard: "#e6f4e5",
    meditationCard: "#469ab2",
    meditationCardPressed: "#377a8c",
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
    meditation: "#edecf5",
    task: "#313131",
    selected: "#edecf5",
    selectActive: "#edecf5",
  },
  backgroundColor: {
    main: "#f5f4fa",
    primary: "#b5f2ea",
    tabNavigator: "#313131",
    selectActive: "#283957",
    taskCard: "#d2f2d0",
    meditationCard: "#469ab2",
    meditationCardPressed: "#377a8c",
    blur: "rgba(0, 0, 0, 0.3)",
  },
  borderColor: {
    meditationCard: "#e8e7eb",
    searchOutline: "#f5f4fa",
  },
};

const MAIN_COLOR = {
  normal: "#aef0f6",
  normalPressed: "#98d3d8",
  pastel: "#d1f9fe",
  pastelPressed: "#badbdf",
};

const COLORS = {
  mainColors: {
    normal: "#aef0f6",
    normalPressed: "#98d3d8",
    pastel: "#d1f9fe",
    pastelPressed: "#badbdf",
  },
  textColors: {
    normal: "#313131",
    meditationCard: "#edecf5",
    taskCard: "#313131",
  },
  backgroundColors: {
    dark: "#283957",
    meditationCard: "#469ab2",
    meditationCardPressed: "#377a8c",
    taskCard: "#d2f2d0",
    taskCardPressed: "#b9d5b7",
  },
  borderColors: {},
};

const MAIN_CARDS = [
  {
    id: 1,
    title: "Медитации",
    screen: "MeditationStack",
  },
  {
    id: 2,
    title: "Осознанность как часть жизни",
    screen: "TasksStack",
  },
  {
    id: 3,
    title: "Ежедневник",
    screen: "NotesStack",
  },
  {
    id: 4,
    title: "Информация",
    screen: "InfoAndSettingsStack",
  },
];

const OPTIONS_DATA = [
  {
    id: 1,
    title: "Всё",
    isActive: true,
  },
  {
    id: 2,
    title: "Тревога",
    isActive: false,
  },
  {
    id: 3,
    title: "Стресс",
    isActive: false,
  },
  {
    id: 4,
    title: "Депрессия",
    isActive: false,
  },
];

const MEDITATIONS_DATA = [
  {
    id: 1,
    title: "Bad Omens",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Bad_Omens_-_Like_A_Villain.mp3"),
    kind: "Депрессия",
    duration: 210,
    textLines: [
      { timeAt: 12, timeTo: 15.5, text: "Look into my face, then look again" },
      {
        timeAt: 15.5,
        timeTo: 18,
        text: "We are not the same, we're different",
      },
      { timeAt: 18, timeTo: 21, text: "To tell your tales and fables" },
      { timeAt: 21, timeTo: 24, text: "You couldn't wait" },
      {
        timeAt: 24,
        timeTo: 28,
        text: "You need a new clean slate without the dents",
      },
      {
        timeAt: 28,
        timeTo: 32,
        text: "A place to put your pain, your consequence",
      },
    ],
  },
  {
    id: 2,
    title: "Catch Your Breath",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Catch_Your_Breath_-_Dial_Tone.mp3"),
    kind: "Тревога",
    duration: 200,
    textLines: [
      { timeAt: 0, timeTo: 5, text: "Look into my face, then look again" },
      { timeAt: 5, timeTo: 10, text: "We are not the same, we're different" },
      { timeAt: 10, timeTo: 15, text: "To tell your tales and fables" },
      { timeAt: 15, timeTo: 20, text: "You couldn't wait" },
      {
        timeAt: 20,
        timeTo: 25,
        text: "You need a new clean slate without the dents",
      },
      {
        timeAt: 25,
        timeTo: 30,
        text: "A place to put your pain, your consequence",
      },
    ],
  },
  {
    id: 3,
    title: "Normandie",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Normandie_-_White_Flag.mp3"),
    kind: "Тревога",
    duration: 229,
    textLines: [
      { timeAt: 0, timeTo: 5, text: "Look into my face, then look again" },
      { timeAt: 5, timeTo: 10, text: "We are not the same, we're different" },
      { timeAt: 10, timeTo: 15, text: "To tell your tales and fables" },
      { timeAt: 15, timeTo: 20, text: "You couldn't wait" },
      {
        timeAt: 20,
        timeTo: 25,
        text: "You need a new clean slate without the dents",
      },
      {
        timeAt: 25,
        timeTo: 30,
        text: "A place to put your pain, your consequence",
      },
    ],
  },
  {
    id: 4,
    title: "Our Last Night",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Our_Last_Night_-_Bronze_Serpent.mp3"),
    kind: "Депрессия",
    duration: 250,
    textLines: [
      { timeAt: 0, timeTo: 5, text: "Look into my face, then look again" },
      { timeAt: 5, timeTo: 10, text: "We are not the same, we're different" },
      { timeAt: 10, timeTo: 15, text: "To tell your tales and fables" },
      { timeAt: 15, timeTo: 20, text: "You couldn't wait" },
      {
        timeAt: 20,
        timeTo: 25,
        text: "You need a new clean slate without the dents",
      },
      {
        timeAt: 25,
        timeTo: 30,
        text: "A place to put your pain, your consequence",
      },
    ],
  },
  {
    id: 5,
    title: "Sleep Token",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Sleep_Token_-_The_Apparition.mp3"),
    kind: "Стресс",
    duration: 268,
    textLines: [
      { timeAt: 0, timeTo: 5, text: "Look into my face, then look again" },
      { timeAt: 5, timeTo: 10, text: "We are not the same, we're different" },
      { timeAt: 10, timeTo: 15, text: "To tell your tales and fables" },
      { timeAt: 15, timeTo: 20, text: "You couldn't wait" },
      {
        timeAt: 20,
        timeTo: 25,
        text: "You need a new clean slate without the dents",
      },
      {
        timeAt: 25,
        timeTo: 30,
        text: "A place to put your pain, your consequence",
      },
    ],
  },
  {
    id: 6,
    title: "Three Days Grace",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Three_Days_Grace_-_Break.mp3"),
    kind: "Депрессия",
    duration: 193,
    textLines: [
      { timeAt: 0, timeTo: 5, text: "Look into my face, then look again" },
      { timeAt: 5, timeTo: 10, text: "We are not the same, we're different" },
      { timeAt: 10, timeTo: 15, text: "To tell your tales and fables" },
      { timeAt: 15, timeTo: 20, text: "You couldn't wait" },
      {
        timeAt: 20,
        timeTo: 25,
        text: "You need a new clean slate without the dents",
      },
      {
        timeAt: 25,
        timeTo: 30,
        text: "A place to put your pain, your consequence",
      },
    ],
  },
  {
    id: 7,
    title: "Three Days Grace",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Three_Days_Grace_–_Chalk_Outline.mp3"),
    kind: "Тревога",
    duration: 182,
    textLines: [
      { timeAt: 0, timeTo: 5, text: "Look into my face, then look again" },
      { timeAt: 5, timeTo: 10, text: "We are not the same, we're different" },
      { timeAt: 10, timeTo: 15, text: "To tell your tales and fables" },
      { timeAt: 15, timeTo: 20, text: "You couldn't wait" },
      {
        timeAt: 20,
        timeTo: 25,
        text: "You need a new clean slate without the dents",
      },
      {
        timeAt: 25,
        timeTo: 30,
        text: "A place to put your pain, your consequence",
      },
    ],
  },
  {
    id: 8,
    title: "Three Days Grace",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Three_Days_Grace_–_Human_Race.mp3"),
    kind: "Стресс",
    duration: 249,
    textLines: [
      { timeAt: 0, timeTo: 5, text: "Look into my face, then look again" },
      { timeAt: 5, timeTo: 10, text: "We are not the same, we're different" },
      { timeAt: 10, timeTo: 15, text: "To tell your tales and fables" },
      { timeAt: 15, timeTo: 20, text: "You couldn't wait" },
      {
        timeAt: 20,
        timeTo: 25,
        text: "You need a new clean slate without the dents",
      },
      {
        timeAt: 25,
        timeTo: 30,
        text: "A place to put your pain, your consequence",
      },
    ],
  },
  {
    id: 9,
    title: "Until I Wake",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Until_I_Wake_-_Cold.mp3"),
    kind: "Депрессия",
    duration: 179,
    textLines: [
      { timeAt: 0, timeTo: 5, text: "Look into my face, then look again" },
      { timeAt: 5, timeTo: 10, text: "We are not the same, we're different" },
      { timeAt: 10, timeTo: 15, text: "To tell your tales and fables" },
      { timeAt: 15, timeTo: 20, text: "You couldn't wait" },
      {
        timeAt: 20,
        timeTo: 25,
        text: "You need a new clean slate without the dents",
      },
      {
        timeAt: 25,
        timeTo: 30,
        text: "A place to put your pain, your consequence",
      },
    ],
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

const EMOTIONS = [
  "Неловкость",
  "Смущение",
  "Стыд",
  "Вина",
  "Удовлетворение",
  "Удовольствие",
  "Радость",
  "Восторг",
  "Досада",
  "Обида",
  "Зависть",
  "Безразличие",
  "Спокойствие",
  "Умиротворение",
  "Разочарование",
  "Печаль",
  "Грусть",
  "Тоска",
  "Отчаяние",
  "Горе",
  "Недовольство",
  "Неприязнь",
  "Отвращение",
  "Беспокойство",
  "Тревога",
  "Страх",
  "Ужас",
  "Удивление",
  "Интерес",
  "Предвкушение",
  "Воодушевление",
  "Раздражение",
  "Злость",
  "Гнев",
  "Ярость",
].sort();

const TIP = [
  {
    type: "text",
    payload:
      "Медитация — практика, которая полезна практически всем. Она помогает снижать уровень стресса, справляться с агрессией, тренировать внимание, успокаиваться и прислушиваться к себе. Хотя кажется, что для нее нужны особые условия и инструктор, на самом деле это не так — есть простые техники, которые можно выполнять дома, например дыхательная медитация. Рассказываем, какие это техники и как с ними работать.",
  },
  {
    type: "lottie",
    payload: require("./assets/lottie/animaRound.json"),
  },
  {
    type: "text",
    payload:
      "Медитация — практика, которая полезна практически всем. Она помогает снижать уровень стресса, справляться с агрессией, тренировать внимание, успокаиваться и прислушиваться к себе. Хотя кажется, что для нее нужны особые условия и инструктор, на самом деле это не так — есть простые техники, которые можно выполнять дома, например дыхательная медитация. Рассказываем, какие это техники и как с ними работать.",
  },
  {
    type: "image",
    payload: require("./assets/images/audio-player-image.png"),
  },
  {
    type: "text",
    payload:
      "Медитация — практика, которая полезна практически всем. Она помогает снижать уровень стресса, справляться с агрессией, тренировать внимание, успокаиваться и прислушиваться к себе. Хотя кажется, что для нее нужны особые условия и инструктор, на самом деле это не так — есть простые техники, которые можно выполнять дома, например дыхательная медитация. Рассказываем, какие это техники и как с ними работать.",
  },
];

const TASKS = [
  {
    id: 1,
    title: "Задача 1",
    kind: "Тревога",
    content: [
      {
        type: "text",
        payload:
          "Медитация — практика, которая полезна практически всем. Она помогает снижать уровень стресса, справляться с агрессией, тренировать внимание, успокаиваться и прислушиваться к себе. Хотя кажется, что для нее нужны особые условия и инструктор, на самом деле это не так — есть простые техники, которые можно выполнять дома, например дыхательная медитация. Рассказываем, какие это техники и как с ними работать.",
      },
      {
        type: "lottie",
        payload: require("./assets/lottie/dotlottie.lottie"),
      },
      {
        type: "text",
        payload:
          "Медитация — практика, которая полезна практически всем. Она помогает снижать уровень стресса, справляться с агрессией, тренировать внимание, успокаиваться и прислушиваться к себе. Хотя кажется, что для нее нужны особые условия и инструктор, на самом деле это не так — есть простые техники, которые можно выполнять дома, например дыхательная медитация. Рассказываем, какие это техники и как с ними работать.",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
      {
        type: "text",
        payload:
          "Медитация — практика, которая полезна практически всем. Она помогает снижать уровень стресса, справляться с агрессией, тренировать внимание, успокаиваться и прислушиваться к себе. Хотя кажется, что для нее нужны особые условия и инструктор, на самом деле это не так — есть простые техники, которые можно выполнять дома, например дыхательная медитация. Рассказываем, какие это техники и как с ними работать.",
      },
    ],
  },
  {
    id: 2,
    title: "Задача 2",
    kind: "Тревога",
    content: [
      {
        type: "lottie",
        payload: require("./assets/lottie/dotlottie.lottie"),
      },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 3,
    title: "Задача 3",
    kind: "Депрессия",
    content: [
      {
        type: "lottie",
        payload: require("./assets/lottie/mind.lottie"),
      },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 4,
    title: "Задача 4",
    kind: "Стресс",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 5,
    title: "Задача 5",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 6,
    title: "Задача 6",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 7,
    title: "Задача 7",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 8,
    title: "Задача 8",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 9,
    title: "Задача 9",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 10,
    title: "Задача 10",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 11,
    title: "Задача 11",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 12,
    title: "Задача 12",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 13,
    title: "Задача 13",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 14,
    title: "Задача 14",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 15,
    title: "Задача 15",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 16,
    title: "Задача 16",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
  {
    id: 17,
    title: "Задача 17",
    kind: "Тревога",
    content: [
      // {
      //   type: "lottie",
      //   payload: require("./assets/lottie/dotlottie.lottie"),
      // },
      {
        type: "text",
        payload: "You need a new clean slate without the dents",
      },
      {
        type: "image",
        payload: require("./assets/images/audio-player-image.png"),
      },
    ],
  },
];

export {
  DARK_THEME,
  LIGHT_THEME,
  MAIN_CARDS,
  OPTIONS_DATA,
  MEDITATIONS_DATA,
  MAIN_COLOR,
  COLORS,
  DATA_INPUTS_NOTE,
  EMOTIONS,
  TASKS,
  TIP,
};
