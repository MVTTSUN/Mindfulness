import TrackPlayer, { Event } from "react-native-track-player";

const PlaybackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious(0));
  TrackPlayer.addEventListener(Event.RemoteSeek, (event) => TrackPlayer.seekTo(event.position));
};

export { PlaybackService };
