import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, ScrollView } from "react-native";
import { colors, fontSize } from 'theme'
import FastImage from 'react-native-fast-image'

export default function Answer(props) {
  const { answer, imageSource } = props
  const source = imageSource?{uri: imageSource}:null

  return (
    <View style={styles.answerArea}>
      <ScrollView style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer}</Text>
        {source?
          <>
          <View style={{paddingVertical: 10}} />
          <FastImage
            style={styles.image}
            source={source}
            resizeMode='contain'
          />
          </>
          :null
        }
        <View style={{paddingVertical: 20}} />
      </ScrollView>
    </View>
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  answerArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    flex: 1
  },
  answerContainer: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1
  },
  answerText: {
    fontSize: fontSize.xLarge,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: height * 0.5,
  },
})