import { SliceName } from '../const';
import { RootState } from '../types';

const getTips = (state: Pick<RootState, SliceName.Tips>) => state[SliceName.Tips].tips;
const getDataTipsCopy = (state: Pick<RootState, SliceName.Tips>) => state[SliceName.Tips].dataTipsCopy;

export { getTips, getDataTipsCopy };