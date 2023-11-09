import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { MeditationScreenProp } from "../../types";
import { CenterContainer } from "../../components/CenterContainer";
import { Title } from "../../components/ui/titles/Title";
import { Input } from "../../components/ui/inputs/Input";
import { Select } from "../../components/ui/inputs/Select";
import {
  AppRoute,
  Color,
  ErrorMessage,
  OPTIONS_DATA_MEDITATIONS,
} from "../../const";
import { Subtitle } from "../../components/ui/titles/Subtitle";
import { CardListMeditation } from "../../components/ui/lists/CardListMeditation";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useCallback, useEffect } from "react";
import { styled } from "styled-components/native";
import { LikeIcon } from "../../components/svg/icons/other-icons/LikeIcon";
import { useAppSelector } from "../../hooks/useAppSelector";
import { PlayIcon } from "../../components/svg/icons/other-icons/PlayIcon";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import { PauseIcon } from "../../components/svg/icons/other-icons/PauseIcon";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { normalize } from "../../utils";
import {
  setIsDownloadMeditations,
  setIsLikeMeditations,
  setSearchMeditations,
} from "../../store/meditationsSlice";
import { getLastMeditation } from "../../store/trackPlayerSelectors";
import { ProgressCircle } from "../../components/ui/progress/ProgressCircle";
import {
  getIsDownloadMeditations,
  getIsLikeMeditations,
  getSearchMeditations,
} from "../../store/meditationsSelectors";
import { useToastCustom } from "../../hooks/useToastCustom";

