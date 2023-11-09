import { SliceName } from '../const';
import { RootState } from '../types';

const getLikesTask = (state: Pick<RootState, SliceName.Likes>) => state[SliceName.Likes].likesTask;
const getIsLikeTask = (id: string) => (state: Pick<RootState, SliceName.Likes>) =>
  state[SliceName.Likes].likesTask.some((like) => like.id === id);
const getLikesMeditation = (state: Pick<RootState, SliceName.Likes>) => state[SliceName.Likes].likesMeditation;
const getIsLikeMeditation = (id: string) => (state: Pick<RootState, SliceName.Likes>) =>
  state[SliceName.Likes].likesMeditation.some((like) => like.id === id);
const getAllLikes = (state: Pick<RootState, SliceName.Likes>) => state[SliceName.Likes];

export { getLikesTask, getIsLikeTask,  getLikesMeditation, getIsLikeMeditation, getAllLikes };