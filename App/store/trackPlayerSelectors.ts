import { SliceName } from '../const';
import { RootState } from '../types';

const getLastMeditation = (state: Pick<RootState, SliceName.TrackPlayer>) => state[SliceName.TrackPlayer].lastMeditation;
const getIsUpdatePlayer = (state: Pick<RootState, SliceName.TrackPlayer>) => state[SliceName.TrackPlayer].isUpdatePlayer;

export { getLastMeditation, getIsUpdatePlayer };