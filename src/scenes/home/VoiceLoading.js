import React, { useRef } from 'react'
import { StyleSheet, Dimensions, View } from "react-native"
import LottieView from "lottie-react-native"
import CancelButton from './CancelButton'

export default function VoiceLoading(props) {
  const { incrementKey } = props
  const animation = useRef(null)

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          ref={animation}
          source={require('../../../assets/lottie/voiceLoading.json')}
          style={styles.animation}
          autoPlay
        />
      </View>
      <View style={styles.buttonContainer}>
        <CancelButton incrementKey={incrementKey} />
      </View>
    </View>
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  animation: {
    width: width * 0.1,
    height: height * 0.1,
    flex: 1
  },
  animationContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});