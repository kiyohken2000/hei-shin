import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import FontIcon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../theme'

const { height, width } = Dimensions.get('window')

export default function CancelButton(props) {
  const { incrementKey } = props

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={incrementKey}
    >
      <FontIcon
        name='close'
        color={colors.black}
        size={width * 0.1}
      />
    </TouchableOpacity>
  )
}

const widthRatio = width * 0.15
const styles = StyleSheet.create({
  container: {
  },
  button: {
    backgroundColor: colors.lightsteelblue,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthRatio,
    height: widthRatio,
    borderRadius: widthRatio / 2
  }
})