import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Audio } from 'expo-av';
import VoiceLoading from "./VoiceLoading";
import PlayButton from "./PlayButton";

export default function PlayVoice(props) {
  const { voiceSource } = props
  const [isLoading, setIsLoading] = useState(false)
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    return () => {
      console.log('sound.current.unloadAsync()')
      sound.current.unloadAsync()
    };
  }, []);

  const playSound = async () => {
    console.log("Loading Sound");
    setIsLoading(true)
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: voiceSource },
      { shouldPlay: true }
    )
    sound.current = playbackObject
    console.log("playing sound");
    setIsLoading(false)
    const checkLoaded = await sound.current.getStatusAsync();
    if (checkLoaded.isLoaded === true) {
      console.log("Error in Loading mp3");
    } else {
      await sound.current.playAsync();
    }
  };

  const onStop = () => {
    sound.current.unloadAsync()
  }

  return (
    <View style={styles.container}>
      {isLoading?
        <VoiceLoading />
        :
        <PlayButton
          onPress={playSound}
          onStop={onStop}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})