import { SliceName } from '../const';
import { RootState } from '../types';

const getInfos = (state: Pick<RootState, SliceName.Infos>) => state[SliceName.Infos].infos;
const getDataInfosCopy = (state: Pick<RootState, SliceName.Infos>) => state[SliceName.Infos].dataInfosCopy;

export { getInfos, getDataInfosCopy };