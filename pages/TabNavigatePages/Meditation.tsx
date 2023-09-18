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
import {
  COLORS,
  LIGHT_THEME,
  MAIN_COLOR,
  MEDITATIONS_DATA,
  OPTIONS_DATA,
} from "../../const";
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
  AppKilledPlaybackBehavior,
  Capability,
  State,
  usePlaybackState,
} from "react-native-track-player";
import { PauseIcon } from "../../components/icons/PauseIcon";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function Meditation() {
  const [text, setText] = useState("");
  const navigation = useNavigation<MeditationScreenProp>();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const likes = useAppSelector((state) => state.likes.likesMeditation);
  const [isActive, setIsActive] = useState(false);
  const lastMeditationId = useAppSelector(
    (state) => state.trackPlayer.lastMeditationId
  );
  const playbackState = usePlaybackState();
  const borderRadius = useSharedValue(20);
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

  const findFavorites = () => {
    scaleLike.value = withSequence(
      withSpring(1),
      withSpring(1.2),
      withSpring(1)
    );
    if (isActive) {
      dispatch(likeMeditations(null));
    } else {
      dispatch(likeMeditations(likes));
    }
    setIsActive(!isActive);
  };

  const toggleAudio = async () => {
    if (playbackState === State.None && lastMeditationId !== null) {
      borderRadius.value = 13;
      rotate.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.25, -0.5, 0.25, 1),
      });
      await TrackPlayer.add([MEDITATIONS_DATA[lastMeditationId - 1]]);
      await TrackPlayer.play();
    }
    if (playbackState === State.Paused || playbackState === State.Ready) {
      borderRadius.value = 13;
      rotate.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.25, -0.5, 0.25, 1),
      });
      await TrackPlayer.play();
    } else if (playbackState === State.Playing) {
      borderRadius.value = 20;
      rotate.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.25, -0.5, 0.25, 1),
      });
      await TrackPlayer.pause();
    }
  };

  const onChangeText = (text: string) => {
    setText(text);
    dispatch(searchMeditations(text));
  };

  const setup = async () => {
    // await TrackPlayer.clearNowPlayingMetadata();
    // await TrackPlayer.isServiceRunning().then(async (isRunning) => {
    //   console.log(isRunning);
    //   if (!isRunning) {
    //     await TrackPlayer.setupPlayer();
    //   }
    // });
    // await TrackPlayer.setupPlayer();
    // try {
    //   await TrackPlayer.clearNowPlayingMetadata();
    // } catch (e) {
    //   await TrackPlayer.setupPlayer();
    // }
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToPrevious,
      ],
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setText("");
      };
    }, [])
  );

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    if (route.params) {
      const { meditation } = route.params as { meditation: MeditationData };
      navigation.navigate("Audio", { meditation });
    }
  }, [route.params]);

  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Медитации</Title>
        <SearchView>
          <Input
            value={text}
            onChangeText={onChangeText}
            width="70%"
            placeholder="Поиск"
          />
          <FavoritesButton
            onPress={findFavorites}
            underlayColor={LIGHT_THEME.backgroundColor.meditationCardPressed}
          >
            <Animated.View style={likeStyle}>
              <LikeIcon
                color={COLORS.textColors.meditationCard}
                isActive={isActive}
              />
            </Animated.View>
          </FavoritesButton>
        </SearchView>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA} />
      <CenterContainer>
        <CardListMeditation count={9} />
        <Subtitle>Последняя медитация</Subtitle>
        <LastMeditation
          onPress={() => {
            if (lastMeditationId !== null) {
              navigation.navigate("Audio", {
                meditation: MEDITATIONS_DATA[lastMeditationId - 1],
              });
            }
          }}
          underlayColor={COLORS.mainColors.pastelPressed}
        >
          <>
            <TextLasMeditation>
              {lastMeditationId === null
                ? "Вы еще не слушали медитации"
                : MEDITATIONS_DATA[lastMeditationId - 1].title}
            </TextLasMeditation>
            <Play style={playButtonStyle}>
              <PressableStyled
                onPress={toggleAudio}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? MAIN_COLOR.normalPressed
                      : MAIN_COLOR.normal,
                  },
                ]}
              >
                {playbackState === State.Playing ? (
                  <PauseIcon size="16px" />
                ) : (
                  <PlayIcon size="16px" />
                )}
              </PressableStyled>
            </Play>
          </>
        </LastMeditation>
        <Subtitle>Как медитировать правильно?</Subtitle>
        <RuleMeditation
          underlayColor={COLORS.mainColors.pastelPressed}
          onPress={() => navigation.navigate("Tips")}
        >
          <TextRightMeditation>
            Есть несколько советов для этого
          </TextRightMeditation>
        </RuleMeditation>
      </CenterContainer>
    </GlobalScreen>
  );
}

const SearchView = styled.View`
  flex-direction: row;
  gap: 5px;
`;

const FavoritesButton = styled.TouchableHighlight`
  height: 30px;
  padding: 3px 10px;
  background-color: ${({ theme }) => theme.backgroundColor.meditationCard};
  border-radius: 20px;
  transform: translateY(7px);
`;

const LastMeditation = styled.TouchableHighlight`
  margin-bottom: 20px;
  padding: 20px 18px 20px 30px;
  border-radius: 30px;
  background-color: ${COLORS.mainColors.pastel};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextLasMeditation = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 14px;
  line-height: 18px;
  color: #313131;
`;

const TextRightMeditation = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 14px;
  line-height: 18px;
  color: ${COLORS.textColors.normal};
`;

const Play = styled(Animated.View)`
  overflow: hidden;
  height: 40px;
  width: 40px;
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
  background-color: ${COLORS.mainColors.pastel};
  padding: 25px 15px;
  border-radius: 30px;
`;
