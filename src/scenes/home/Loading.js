import React, { useRef } from 'react'
import { StyleSheet, Dimensions, View } from "react-native"
import LottieView from "lottie-react-native"

export default function Loading(props) {
  const animation = useRef(null)

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require('../../../assets/lottie/120096-ai-assistant-animation.json')}
        style={styles.animation}
        autoPlay
      />
    </View>
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  animation: {
    width: width * 0.25,
    height: height * 0.25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});