import { styled } from "styled-components/native";
import { PlayIcon } from "../icons/PlayIcon";
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { Slider } from "@miblanchard/react-native-slider";
import { useAppSelector } from "../../hooks/useAppSelector";
import { memo, useEffect, useRef, useState } from "react";
import { PauseIcon } from "../icons/PauseIcon";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setLastMeditationId } from "../../store/trackPlayerSlice";
import { Pressable } from "react-native";
import { LoaderIcon } from "../icons/LoaderIcon";
import { MAIN_COLOR, MEDITATIONS_DATA } from "../../const";
import { PreviousIcon } from "../icons/PreviousIcon";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from "react-native-reanimated";

type AudioPlayerProps = {
  id: number;
  duration: number;
};

export const AudioPlayer = memo(({ id, duration }: AudioPlayerProps) => {
  const [isCurrentAudio, setIsCurrentAudio] = useState(false);
  const playbackState = usePlaybackState();
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();
  const rotate = useSharedValue(0);
  const rotatePlayButton = useSharedValue(0);
  const borderRadius = useSharedValue(35);
  const [position, setPosition] = useState(0);
  let positionInterval: NodeJS.Timer;
  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value * 360}deg` }],
  }));
  const buttonPlayStyle = useAnimatedStyle(() => ({
    borderRadius: withTiming(borderRadius.value, {
      duration: 500,
      easing: Easing.bezier(0.25, -0.5, 0.25, 1),
    }),
    transform: [{ rotate: `${rotatePlayButton.value * 360}deg` }],
  }));
  const scaleBackPlay = useSharedValue(1);
  const backPlayStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleBackPlay.value }],
  }));

  const togglePlayAudio = async () => {
    const currentAudio = await TrackPlayer.getTrack(0);

    if (currentAudio?.id !== id) {
      setPosition(0);
      await TrackPlayer.reset();
      await TrackPlayer.add([MEDITATIONS_DATA[id - 1]]);
      await TrackPlayer.play();
      setIsCurrentAudio(true);
      dispatch(setLastMeditationId(id));
    }

    if (currentAudio?.id === id && currentAudio?.id !== null) {
      if (playbackState === State.Paused || playbackState === State.Ready) {
        await TrackPlayer.play();
        setIsCurrentAudio(true);
        dispatch(setLastMeditationId(id));
      } else if (playbackState === State.Playing) {
        await TrackPlayer.pause();
      }
    }
  };

  const backToStart = async () => {
    scaleBackPlay.value = withSequence(
      withSpring(1),
      withSpring(1.3),
      withSpring(1)
    );
    await TrackPlayer.skipToPrevious();
  };

  const startInterval = () => {
    positionInterval = setInterval(async () => {
      const asyncPosition = await TrackPlayer.getPosition();
      setPosition(asyncPosition);
    }, 500);
  };

  const changeValue = async (e: number[]) => {
    setPosition(e[0]);
    await TrackPlayer.seekTo(e[0]);
  };

  const currentAudio = async () => {
    const currentAudio = await TrackPlayer.getTrack(0);
    if (currentAudio?.id === id) {
      setIsCurrentAudio(true);
    } else {
      setIsCurrentAudio(false);
    }
  };

  useTrackPlayerEvents([Event.PlaybackQueueEnded], async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add([MEDITATIONS_DATA[id - 1]]);
  });

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.linear }),
      -1
    );
    currentAudio();
    startInterval();

    return () => {
      clearInterval(positionInterval);
    };
  }, []);

  useEffect(() => {
    if (playbackState === State.Playing && isCurrentAudio) {
      rotatePlayButton.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.25, -0.5, 0.25, 1),
      });
      borderRadius.value = 25;
    } else {
      borderRadius.value = 35;
      rotatePlayButton.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.25, -0.5, 0.25, 1),
      });
    }
  }, [playbackState, isCurrentAudio]);

  return (
    <ViewContainer>
      <Slider
        disabled={!isCurrentAudio}
        value={isCurrentAudio ? position : 0}
        onSlidingComplete={changeValue}
        maximumValue={duration}
        thumbStyle={{
          width: 13,
          height: 13,
          borderRadius: 10,
          backgroundColor: theme === "light" ? "#313131" : "#edecf5",
        }}
        trackStyle={{
          borderRadius: 2,
          height: 3,
        }}
        minimumTrackStyle={{
          backgroundColor: theme === "light" ? "#313131" : "#edecf5",
        }}
        maximumTrackStyle={{
          backgroundColor: theme === "light" ? "#313131" : "#edecf5",
          opacity: 0.3,
        }}
      />
      <ContainerTime>
        <InfoTime>
          {isCurrentAudio
            ? new Date(position * 1000).toISOString().slice(14, 19)
            : "00:00"}
        </InfoTime>
        <InfoTime>
          {new Date(duration * 1000).toISOString().slice(14, 19)}
        </InfoTime>
      </ContainerTime>
      <Controls>
        <Pressable onPress={isCurrentAudio ? backToStart : () => {}}>
          <Animated.View style={backPlayStyle}>
            <PreviousIcon />
          </Animated.View>
        </Pressable>
        <PlayButton style={buttonPlayStyle}>
          <PressableStyled
            onPress={
              isCurrentAudio &&
              (playbackState === State.Buffering ||
                playbackState === State.Connecting)
                ? () => {}
                : togglePlayAudio
            }
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? isCurrentAudio &&
                    (playbackState === State.Buffering ||
                      playbackState === State.Connecting)
                    ? ""
                    : MAIN_COLOR.normalPressed
                  : MAIN_COLOR.normal,
              },
            ]}
          >
            {isCurrentAudio && playbackState === State.Playing && <PauseIcon />}
            {(playbackState === State.Paused ||
              playbackState === State.Ready ||
              playbackState === State.Stopped ||
              !isCurrentAudio) && <PlayIcon size="32px" />}
            {isCurrentAudio &&
              (playbackState === State.Buffering ||
                playbackState === State.Connecting) && (
                <Animated.View style={rotateStyle}>
                  <LoaderIcon />
                </Animated.View>
              )}
          </PressableStyled>
        </PlayButton>
      </Controls>
    </ViewContainer>
  );
});

const ViewContainer = styled.View``;

const ContainerTime = styled.View`
  margin-bottom: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InfoTime = styled.Text`
  font-family: "Poppins-Regular";
  font-size: 12px;
  color: ${({ theme }) => theme.color.standard};
`;

const Controls = styled.View`
  gap: 26px;
  transform: translateX(-23px);
  align-self: center;
  flex-direction: row;
  align-items: center;
`;

const PlayButton = styled(Animated.View)`
  overflow: hidden;
  width: 70px;
  height: 70px;
`;

const PressableStyled = styled.Pressable`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
