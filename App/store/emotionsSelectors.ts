import { SliceName } from '../const';
import { RootState } from '../types';

const getEmotions = (state: Pick<RootState, SliceName.Emotions>) => state[SliceName.Emotions].emotions;
const getDataEmotionsCopy = (state: Pick<RootState, SliceName.Emotions>) => state[SliceName.Emotions].dataEmotionsCopy;

export { getEmotions, getDataEmotionsCopy };