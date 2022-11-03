import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import FastImage from 'react-native-fast-image'

export default function RenderImage(props) {
  const { source, onPress } = props

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <FastImage
        style={styles.container}
        source={{
          uri: source,
        }}
        resizeMode='cover'
      />
    </TouchableOpacity>
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width: width / 3,
    height: width / 3
  },
  image: {
    height: '100%',
    width: '100%'
  }
})