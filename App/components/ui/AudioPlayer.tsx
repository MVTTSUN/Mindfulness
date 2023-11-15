import { styled } from "styled-components/native";
import { PlayIcon } from "../svg/icons/other-icons/PlayIcon";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import { Slider } from "@miblanchard/react-native-slider";
import { useAppSelector } from "../../hooks/useAppSelector";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { PauseIcon } from "../svg/icons/other-icons/PauseIcon";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Pressable } from "react-native";
import { LoaderIcon } from "../svg/icons/other-icons/LoaderIcon";
import { PreviousIcon } from "../svg/icons/other-icons/PreviousIcon";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { normalize } from "../../utils";
import { useFrameInterval } from "../../hooks/useFrameInterval";
import { useFocusEffect } from "@react-navigation/native";
import { MeditationPlayer } from "../../types";
import {
  setIsUpdatePlayer,
  setLastMeditation,
} from "../../store/trackPlayerSlice";
import { getValueTheme } from "../../store/themeSelectors";
import { useToastCustom } from "../../hooks/useToastCustom";
import { Color, ErrorMessage, Theme } from "../../const";
import { getIsUpdatePlayer } from "../../store/trackPlayerSelectors";

type AudioPlayerProps = {
  meditation: MeditationPlayer;
  duration: number;
};