export function Meditations() {
  const route = useRoute();
  const navigation = useNavigation<MeditationScreenProp>();
  const isDownloadMeditations = useAppSelector(getIsDownloadMeditations);
  const isLikeMeditations = useAppSelector(getIsLikeMeditations);
  const lastMeditation = useAppSelector(getLastMeditation);
  const searchMeditations = useAppSelector(getSearchMeditations);
  const dispatch = useAppDispatch();
  const playbackState = usePlaybackState();
  const { onErrorToast } = useToastCustom();
  const borderRadius = useSharedValue(normalize(20));
  const rotate = useSharedValue(0);
  const playButtonStyle = useAnimatedStyle(() => ({
    borderRadius: withTiming(borderRadius.value, {
      duration: 500,
      easing: Easing.bezier(0.25, -0.5, 0.25, 1),
    }),
    transform: [{ rotate: `${rotate.value * 360}deg` }],
  }));
  const scaleLike = useSharedValue(1);
  const likeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleLike.value }],
  }));
  const scaleDownload = useSharedValue(1);
  const downloadStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleDownload.value }],
  }));

  const findFavorites = () => {
    scaleLike.value = withSequence(
      withSpring(1),
      withSpring(1.2),
      withSpring(1)
    );
    if (isLikeMeditations) {
      dispatch(setIsLikeMeditations(false));
    } else {
      dispatch(setIsLikeMeditations(true));
    }
  };

  const findDownload = () => {
    scaleDownload.value = withSequence(
      withSpring(1),
      withSpring(1.2),
      withSpring(1)
    );
    if (isDownloadMeditations) {
      dispatch(setIsDownloadMeditations(false));
    } else {
      dispatch(setIsDownloadMeditations(true));
    }
  };

  const toggleAudio = async () => {
    try {
      if (playbackState === State.Stopped && lastMeditation !== null) {
        await TrackPlayer.reset();
        await TrackPlayer.add([lastMeditation]);
        await TrackPlayer.play();
      }
      if (playbackState === State.Paused || playbackState === State.Ready) {
        await TrackPlayer.play();
      } else if (playbackState === State.Playing) {
        await TrackPlayer.pause();
      }
    } catch {
      onErrorToast(ErrorMessage.Player);
    }
  };

  const onChangeText = (text: string) => {
    dispatch(setSearchMeditations(text));
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setSearchMeditations(""));
      };
    }, [])
  );

  useEffect(() => {
    if (playbackState === State.Playing) {
      borderRadius.value = normalize(13);
      rotate.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.25, -0.5, 0.25, 1),
      });
    } else {
      borderRadius.value = normalize(20);
      rotate.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.25, -0.5, 0.25, 1),
      });
    }
  }, [playbackState]);

  useEffect(() => {
    if (route.params) {
      const { meditationId } = route.params as { meditationId: string };
      navigation.navigate(AppRoute.Meditation, { meditationId });
    }
  }, [route.params]);

  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Медитации</Title>
        <SearchView>
          <Input
            value={searchMeditations}
            onChangeText={onChangeText}
            width="70%"
            placeholder="Поиск"
          />
          <FavoritesButton
            onPress={findFavorites}
            underlayColor={Color.MeditationPressed}
          >
            <Animated.View style={likeStyle}>
              <LikeIcon color={Color.TextWhite} isActive={isLikeMeditations} />
            </Animated.View>
          </FavoritesButton>
          <FavoritesButton
            onPress={findDownload}
            underlayColor={Color.MeditationPressed}
          >
            <Animated.View style={downloadStyle}>
              <ProgressCircle
                color={Color.TextWhite}
                isActive={isDownloadMeditations}
              />
            </Animated.View>
          </FavoritesButton>
        </SearchView>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA_MEDITATIONS} />
      <CenterContainer>
        <CardListMeditation count={9} />
        <Subtitle>Последняя медитация</Subtitle>
        <LastMeditation
          onPress={() => {
            if (lastMeditation !== null) {
              navigation.navigate(AppRoute.Meditation, {
                meditationId: lastMeditation.id,
              });
            }
          }}
          underlayColor={Color.PrimaryPastelPressed}
        >
          <>
            <TextMeditation>
              {lastMeditation === null
                ? "Вы еще не слушали медитации"
                : lastMeditation?.title}
            </TextMeditation>
            <Play style={playButtonStyle}>
              <PressableStyled
                onPress={toggleAudio}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? Color.PrimaryPressed
                      : Color.Primary,
                  },
                ]}
              >
                {playbackState === State.Playing ? (
                  <PauseIcon size={16} />
                ) : (
                  <PlayIcon size={16} />
                )}
              </PressableStyled>
            </Play>
          </>
        </LastMeditation>
        <Subtitle>Как медитировать правильно?</Subtitle>
        <RuleMeditation
          underlayColor={Color.PrimaryPastelPressed}
          onPress={() => navigation.navigate(AppRoute.Tips)}
        >
          <TextMeditation>Есть несколько советов для этого</TextMeditation>
        </RuleMeditation>
      </CenterContainer>
    </GlobalScreen>
  );
}

const SearchView = styled.View`
  flex-direction: row;
  gap: 5px;
  margin-bottom: 12px;
`;

const FavoritesButton = styled.TouchableHighlight`
  height: ${normalize(30)}px;
  padding: ${normalize(3)}px ${normalize(10)}px;
  background-color: ${Color.Meditation};
  border-radius: ${normalize(20)}px;
  transform: translateY(7px);
`;

const LastMeditation = styled.TouchableHighlight`
  margin-bottom: 20px;
  padding: ${normalize(20)}px ${normalize(18)}px ${normalize(20)}px
    ${normalize(30)}px;
  border-radius: ${normalize(30)}px;
  background-color: ${Color.PrimaryPastel};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextMeditation = styled.Text`
  font-family: "Poppins-Medium";
  font-size: ${normalize(14)}px;
  line-height: ${normalize(18)}px;
  color: ${Color.TextStandard};
`;

const Play = styled(Animated.View)`
  overflow: hidden;
  height: ${normalize(40)}px;
  width: ${normalize(40)}px;
`;

const PressableStyled = styled.Pressable`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const RuleMeditation = styled.TouchableHighlight`
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: ${Color.PrimaryPastel};
  padding: ${normalize(25)}px ${normalize(15)}px;
  border-radius: ${normalize(30)}px;
`;
