import { SliceName } from '../const';
import { RootState } from '../types';

const getLikesTask = (state: Pick<RootState, SliceName.Likes>) => state[SliceName.Likes].likesTask;
const getLikesMeditation = (state: Pick<RootState, SliceName.Likes>) => state[SliceName.Likes].likesMeditation;
const getAllLikes = (state: Pick<RootState, SliceName.Likes>) => state[SliceName.Likes];

export { getLikesTask, getLikesMeditation, getAllLikes };