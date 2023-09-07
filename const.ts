const DARK_THEME = {
  color: {
    standard: "#edecf5",
    selected: "#000",
    selectActive: "#313131",
  },
  backgroundColor: {
    main: "#000",
    primary: "#b5f2ea",
    tabNavigator: "#1f1f1f",
    selectActive: "#edecf5",
    meditationCard: "#313131",
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
    primary: "#b5f2ea",
    tabNavigator: "#313131",
    selectActive: "#313131",
    meditationCard: "#e8e7eb",
    blur: "rgba(0, 0, 0, 0.3)",
  },
  borderColor: {
    meditationCard: "#e8e7eb",
    searchOutline: "#f5f4fa",
  },
};

const MAIN_COLOR = {
  normal: "#b5f2ea",
  normalPressed: "#9dd8d0",
  pastel: "#d4f4ef",
  pastelPressed: "#aedcd6",
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

export {
  DARK_THEME,
  LIGHT_THEME,
  MAIN_CARDS,
  OPTIONS_DATA,
  MEDITATIONS_DATA,
  MAIN_COLOR,
};
