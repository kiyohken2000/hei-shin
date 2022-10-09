import React, { useRef } from 'react'
import { StyleSheet, Dimensions, View } from "react-native"
import LottieView from "lottie-react-native"

export default function VoiceLoading() {
  const animation = useRef(null)

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require('../../../assets/lottie/voiceLoading.json')}
        style={styles.animation}
        autoPlay
      />
    </View>
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  animation: {
    width: width * 0.1,
    height: height * 0.1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});