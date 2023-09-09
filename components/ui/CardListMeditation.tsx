import { styled } from "styled-components/native";
import { MeditationScreenProp } from "../../types";
import { TouchableCardMeditation } from "./Touchables/TouchableCardMeditation";
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

type CardListMeditationProps = {
  count: number;
};

export function CardListMeditation({ count }: CardListMeditationProps) {
  const meditationFiltered = useAppSelector(
    (state) => state.meditations.meditationsFiltered
  );
  const meditationSearched = useAppSelector(
    (state) => state.meditations.meditationsSearched
  );
  const meditationsLike = useAppSelector(
    (state) => state.meditations.meditationsLike
  );
  const route = useRoute();
  const [meditations, setMeditations] = useState(
    meditationFiltered.slice(0, count)
  );
  const navigation = useNavigation<MeditationScreenProp>();
  const dispatch = useAppDispatch();

  const seeAll = () => {
    setMeditations(meditationFiltered);
  };

  const navigateMeditation = () => navigation.navigate("Meditation");

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(filterMeditations("Всё"));
        dispatch(likeMeditations(null));
        setMeditations(meditationFiltered.slice(0, count));
      };
    }, [])
  );

  useEffect(() => {
    setMeditations(
      meditationFiltered
        .filter((meditation) => meditationSearched.includes(meditation))
        .filter((meditation) => meditationsLike.includes(meditation))
        .slice(0, count)
    );
  }, [meditationFiltered, meditationSearched, meditationsLike]);

  return (
    <ViewContainer>
      {meditations.map((meditation, index) => {
        if (
          index + 1 === count &&
          count % 3 === 0 &&
          meditations !== meditationFiltered
        ) {
          return (
            <TouchableCardMeditation
              isAll
              key={meditation.id}
              onPress={route.name === "Home" ? navigateMeditation : seeAll}
            >
              Смотреть все
            </TouchableCardMeditation>
          );
        }
        return (
          <TouchableCardMeditation
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
          </TouchableCardMeditation>
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
