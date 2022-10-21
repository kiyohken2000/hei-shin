import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, fontSize } from "../../theme";
import ActionButton from "../../components/ActionButton";

export default function PlayButton(props) {
  const { onPress, onStop } = props

  return (
    <View style={styles.container}>
      <ActionButton
        icon='play'
        color={colors.mediumvioletred}
        onPress={onPress}
      />
      <ActionButton
        icon='stop'
        color={ colors.purple}
        onPress={onStop}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    width: '100%',
    justifyContent: 'space-around'
  },
})