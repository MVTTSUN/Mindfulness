import { GlobalScreen } from "../../components/GlobalScreen";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { MeditationScreenProp, MeditationData } from "../../types";
import { CenterContainer } from "../../components/CenterContainer";
import { Title } from "../../components/ui/Titles/Title";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { MEDITATIONS_DATA, OPTIONS_DATA } from "../../const";
import { Subtitle } from "../../components/ui/Titles/Subtitle";
import { CardListMeditation } from "../../components/ui/CardListMeditation";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  likeMeditations,
  searchMeditations,
} from "../../store/meditationsSlice";
import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { LikeIcon } from "../../components/icons/LikeIcon";
import { useAppSelector } from "../../hooks/useAppSelector";
import { PlayIcon } from "../../components/icons/PlayIcon";
import { Pressable } from "react-native";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import { PauseIcon } from "../../components/icons/PauseIcon";

export function Meditation() {
  const navigation = useNavigation<MeditationScreenProp>();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const theme = useAppSelector((state) => state.theme.value);
  const likes = useAppSelector((state) => state.likes.likes);
  const [isActive, setIsActive] = useState(false);
  const lastMeditationId = useAppSelector(
    (state) => state.trackPlayer.lastMeditationId
  );
  const playbackState = usePlaybackState();

  useEffect(() => {
    if (route.params) {
      const { meditation } = route.params as { meditation: MeditationData };
      navigation.navigate("Audio", { meditation });
    }
  }, [route.params]);

  const findFavorites = () => {
    if (isActive) {
      dispatch(likeMeditations(null));
    } else {
      dispatch(likeMeditations(likes));
    }
    setIsActive(!isActive);
  };

  const toggleAudio = async () => {
    if (playbackState === State.Paused || playbackState === State.Ready) {
      await TrackPlayer.play();
    } else if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsActive(false);
      };
    }, [])
  );

  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Медитации</Title>
        <SearchView>
          <Input
            onChangeText={(text) => dispatch(searchMeditations(text))}
            width="70%"
            placeholder="Поиск"
          />
          <FavoritesButton
            onPress={findFavorites}
            underlayColor={theme === "light" ? "#d3d3db" : "#1f1f1f"}
          >
            <LikeIcon isActive={isActive} />
          </FavoritesButton>
        </SearchView>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA} />
      <CenterContainer>
        <CardListMeditation count={9} />
        <Subtitle>Последняя медитация</Subtitle>
        <Pressable
          onPress={() => {
            if (lastMeditationId !== null) {
              navigation.navigate("Audio", {
                meditation: MEDITATIONS_DATA[lastMeditationId - 1],
              });
            }
          }}
        >
          <LastMeditation>
            <TextStyled>
              {lastMeditationId === null
                ? "Вы еще не слушали медитации"
                : MEDITATIONS_DATA[lastMeditationId - 1].title}
            </TextStyled>
            <Pressable onPress={toggleAudio}>
              <Play>
                {playbackState === State.Playing ? (
                  <PauseIcon size="16px" />
                ) : (
                  <PlayIcon size="16px" />
                )}
              </Play>
            </Pressable>
          </LastMeditation>
        </Pressable>
        <Subtitle>Как медитировать правильно?</Subtitle>
        <Pressable onPress={() => navigation.navigate("Tips")}>
          <RuleMeditation>
            <TextStyled>Есть несколько советов для этого</TextStyled>
          </RuleMeditation>
        </Pressable>
      </CenterContainer>
    </GlobalScreen>
  );
}

const SearchView = styled.View`
  flex-direction: row;
`;

const FavoritesButton = styled.TouchableHighlight`
  height: 30px;
  padding: 3px 10px;
  background-color: ${({ theme }) => theme.backgroundColor.meditationCard};
  border-radius: 20px;
  transform: translateY(7px);
`;

const LastMeditation = styled.View`
  margin-bottom: 20px;
  padding: 20px 18px 20px 30px;
  border-radius: 30px;
  background-color: #d4f4ef;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextStyled = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 14px;
  color: #313131;
`;

const Play = styled.View`
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #b5f2ea;
`;

const RuleMeditation = styled.View`
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor.meditationCard};
  padding: 25px 15px;
  border-radius: 30px;
`;
