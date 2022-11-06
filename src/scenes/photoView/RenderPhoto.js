import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import FastImage from 'react-native-fast-image'
import RenderTag from "./RenderTag";
import { fontSize, colors } from "../../theme";
import FontIcon from 'react-native-vector-icons/FontAwesome5'

export default function RenderPhoto(props) {
  const { source, tags, deleteTag, tagVisible } = props
  const currentTags = tags?tags:[]

  return (
    <FastImage
      style={styles.image}
      source={{
        uri: source,
      }}
      resizeMode='contain'
    >
      {tagVisible?
        <View style={styles.tagsContainer}>
          {currentTags.map((item, i) => {
            return (
              <RenderTag key={i} item={item} deleteTag={deleteTag} />
            )
          })}
        </View>
        :null
      }
    </FastImage>
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    flex: 1
  },
  likeContainer: {
    position: 'absolute',
    bottom: height * 0.15,
    right: width * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.floralwhite,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15
  },
  likeLabel: {
    fontSize: fontSize.xxxLarge
  },
  labelContainer: {
    paddingLeft: 10
  }
})