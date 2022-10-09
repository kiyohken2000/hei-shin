import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { Audio } from 'expo-av';
import VoiceLoading from "./VoiceLoading";
import PlayVoiceButtons from "./PlayVoiceButtons";

export default function PlayVoice(props) {
  const { voiceSource, setVoiceSource, setAnswer } = props
  const sound = useRef(new Audio.Sound());
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    playSound()
  }, [])

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

  const onStopPress = () => {
    setVoiceSource('')
    setAnswer('')
  }

  const onRepeat = () => {
    sound.current.unloadAsync()
    playSound()
  }

  return (
    <View style={styles.container}>
      {isLoading?
        <VoiceLoading / >
        :
        <PlayVoiceButtons
          onStopPress={onStopPress}
          onRepeat={onRepeat}
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