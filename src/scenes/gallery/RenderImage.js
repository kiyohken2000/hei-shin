import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import FastImage from 'react-native-fast-image'
import { colors, fontSize } from "../../theme";
import FontIcon from 'react-native-vector-icons/FontAwesome5'

export default function RenderImage(props) {
  const { source, onPress, like } = props

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <FastImage
        style={styles.container}
        source={{
          uri: source,
        }}
        resizeMode='cover'
      />
      <View style={styles.likeContainer}>
        <FontIcon
          name='thumbs-up'
          color={colors.deeppink}
          size={fontSize.large}
        />
        <Text style={styles.likeLabel}>{like}</Text>
      </View>
    </TouchableOpacity>
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width: width / 3,
    height: width / 3
  },
  image: {
    height: '100%',
    width: '100%'
  },
  likeContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    flexDirection: 'row',
    backgroundColor: colors.floralwhite,
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 5
  },
  likeLabel: {
    fontSize: fontSize.large
  }
})