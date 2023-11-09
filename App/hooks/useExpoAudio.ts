import { AVPlaybackStatusSuccess, Audio } from 'expo-av';

export const useExpoAudio = () => {
  const getAudioDuration = async (audioUrl: string) => {
    const soundObject = new Audio.Sound();
  
    await soundObject.loadAsync({ uri: audioUrl });
    const { durationMillis } = await soundObject.getStatusAsync() as AVPlaybackStatusSuccess;
    if (durationMillis) {
      const durationSeconds = durationMillis / 1000;
      return Math.floor(durationSeconds);
    }
  };

  return { getAudioDuration };
}