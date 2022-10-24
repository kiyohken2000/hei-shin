import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { colors, fontSize } from 'theme'
import HeaderTitle from './HeaderTitle';

export default function RecognizeVoice(props) {
  const { results } = props

  return (
    <View style={styles.container}>
      <View style={styles.recognizeArea}>
        <ScrollView style={styles.recognizeContainer}>
          {results.map((result, index) => {
            return <Text key={`result-${index}`} style={styles.recognizeText}>{result}</Text>;
          })}
          <View style={{paddingVertical: 10}} />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recognizeArea: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  recognizeContainer: {
    width: '100%',
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  recognizeText: {
    fontSize: fontSize.xLarge,
  }
})