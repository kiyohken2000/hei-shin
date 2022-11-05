import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, fontSize } from "../../theme";

export default function RenderTag(props) {
  const { item, onPress } = props

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.label}>{`${item.label}(${item.count})`}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.lightsteelblue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  label: {
    fontSize: fontSize.large
  }
})