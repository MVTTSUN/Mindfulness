import { Slice } from "../const";
import { RootState } from "../hooks/useAppSelector";

const getCurrentTime = (state: Pick<RootState, Slice.CurrentAudio>) =>
  state[Slice.CurrentAudio].currentTime;
const getDuration = (state: Pick<RootState, Slice.CurrentAudio>) =>
  state[Slice.CurrentAudio].duration;
const getAudioSrc = (state: Pick<RootState, Slice.CurrentAudio>) =>
  state[Slice.CurrentAudio].src;
const getIsPause = (state: Pick<RootState, Slice.CurrentAudio>) =>
  state[Slice.CurrentAudio].isPause;

export { getCurrentTime, getDuration, getAudioSrc, getIsPause };
