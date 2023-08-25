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
import { memo, useEffect, useState } from "react";
import { PauseIcon } from "../icons/PauseIcon";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { init, setLastMeditationId } from "../../store/trackPlayerSlice";
import { Animated, Easing } from "react-native";
import { LoaderIcon } from "../icons/LoaderIcon";
import { MEDITATIONS_DATA } from "../../const";

export const AudioPlayer = memo(
  ({ id, duration }: { id: number; duration: number }) => {
    const [isCurrentAudio, setIsCurrentAudio] = useState(false);
    const playbackState = usePlaybackState();
    const theme = useAppSelector((state) => state.theme.value);
    const dispatch = useAppDispatch();
    const spinValue = new Animated.Value(0);
    const [position, setPosition] = useState(0);
    let positionInterval: NodeJS.Timer;
    const rotate = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };

    const togglePlayAudio = async () => {
      const currentAudio = await TrackPlayer.getTrack(0);

      if (currentAudio?.id !== id) {
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
      try {
        const currentAudio = await TrackPlayer.getTrack(0);
        if (currentAudio?.id === id) {
          setIsCurrentAudio(true);
        } else {
          setIsCurrentAudio(false);
        }
      } catch {
        dispatch(init(false));
      }
    };

    useTrackPlayerEvents([Event.PlaybackQueueEnded], async () => {
      await TrackPlayer.reset();
      await TrackPlayer.add([MEDITATIONS_DATA[id - 1]]);
    });

    useEffect(() => {
      currentAudio();
      startInterval();

      return () => {
        clearInterval(positionInterval);
      };
    }, []);

    spin();

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
          {isCurrentAudio && playbackState === State.Playing && (
            <PlayButton onPress={togglePlayAudio} underlayColor={"#b5f2ea"}>
              <PauseIcon />
            </PlayButton>
          )}
          {(playbackState === State.Paused ||
            playbackState === State.Ready ||
            playbackState === State.Stopped ||
            !isCurrentAudio) && (
            <PlayButton onPress={togglePlayAudio} underlayColor={"#b5f2ea"}>
              <PlayIcon size="32px" />
            </PlayButton>
          )}
          {isCurrentAudio &&
            (playbackState === State.Buffering ||
              playbackState === State.Connecting) && (
              <PlayButton>
                <Animated.View
                  style={{
                    transform: [{ rotate }],
                  }}
                >
                  <LoaderIcon />
                </Animated.View>
              </PlayButton>
            )}
        </Controls>
      </ViewContainer>
    );
  }
);

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
  align-items: center;
`;

const PlayButton = styled.TouchableHighlight`
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: #b5f2ea;
`;
