import styled from "styled-components/native";
import { normalize } from "../../utils";
import { AppRoute, Color, ErrorMessage } from "../../const";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Subtitle } from "./titles/Subtitle";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  getIsUpdatePlayer,
  getLastMeditation,
} from "../../store/trackPlayerSelectors";
import { useToastCustom } from "../../hooks/useToastCustom";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import { useCallback, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MeditationScreenProp } from "../../types";
import { PauseIcon } from "../svg/icons/other-icons/PauseIcon";
import { PlayIcon } from "../svg/icons/other-icons/PlayIcon";
import { useFrameInterval } from "../../hooks/useFrameInterval";
import { setIsUpdatePlayer } from "../../store/trackPlayerSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export function LastMeditation() {
  const navigation = useNavigation<MeditationScreenProp>();
  const lastMeditation = useAppSelector(getLastMeditation);
  const isUpdatePlayer = useAppSelector(getIsUpdatePlayer);
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
    transform: [{ rotate: `${rotate.value * 360}deg` } as never],
  }));
  const sizeLineActive = useSharedValue(0);
  const lineActiveStyle = useAnimatedStyle(() => ({
    width: `${sizeLineActive.value}%`,
  }));
  const { startAnimating, stopAnimating } = useFrameInterval(100, async () => {
    try {
      const { position, duration } = await TrackPlayer.getProgress();
      sizeLineActive.value = (position / duration) * 100;
    } catch {
      onErrorToast(ErrorMessage.PositionTrack);
    }
  });

  const toggleAudio = async () => {
    try {
      if (
        (playbackState.state === State.Stopped ||
          playbackState.state === State.Ended ||
          playbackState.state === State.None) &&
        lastMeditation !== null
      ) {
        await TrackPlayer.reset();
        await TrackPlayer.add([lastMeditation]);
        await TrackPlayer.play();
      }
      if (
        playbackState.state === State.Paused ||
        playbackState.state === State.Ready ||
        playbackState.state === State.Error
      ) {
        await TrackPlayer.play();
      } else if (playbackState.state === State.Playing) {
        await TrackPlayer.pause();
      }
    } catch {
      onErrorToast(ErrorMessage.Player);
    }
  };

  useFocusEffect(
    useCallback(() => {
      startAnimating();

      return () => {
        stopAnimating();
      };
    }, [playbackState.state])
  );

  useEffect(() => {
    if (playbackState.state === State.Playing) {
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

    if (playbackState.state === State.Error) {
      onErrorToast(ErrorMessage.NoConnect);
    }
  }, [playbackState.state]);

  useEffect(() => {
    if (isUpdatePlayer && lastMeditation !== null) {
      TrackPlayer.reset();
      TrackPlayer.add([lastMeditation]);
      dispatch(setIsUpdatePlayer(false));
    }
  }, [isUpdatePlayer]);

  return (
    <>
      <Subtitle>Последняя медитация</Subtitle>
      <Container
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
          <TextLastMeditation numberOfLines={2} ellipsizeMode="tail">
            {lastMeditation === null
              ? "Вы еще не слушали медитации"
              : lastMeditation?.title}
          </TextLastMeditation>
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
              {playbackState.state === State.Playing ? (
                <PauseIcon size={16} />
              ) : (
                <PlayIcon size={16} />
              )}
            </PressableStyled>
          </Play>
          {lastMeditation !== null && (
            <LineContainer>
              <LineProgress />
              <LineActiveProgress style={lineActiveStyle} />
            </LineContainer>
          )}
        </>
      </Container>
    </>
  );
}

const Container = styled.TouchableHighlight`
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  padding: ${normalize(20)}px;
  border-radius: ${normalize(30)}px;
  background-color: ${Color.PrimaryPastel};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextLastMeditation = styled.Text`
  width: 80%;
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

const LineContainer = styled.View`
  overflow: hidden;
  margin: 0 ${normalize(20)}px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
`;

const LineProgress = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${Color.TextStandard};
  opacity: 0.15;
`;

const LineActiveProgress = styled(Animated.View)`
  position: absolute;
  height: 100%;
  background-color: ${Color.TextStandard};
  opacity: 1;
`;
