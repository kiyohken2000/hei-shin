import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Audio } from 'expo-av';
import VoiceLoading from "./VoiceLoading";
import PlayVoiceButtons from "./PlayVoiceButtons";
import { textFlatten } from "./functions";
import { doc, collection, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import Toast from 'react-native-toast-message';
import { talkRef } from "../../config";

export default function PlayVoice(props) {
  const { voiceSource, setVoiceSource, setAnswer, incrementKey, results, answer, setImageSource } = props
  const sound = useRef(new Audio.Sound());
  const [isLoading, setIsLoading] = useState(true)
  const [isUploadDisable, setIsUploadDisable] = useState(false)

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
    setImageSource('')
  }

  const onRepeat = () => {
    sound.current.unloadAsync()
    playSound()
  }

  const onUpload = async() => {
    try {
      setIsUploadDisable(true)
      const question = textFlatten({results})
      const talkCollectionRef = doc(collection(firestore, talkRef));
      await setDoc(talkCollectionRef, {
        question: question,
        voiceSource: voiceSource,
        answer: answer,
        id: talkCollectionRef.id,
        timpstamp: serverTimestamp(),
      });
      Toast.show({
        type: 'success',
        text1: '保存しました',
      });
    } catch(e) {
      console.log('onUpload error', e)
    }
  }

  return (
    <View style={styles.container}>
      {isLoading?
        <VoiceLoading incrementKey={incrementKey} />
        :
        <PlayVoiceButtons
          onStopPress={onStopPress}
          onRepeat={onRepeat}
          onUpload={onUpload}
          isUploadDisable={isUploadDisable}
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