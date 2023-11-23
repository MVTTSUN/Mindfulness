import { styled } from "styled-components/native";
import { DataMeditation, MeditationScreenProp } from "../../../types";
import { TouchableHighlightCard } from "../touchables/TouchableHighlightCard";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useCallback } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import deepEqual from "deep-equal";
import { normalize } from "../../../utils";
import { useLazyGetMeditationsQuery } from "../../../api/api";
import { useFileSystem } from "../../../hooks/useFileSystem";
import {
  getCountFilteredMeditations,
  getMeditations,
} from "../../../store/meditationsSelectors";
import {
  deleteDataMeditationsCopy,
  deleteMeditationsInMeditation,
  setCountMeditations,
  setIsLikeMeditations,
  setKindMeditations,
  setMeditations,
  setSearchMeditations,
  setToggleRandomOrSortMeditations,
} from "../../../store/meditationsSlice";
import { getIsOffline } from "../../../store/offlineSelectors";
import { AppRoute, Color, ErrorMessage, NameFolder } from "../../../const";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { removeMeditationLike } from "../../../store/likesSlice";
import { removeDownloadAudio } from "../../../store/downloadAudioSlice";
import { Preloader } from "../animate-elements/Preloader";
import { setIsUpdatePlayer } from "../../../store/trackPlayerSlice";

type CardListMeditationProps = {
  count: number;
};

export function CardListMeditation(props: CardListMeditationProps) {
  const { count } = props;
  const route = useRoute();
  const navigation = useNavigation<MeditationScreenProp>();
  const meditations = useAppSelector(getMeditations);
  const countFilteredMeditations = useAppSelector(getCountFilteredMeditations);
  const isOffline = useAppSelector(getIsOffline);
  const dispatch = useAppDispatch();
  const [getMeditationsQuery] = useLazyGetMeditationsQuery();
  const { deleteFile } = useFileSystem();
  const { onErrorToast } = useToastCustom();

  const seeAll = () => {
    dispatch(setCountMeditations(meditations.length));
  };

  const navigateMeditation = () =>
    navigation.navigate(AppRoute.MeditationsStack);

  const loadingData = async () => {
    const { data } = await getMeditationsQuery();
    const dataCopy = JSON.parse(JSON.stringify(data)) as DataMeditation[];

    if (data) {
      if (
        !deepEqual(
          meditations,
          dataCopy.sort((a, b) =>
            a.title && b.title ? a.title.localeCompare(b.title) : -1
          )
        )
      ) {
        try {
          dispatch(setIsUpdatePlayer(true));
          const MeditationsForDeleting = meditations.filter(
            (oldMeditation) =>
              !data.some(
                (newMeditation) => oldMeditation._id === newMeditation._id
              )
          );
          for (const meditation of MeditationsForDeleting) {
            await deleteFile(NameFolder.Meditations + meditation._id);
            dispatch(deleteDataMeditationsCopy(meditation));
            dispatch(deleteMeditationsInMeditation(meditation));
            dispatch(removeMeditationLike(meditation._id));
            dispatch(removeDownloadAudio(meditation._id));
          }
          dispatch(setMeditations(data));
          route.name === AppRoute.Home &&
            dispatch(setToggleRandomOrSortMeditations("random"));
        } catch {
          onErrorToast(ErrorMessage.DeleteFile);
        }
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(setCountMeditations(count));

      return () => {
        dispatch(setSearchMeditations(""));
        dispatch(setKindMeditations("Все"));
        dispatch(setIsLikeMeditations(false));
      };
    }, [])
  );

  useEffect(() => {
    if (!isOffline) {
      loadingData();
    }

    route.name === AppRoute.Home
      ? dispatch(setToggleRandomOrSortMeditations("random"))
      : dispatch(setToggleRandomOrSortMeditations("sort"));
  }, []);

  return (
    <>
      {!meditations.length && <Preloader />}
      <ViewContainer>
        {countFilteredMeditations.map((meditation, index) => {
          if (
            index + 1 === count &&
            count % 3 === 0 &&
            countFilteredMeditations.length <= count &&
            meditations.length > count
          ) {
            return (
              <TouchableHighlightCard
                isAll
                key={meditation._id}
                onPress={
                  route.name === AppRoute.Home ? navigateMeditation : seeAll
                }
              >
                Смотреть все
              </TouchableHighlightCard>
            );
          }
          return (
            <TouchableHighlightCard
              color={Color.TextWhite}
              backgroundColor={Color.Meditation}
              underlayColor={Color.MeditationPressed}
              key={meditation._id}
              onPress={() => {
                if (route.name === AppRoute.Home) {
                  navigation.navigate(AppRoute.MeditationsStack, {
                    screen: AppRoute.Meditations,
                    params: {
                      screen: AppRoute.Meditation,
                      meditationId: meditation._id,
                    },
                  });
                } else {
                  navigation.navigate(AppRoute.Meditation, {
                    meditationId: meditation._id,
                  });
                }
              }}
            >
              {meditation.title}
            </TouchableHighlightCard>
          );
        })}
      </ViewContainer>
    </>
  );
}

const ViewContainer = styled.View`
  margin-bottom: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${normalize(10)}px;
`;
