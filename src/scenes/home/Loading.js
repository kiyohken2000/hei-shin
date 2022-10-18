import React, { useRef } from 'react'
import { StyleSheet, Dimensions, View } from "react-native"
import LottieView from "lottie-react-native"
import CancelButton from './CancelButton'

export default function Loading(props) {
  const { incrementKey } = props
  const animation = useRef(null)

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require('../../../assets/lottie/120096-ai-assistant-animation.json')}
        style={styles.animation}
        autoPlay
      />
      <View style={styles.buttonContainer}>
        <CancelButton incrementKey={incrementKey} />
      </View>
    </View>
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  animation: {
    width: width * 0.25,
    height: height * 0.25,
    flex: 2
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