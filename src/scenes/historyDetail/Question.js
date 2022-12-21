import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { fontSize, colors } from "../../theme";
import { noribenGenerator } from "./functions";

export default function Question(props) {
  const { question } = props
  const noriben = noribenGenerator({question})

  return (
    <View style={styles.container}>
      <View style={styles.recognizeArea}>
        <ScrollView style={styles.recognizeContainer}>
          <Text style={styles.recognizeText}>{noriben}</Text>
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