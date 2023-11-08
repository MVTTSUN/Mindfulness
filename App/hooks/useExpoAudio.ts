import { AVPlaybackStatusSuccess, Audio } from 'expo-av';

const useExpoAudio = () => {
  const getAudioDuration = async (audioUrl: string) => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri: audioUrl });
      const { durationMillis } = await soundObject.getStatusAsync() as AVPlaybackStatusSuccess;
      if (durationMillis) {
        const durationSeconds = durationMillis / 1000;
        return Math.floor(durationSeconds);
      }
    } catch (err) {
      console.error('Failed to get audio duration:', err);
    }
  };

  return { getAudioDuration };
}

export { useExpoAudio };