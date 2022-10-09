import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, ScrollView } from "react-native";
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors, fontSize } from 'theme'
import Loading from './Loading';

const { height, width } = Dimensions.get('window')

export default function Recording(props) {
  const { onPress, isListening, isProcess } = props
  const icon = !isListening?"microphone":'stop'
  const buttonColor = !isListening?colors.seagreen:colors.red

  return (
    <View style={styles.buuttonArea}>
      {!isProcess?
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: buttonColor}]}
            onPress={onPress}
          >
            <FontIcon
              name={icon}
              color={colors.white}
              size={width * 0.15}
            />
          </TouchableOpacity>
        </View>
        :
        <Loading />
      }
    </View>
  )
}

const widthRation = width * 0.3
const styles = StyleSheet.create({
  buuttonArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
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