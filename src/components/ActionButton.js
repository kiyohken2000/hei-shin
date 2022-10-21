import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from "../theme";

const { height, width } = Dimensions.get('window')

export default function ActionButton(props) {
  const { icon, onPress, color, isDisable } = props

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: color, opacity:!isDisable?1.0:0.3}]}
        onPress={onPress}
        disabled={isDisable}
      >
        <FontIcon
          name={icon}
          color={colors.white}
          size={width * 0.1}
        />
      </TouchableOpacity>
    </View>
  )
}

const widthRatio = width * 0.2
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: widthRatio,
    height: widthRatio,
    borderRadius: widthRatio /2,
    borderWidth: 1
  },
  buttonContainer: {
    backgroundColor: colors.lightGrayPurple,
    width: widthRatio + 10,
    height: widthRatio + 10,
    borderRadius: widthRatio + 10 /2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderColor: colors.black,
    borderWidth: 1
  },
})