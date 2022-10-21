import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, fontSize } from "../../theme";
import ActionButton from "../../components/ActionButton";

export default function PlayVoiceButtons(props) {
  const { onStopPress, onRepeat, onUpload, isUploadDisable } = props

  return (
    <View style={styles.container}>
      <ActionButton
        icon='stop'
        color={colors.purple}
        onPress={onStopPress}
      />
      <ActionButton
        icon='redo'
        color={colors.mediumvioletred}
        onPress={onRepeat}
      />
      <ActionButton
        icon='cloud-upload-alt'
        color={colors.mediumseagreen}
        onPress={onUpload}
        isDisable={isUploadDisable}
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