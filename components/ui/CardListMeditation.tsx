import { styled } from "styled-components/native";
import { MeditationScreenProp } from "../../types";
import { TouchableHighlightCard } from "./Touchables/TouchableHighlightCard";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  filterMeditations,
  likeMeditations,
} from "../../store/meditationsSlice";
import { COLORS } from "../../const";
import deepEqual from "deep-equal";

type CardListMeditationProps = {
  count: number;
};

export function CardListMeditation({ count }: CardListMeditationProps) {
  const meditationsFiltered = useAppSelector(
    (state) => state.meditations.meditationsFiltered
  );
  const meditationsSearched = useAppSelector(
    (state) => state.meditations.meditationsSearched
  );
  const meditationsLike = useAppSelector(
    (state) => state.meditations.meditationsLike
  );
  const route = useRoute();
  const [meditations, setMeditations] = useState(
    meditationsFiltered.slice(0, count)
  );
  const navigation = useNavigation<MeditationScreenProp>();
  const dispatch = useAppDispatch();

  const seeAll = () => {
    setMeditations(meditationsFiltered);
  };

  const navigateMeditation = () => navigation.navigate("MeditationStack");

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(filterMeditations("Всё"));
        dispatch(likeMeditations(null));
        setMeditations(meditationsFiltered.slice(0, count));
      };
    }, [])
  );

  useEffect(() => {
    setMeditations(
      meditationsFiltered
        .filter((meditation) =>
          meditationsSearched.some((meditationSearched) =>
            deepEqual(meditation, meditationSearched)
          )
        )
        .filter((meditation) =>
          meditationsLike.some((meditationLike) =>
            deepEqual(meditation, meditationLike)
          )
        )
        .slice(0, count)
    );
  }, [meditationsFiltered, meditationsSearched, meditationsLike]);

  return (
    <ViewContainer>
      {meditations.map((meditation, index) => {
        if (
          index + 1 === count &&
          count % 3 === 0 &&
          meditations !== meditationsFiltered
        ) {
          return (
            <TouchableHighlightCard
              isAll
              key={meditation.id}
              onPress={route.name === "Home" ? navigateMeditation : seeAll}
            >
              Смотреть все
            </TouchableHighlightCard>
          );
        }
        return (
          <TouchableHighlightCard
            color={COLORS.textColors.meditationCard}
            backgroundColor={COLORS.backgroundColors.meditationCard}
            underlayColor={COLORS.backgroundColors.meditationCardPressed}
            key={meditation.id}
            onPress={() => {
              if (route.name === "Home") {
                navigation.navigate("MeditationStack", {
                  screen: "Meditation",
                  params: { screen: "Audio", meditation },
                });
              } else {
                navigation.navigate("Audio", { meditation });
              }
            }}
          >
            {meditation.title}
          </TouchableHighlightCard>
        );
      })}
    </ViewContainer>
  );
}

const ViewContainer = styled.View`
  margin-bottom: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;
