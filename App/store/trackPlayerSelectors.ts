import { SliceName } from '../const';
import { RootState } from '../types';

const getLastMeditation = (state: Pick<RootState, SliceName.TrackPlayer>) => state[SliceName.TrackPlayer].lastMeditation;
const getIsInitializedPlayer = (state: Pick<RootState, SliceName.TrackPlayer>) => state[SliceName.TrackPlayer].isInitializedPlayer;

export { getLastMeditation, getIsInitializedPlayer };