import { SliceName } from '../const';
import { RootState } from '../types';

const getDownloadAudios = (state: Pick<RootState, SliceName.DownloadAudio>) => state[SliceName.DownloadAudio].downloadAudios;

export { getDownloadAudios };