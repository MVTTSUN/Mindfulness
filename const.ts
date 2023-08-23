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
  },
  borderColor: {
    meditationCard: "#e8e7eb",
    searchOutline: "#f5f4fa",
  },
};

const MAIN_CARDS = [
  {
    id: 1,
    title: "Исцеление разума",
    screen: "Mind Healing",
  },
  {
    id: 2,
    title: "Подсказки",
    screen: "Tips",
  },
  {
    id: 3,
    title: "Медитации",
    screen: "Meditations",
  },
  {
    id: 4,
    title: "Советы на день",
    screen: "Advice of the day",
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
  },
  {
    id: 2,
    title: "Catch Your Breath",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Catch_Your_Breath_-_Dial_Tone.mp3"),
    kind: "Тревога",
    duration: 200,
  },
  {
    id: 3,
    title: "Normandie",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Normandie_-_White_Flag.mp3"),
    kind: "Тревога",
    duration: 229,
  },
  {
    id: 4,
    title: "Our Last Night",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Our_Last_Night_-_Bronze_Serpent.mp3"),
    kind: "Депрессия",
    duration: 250,
  },
  {
    id: 5,
    title: "Sleep Token",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Sleep_Token_-_The_Apparition.mp3"),
    kind: "Стресс",
    duration: 268,
  },
  {
    id: 6,
    title: "Three Days Grace",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Three_Days_Grace_-_Break.mp3"),
    kind: "Депрессия",
    duration: 193,
  },
  {
    id: 7,
    title: "Three Days Grace",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Three_Days_Grace_–_Chalk_Outline.mp3"),
    kind: "Тревога",
    duration: 182,
  },
  {
    id: 8,
    title: "Three Days Grace",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Three_Days_Grace_–_Human_Race.mp3"),
    kind: "Стресс",
    duration: 249,
  },
  {
    id: 9,
    title: "Until I Wake",
    artist: "Mindfulness",
    artwork: require("./assets/images/audio-player-image.png"),
    url: require("./assets/audios/Until_I_Wake_-_Cold.mp3"),
    kind: "Депрессия",
    duration: 179,
  },
];

export { DARK_THEME, LIGHT_THEME, MAIN_CARDS, OPTIONS_DATA, MEDITATIONS_DATA };
