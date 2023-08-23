import { styled } from "styled-components/native";
import { PlayIcon } from "../icons/PlayIcon";
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { Slider } from "@miblanchard/react-native-slider";
import { useAppSelector } from "../../hooks/useAppSelector";
import { memo, useEffect, useState } from "react";
import { PauseIcon } from "../icons/PauseIcon";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { init } from "../../store/initializePlayerSlice";

export const AudioPlayer = memo(
  ({ id, duration }: { id: number; duration: number }) => {
    const [isCurrentAudio, setIsCurrentAudio] = useState(false);
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const theme = useAppSelector((state) => state.theme.value);
    const dispatch = useAppDispatch();

    const togglePlayAudio = async () => {
      const currentAudio = await TrackPlayer.getCurrentTrack();

      if (currentAudio !== id - 1) {
        await TrackPlayer.skip(id - 1);
        await TrackPlayer.play();
        setIsCurrentAudio(true);
      }

      if (currentAudio === id - 1 && currentAudio !== null) {
        if (playbackState === State.Paused || playbackState === State.Ready) {
          await TrackPlayer.play();
          setIsCurrentAudio(true);
        } else if (playbackState === State.Playing) {
          await TrackPlayer.pause();
        }
      }
    };

    const changeValue = (e: number[]) => {
      setTimeout(() => {
        TrackPlayer.seekTo(e[0]);
      }, 400);
    };

    const currentAudio = async () => {
      try {
        const currentAudio = await TrackPlayer.getCurrentTrack();
        console.log(currentAudio);
        console.log(playbackState);
        if (currentAudio === id - 1) {
          setIsCurrentAudio(true);
        } else {
          setIsCurrentAudio(false);
        }
      } catch {
        dispatch(init(false));
      }
    };

    useEffect(() => {
      currentAudio();
    }, []);

    return (
      <ViewContainer>
        <Slider
          animationType="timing"
          animateTransitions
          disabled={!isCurrentAudio}
          value={isCurrentAudio ? progress.position : 0}
          onValueChange={(e) => changeValue(e)}
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
              ? Math.floor(progress.position / 60) +
                ":" +
                (progress.position % 60 < 9
                  ? "0" + Math.ceil(progress.position % 60)
                  : Math.ceil(progress.position % 60))
              : "0:00"}
          </InfoTime>
          <InfoTime>
            {Math.floor(duration / 60)}:
            {duration % 60 < 9 ? "0" + (duration % 60) : duration % 60}
          </InfoTime>
        </ContainerTime>
        <Controls>
          <PlayButton onPress={togglePlayAudio} underlayColor={"#b5f2ea"}>
            {isCurrentAudio && playbackState === State.Playing ? (
              <PauseIcon />
            ) : (
              <PlayIcon size="32px" />
            )}
          </PlayButton>
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
