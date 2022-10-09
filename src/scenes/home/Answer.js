import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, ScrollView } from "react-native";
import { colors, fontSize } from 'theme'

export default function Answer(props) {
  const { answer } = props

  return (
    <View style={styles.answerArea}>
      <ScrollView style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  answerArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 2,
    paddingHorizontal: 30,
  },
  answerContainer: {
    borderWidth: 1,
    flex: 1,
    width: '100%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  answerText: {
    fontSize: fontSize.xLarge,
    fontWeight: '500'
  }
})