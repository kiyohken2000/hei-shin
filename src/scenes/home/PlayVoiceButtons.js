import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors, fontSize } from 'theme'

const { height, width } = Dimensions.get('window')

export default function PlayVoiceButtons(props) {
  const { onStopPress, onRepeat } = props

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.purple}]}
          onPress={onStopPress}
        >
          <FontIcon
            name='stop'
            color={colors.white}
            size={width * 0.1}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.mediumvioletred}]}
          onPress={onRepeat}
        >
          <FontIcon
            name='redo'
            color={colors.white}
            size={width * 0.1}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const widthRation = width * 0.2
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    width: '100%',
    justifyContent: 'space-around'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: widthRation,
    height: widthRation,
    borderRadius: widthRation /2,
    borderWidth: 1
  },
  buttonContainer: {
    backgroundColor: colors.lightGrayPurple,
    width: widthRation + 10,
    height: widthRation + 10,
    borderRadius: widthRation + 10 /2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderColor: colors.black,
    borderWidth: 1
  },
})