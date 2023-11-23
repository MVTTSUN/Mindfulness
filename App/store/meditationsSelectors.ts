import { createSelector } from '@reduxjs/toolkit';
import { SliceName } from '../const';
import { RootState } from '../types';
import { getLikesMeditation } from './likesSelectors';
import { getDownloadAudios } from './downloadAudioSelectors';

const getMeditations = (state: Pick<RootState, SliceName.Meditations>) => state[SliceName.Meditations].meditations;
const getMeditationInMeditation = (id: string) => (state: Pick<RootState, SliceName.Meditations>) =>
  state[SliceName.Meditations].meditationsInMeditation.filter((meditation) => meditation.id === id)[0];
const getMeditationInMeditations = (state: Pick<RootState, SliceName.Meditations>) => state[SliceName.Meditations].meditationsInMeditation;
const getDataMeditationCopy = (id: string) => (state: Pick<RootState, SliceName.Meditations>) => {
  
  return state[SliceName.Meditations].dataMeditationsCopy.filter((meditation) => meditation._id === id)[0];
}
const getSearchMeditations = (state: Pick<RootState, SliceName.Meditations>) => state[SliceName.Meditations].searchMeditations;
const getKindMeditations = (state: Pick<RootState, SliceName.Meditations>) => state[SliceName.Meditations].kindMeditations;
const getIsLikeMeditations = (state: Pick<RootState, SliceName.Meditations>) => state[SliceName.Meditations].isLikeMeditations;
const getIsDownloadMeditations = (state: Pick<RootState, SliceName.Meditations>) => state[SliceName.Meditations].isDownloadMeditations;
const getCountMeditations = (state: Pick<RootState, SliceName.Meditations>) => state[SliceName.Meditations].countMeditations;
const getMeditationId = (title: string) => (state: Pick<RootState, SliceName.Meditations>) => {
  const meditations = state[SliceName.Meditations].meditations.filter((task) => task.title === title);
  if (meditations.length > 0) {
    return meditations[0]._id;
  }
  return null;
};
const getRandomOrSortMeditations = (state: Pick<RootState, SliceName.Meditations>) => state[SliceName.Meditations].randomOrSortMeditations;
const getFilteredMeditations = createSelector(
  [
    getRandomOrSortMeditations,
    getSearchMeditations,
    getKindMeditations,
    getIsLikeMeditations,
    getIsDownloadMeditations,
    getLikesMeditation,
    getDownloadAudios
  ],
  (meditations, searchMeditations, kindMeditations, isLikeMeditations, isDownloadMeditations, likesMeditation, downloadAudios) => {
    return meditations.filter((meditation) =>
      (kindMeditations === "Все"
        ? true
        : meditation.kind.includes(kindMeditations)) &&
      (searchMeditations.trim() === ""
        ? true
        : meditation.title && meditation.title
            .split(" ")
            .reverse()
            .reduce(
              (acc: string[], curr) => (
                acc.push(`${curr} ${acc}`.trim()), acc
              ),
              []
            )
            .some((el) =>
              el.match(
                RegExp(
                  `^${searchMeditations
                    .trim()
                    .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}`,
                  "i"
                )
              )
            )) && 
      (!isLikeMeditations
        ? true
        : likesMeditation.some(
            (like: { id: string; isLike: boolean }) => like.id === meditation._id
          )) &&
      (!isDownloadMeditations
        ? true
        : downloadAudios.some(
            (downloadAudio: { id: string; isDownload: boolean }) => downloadAudio.id === meditation._id
        )));
  }
);

const getCountFilteredMeditations = createSelector(
  [getFilteredMeditations, getCountMeditations],
  (filteredMeditations, countMeditations) => filteredMeditations.slice(0, countMeditations)
);

const getDownloadMeditations = createSelector(
  [getMeditationInMeditations, getDownloadAudios],
  (meditationInMeditations, downloadAudios) => meditationInMeditations.filter((meditation) => downloadAudios.some((downloadAudio) => downloadAudio.id === meditation.id))
);

export {
  getMeditationId,
  getMeditations,
  getSearchMeditations,
  getIsLikeMeditations,
  getKindMeditations,
  getIsDownloadMeditations,
  getMeditationInMeditation,
  getDataMeditationCopy,
  getFilteredMeditations,
  getCountFilteredMeditations,
  getDownloadMeditations
};