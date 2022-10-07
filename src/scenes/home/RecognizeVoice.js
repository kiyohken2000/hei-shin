import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize } from 'theme'

export default function RecognizeVoice(props) {
  const { results } = props

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.headerText}>私に話しかけてください</Text>
      </View>
      <View style={styles.recognizeArea}>
        <View style={styles.recognizeContainer}>
          {results.map((result, index) => {
            return <Text key={`result-${index}`} style={styles.recognizeText}>{result}</Text>;
          })}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recognizeArea: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30
  },
  headerText: {
    fontSize: fontSize.xxLarge
  },
  recognizeContainer: {
    width: '100%',
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  recognizeText: {
    fontSize: fontSize.xLarge,
  }
})