import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, ScrollView } from "react-native";
import { colors, fontSize } from 'theme'
import RenderImage from './RenderImage';

const { height, width } = Dimensions.get('window')

export default function Answer(props) {
  const { answer, imageSource } = props

  return (
    <View style={styles.answerArea}>
      <ScrollView style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer}</Text>
        {imageSource?
          <View style={styles.imageContainer}>
            <RenderImage
              uri={imageSource}
              desiredWidth={width * 0.75}
            />
          </View>
          :null
        }
        <View style={{paddingVertical: 20}} />
      </ScrollView>
    </View>
  )
}

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
  imageContainer: {
    paddingTop: 20,
    alignItems: 'center'
  }
})