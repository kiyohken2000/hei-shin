import React from 'react'
import { View, StyleSheet } from "react-native";
import { colors, fontSize } from 'theme'
import Loading from './Loading';
import { textFlatten } from './functions';
import ActionButton from '../../components/ActionButton';

export default function Recording(props) {
  const { onPress, isListening, isProcess, incrementKey, results } = props
  const icon = !isListening?"microphone":'stop'
  const buttonColor = !isListening?colors.seagreen:colors.red
  const questionString = textFlatten({results})

  return (
    <View style={styles.buuttonArea}>
      {!isProcess?
        <ActionButton
          icon={icon}
          color={buttonColor}
          onPress={onPress}
          isDisable={isListening && questionString === ''}
        />
        :
        <Loading incrementKey={incrementKey} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  buuttonArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})