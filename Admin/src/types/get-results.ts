type ElementTextLottieImage = {
  type: "text" | "image" | "lottie";
  payload: string | object;
};

type DataTextLottieImage = {
  data: ElementTextLottieImage[];
  _id: string;
};

export type { ElementTextLottieImage, DataTextLottieImage };