export const AudioPlayer = memo((props: AudioPlayerProps) => {
  const { meditation, duration } = props;
  const [isCurrentAudio, setIsCurrentAudio] = useState(false);
  const [position, setPosition] = useState(0);
  const manualPosition = useRef<null | number>(null);
  const theme = useAppSelector(getValueTheme);
  const isUpdatePlayer = useAppSelector(getIsUpdatePlayer);
  const dispatch = useAppDispatch();
  const playbackState = usePlaybackState();
  const { onErrorToast } = useToastCustom();
  const { startAnimating, stopAnimating } = useFrameInterval(100, async () => {
    try {
      const { position } = await TrackPlayer.getProgress();
      setPosition(position);
    } catch {
      onErrorToast(ErrorMessage.PositionTrack);
    }
  });
  const rotate = useSharedValue(0);
  const rotatePlayButton = useSharedValue(0);
  const borderRadius = useSharedValue(normalize(35));
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
    try {
      const currentAudio = await TrackPlayer.getTrack(0);

      if (
        currentAudio?.id !== meditation.id ||
        playbackState.state === State.Stopped
      ) {
        setPosition(0);
        await TrackPlayer.reset();
        await TrackPlayer.add([meditation]);
        await TrackPlayer.play();
        setIsCurrentAudio(true);
        dispatch(setLastMeditation(meditation));
      }

      if (currentAudio?.id === meditation.id && currentAudio?.id !== null) {
        if (
          playbackState.state === State.Paused ||
          playbackState.state === State.Ready ||
          playbackState.state === State.Error
        ) {
          await TrackPlayer.play();
          setIsCurrentAudio(true);
          dispatch(setLastMeditation(meditation));
        } else if (playbackState.state === State.Playing) {
          await TrackPlayer.pause();
        } else if (playbackState.state === State.Ended) {
          await TrackPlayer.skipToPrevious(0);
        }
      }
    } catch {
      onErrorToast(ErrorMessage.Player);
    }
  };

  const backToStart = async () => {
    try {
      scaleBackPlay.value = withSequence(
        withSpring(1),
        withSpring(1.3),
        withSpring(1)
      );
      await TrackPlayer.skipToPrevious(0);
    } catch {
      onErrorToast(ErrorMessage.Player);
    }
  };

  const changeValue = async (e: number[]) => {
    try {
      await TrackPlayer.seekTo(e[0]);
      setPosition(e[0]);
      manualPosition.current = null;
    } catch {
      onErrorToast(ErrorMessage.SeekTrack);
    }
  };

  const currentAudio = async () => {
    try {
      const currentAudio = await TrackPlayer.getTrack(0);

      if (currentAudio?.id === meditation.id) {
        setIsCurrentAudio(true);
        const { position } = await TrackPlayer.getProgress();
        setPosition(position);
      } else {
        setIsCurrentAudio(false);
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
    }, [playbackState.state, isCurrentAudio])
  );

  useEffect(() => {
    if (
      (playbackState.state === State.Playing ||
        playbackState.state === State.Buffering) &&
      isCurrentAudio
    ) {
      rotatePlayButton.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.25, -0.5, 0.25, 1),
      });
      borderRadius.value = normalize(25);
    } else {
      borderRadius.value = normalize(35);
      rotatePlayButton.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.25, -0.5, 0.25, 1),
      });
    }
  }, [playbackState.state, isCurrentAudio]);

  useEffect(() => {
    if (isUpdatePlayer && meditation) {
      TrackPlayer.reset();
      TrackPlayer.add([meditation]);
      dispatch(setIsUpdatePlayer(false));
    }

    if (!meditation) {
      dispatch(setIsUpdatePlayer(false));
    }
  }, [isUpdatePlayer]);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.linear }),
      -1
    );
    meditation && currentAudio();
  }, []);

  return (
    <ViewContainer>
      <Slider
        disabled={!isCurrentAudio}
        value={
          isCurrentAudio
            ? manualPosition.current
              ? manualPosition.current
              : position
            : 0
        }
        onSlidingComplete={changeValue}
        onValueChange={(value) => (manualPosition.current = value[0])}
        maximumValue={duration}
        containerStyle={{
          height: normalize(20),
          marginBottom: 5,
        }}
        thumbStyle={{
          width: normalize(13),
          height: normalize(13),
          borderRadius: normalize(10),
          backgroundColor:
            theme === Theme.Light ? Color.TextStandard : Color.TextWhite,
        }}
        trackStyle={{
          borderRadius: normalize(2),
          height: normalize(3),
        }}
        minimumTrackStyle={{
          backgroundColor:
            theme === Theme.Light ? Color.TextStandard : Color.TextWhite,
        }}
        maximumTrackStyle={{
          backgroundColor:
            theme === Theme.Light ? Color.TextStandard : Color.TextWhite,
          opacity: 0.3,
        }}
      />
      <ContainerTime>
        <InfoTime>
          {isCurrentAudio && duration
            ? position < duration
              ? new Date(position * 1000).toISOString().slice(14, 19)
              : new Date(duration * 1000).toISOString().slice(14, 19)
            : duration && "00:00"}
        </InfoTime>
        <InfoTime>
          {duration && new Date(duration * 1000).toISOString().slice(14, 19)}
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
              (playbackState.state === State.Buffering ||
                playbackState.state === State.Loading)
                ? () => {}
                : togglePlayAudio
            }
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? isCurrentAudio &&
                    (playbackState.state === State.Buffering ||
                      playbackState.state === State.Loading)
                    ? ""
                    : Color.PrimaryPressed
                  : Color.Primary,
              },
            ]}
          >
            {isCurrentAudio && playbackState.state === State.Playing && (
              <PauseIcon />
            )}
            {(playbackState.state === State.Paused ||
              playbackState.state === State.Ready ||
              playbackState.state === State.Stopped ||
              playbackState.state === State.Error ||
              playbackState.state === State.Ended ||
              !isCurrentAudio ||
              (isCurrentAudio && playbackState.state === State.None)) && (
              <PlayIcon size={32} />
            )}
            {isCurrentAudio &&
              (playbackState.state === State.Buffering ||
                playbackState.state === State.Loading) && (
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
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InfoTime = styled.Text`
  margin-bottom: 10px;
  font-family: "Poppins-Regular";
  font-size: ${normalize(12)}px;
  height: ${normalize(20)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const Controls = styled.View`
  gap: ${normalize(26)}px;
  transform: translateX(${normalize(-23)}px);
  align-self: center;
  flex-direction: row;
  align-items: center;
`;

const PlayButton = styled(Animated.View)`
  overflow: hidden;
  width: ${normalize(70)}px;
  height: ${normalize(70)}px;
`;

const PressableStyled = styled.Pressable`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
