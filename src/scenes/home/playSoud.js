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
    return true
  } catch (error) {
    console.log('sound error', error);
    await soundObjectCheck.unloadAsync();
    return null
  }
}

const playError = async () => {
  let soundObjectCheck = new Audio.Sound();
  try {
    soundObjectCheck.setOnPlaybackStatusUpdate((status) => {
      if (!status.didJustFinish) return;
      soundObjectCheck.unloadAsync();
    });
    await soundObjectCheck.loadAsync(require("../../../assets/sound/error.wav"));
    await soundObjectCheck.playAsync();
    return true
  } catch (error) {
    console.log('sound error', error);
    await soundObjectCheck.unloadAsync();
    return true
  }
}

export { playVoice, playError }