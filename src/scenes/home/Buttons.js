import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors, fontSize } from 'theme'
import Loading from './Loading';

const { height, width } = Dimensions.get('window')

export default function Buttons(props) {
  const { onPress, isListening, answer, isProcess } = props
  const icon = !isListening?"microphone":'stop'
  const buttonColor = !isListening?colors.seagreen:colors.red

  return (
    <View style={styles.container}>
      <View style={styles.answerArea}>
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      </View>
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
    </View>
  )
}

const widthRation = width * 0.3
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buuttonArea: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
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
  answerArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    paddingHorizontal: 30,
  },
  answerContainer: {
    borderWidth: 1,
    flex: 1,
    width: '100%',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    fontSize: fontSize.xLarge,
    fontWeight: '500'
  }
})