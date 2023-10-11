import { MaskedRange } from "imask";

type MaskDate = {
  s: {
    mask: typeof Number;
    from: number;
    maxLength: number;
    placeholderChar: string;
  };
  ms: {
    mask: typeof MaskedRange;
    from: number;
    to: number;
    maxLength: number;
    placeholderChar: string;
  };
};

export type { MaskDate };
