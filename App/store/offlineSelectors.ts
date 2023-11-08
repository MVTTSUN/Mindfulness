import { SliceName } from '../const';
import { RootState } from '../types';

const getIsOffline = (state: Pick<RootState, SliceName.Offline>) => state[SliceName.Offline].isOffline;

export { getIsOffline };