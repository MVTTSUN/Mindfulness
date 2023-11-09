import { SliceName } from '../const';
import { RootState } from '../types';

const getDownloadAudios = (state: Pick<RootState, SliceName.DownloadAudio>) => state[SliceName.DownloadAudio].downloadAudios;
const getIsDownloadAudios = (id: string) => (state: Pick<RootState, SliceName.DownloadAudio>) =>
  state[SliceName.DownloadAudio].downloadAudios.some((downloadAudio) => downloadAudio.id === id);

export { getDownloadAudios, getIsDownloadAudios };