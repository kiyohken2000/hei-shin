import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { fontSize, colors } from "../../theme";
import { Divider } from "react-native-paper";

export default function RenderItem(props) {
  const { onPress, item } = props

  return (
    <>
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.label} numberOfLines={1}>{item.answer}</Text>
    </TouchableOpacity>
    <Divider bold={true} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  label: {
    fontSize: fontSize.xLarge
  }
})