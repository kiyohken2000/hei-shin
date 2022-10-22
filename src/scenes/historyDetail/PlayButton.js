import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, fontSize } from "../../theme";
import ActionButton from "../../components/ActionButton";
import Loading from "./Loading";

export default function PlayButton(props) {
  const { onPress, onStop, isAvailable, isChecking } = props

  if(isChecking) {
    return (
      <Loading />
    )
  }

  return (
    <View style={styles.container}>
      <ActionButton
        icon='play'
        color={colors.mediumvioletred}
        onPress={onPress}
        isDisable={!isAvailable}
      />
      <ActionButton
        icon='stop'
        color={colors.purple}
        onPress={onStop}
        isDisable={!isAvailable}
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