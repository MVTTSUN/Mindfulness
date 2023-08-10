import { styled } from "styled-components/native";
import { PlayIcon } from "../icons/PlayIcon";
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Dimensions } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useAppSelector } from "../../hooks/useAppSelector";

export function AudioPlayer({
  id,
  duration,
}: {
  id: number;
  duration: number;
}) {
  const windowWidth = Dimensions.get("window").width;
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const theme = useAppSelector((state) => state.theme.value);

  const togglePlayAudio = async () => {
    const currentAudio = await TrackPlayer.getCurrentTrack();

    if (currentAudio !== id - 1) {
      await TrackPlayer.skip(id - 1);
      await TrackPlayer.play();
    }

    if (currentAudio === id - 1 && currentAudio !== null) {
      if (playbackState === State.Paused || playbackState === State.Ready) {
        await TrackPlayer.play();
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

  return (
    <ViewContainer>
      <Slider
        value={progress.position}
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
          {Math.floor(progress.position / 60)}:
          {progress.position % 60 < 9
            ? "0" + Math.ceil(progress.position % 60)
            : Math.ceil(progress.position % 60)}
        </InfoTime>
        <InfoTime>
          {Math.floor(duration / 60)}:
          {duration % 60 < 9 ? "0" + (duration % 60) : duration % 60}
        </InfoTime>
      </ContainerTime>
      <Controls>
        <PlayButton onPress={togglePlayAudio} underlayColor={"#b5f2ea"}>
          {playbackState !== State.Playing ? <PlayIcon /> : <></>}
        </PlayButton>
      </Controls>
    </ViewContainer>
  );
}

const ViewContainer = styled.View``;

const ContainerTime = styled.View`
  margin-bottom: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InfoTime = styled.Text``;

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
