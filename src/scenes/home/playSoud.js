import { Audio } from "expo-av";

const playVoice = async ({voice}) => {
  let soundObjectCheck = new Audio.Sound();
  try {
    soundObjectCheck.setOnPlaybackStatusUpdate((status) => {
      if (!status.didJustFinish) return;
      soundObjectCheck.unloadAsync();
    });
    await soundObjectCheck.loadAsync({
      uri: voice
    });
    await soundObjectCheck.playAsync();
  } catch (error) {
    console.log('sound error', error);
    await soundObjectCheck.unloadAsync();
  }
}

export { playVoice }