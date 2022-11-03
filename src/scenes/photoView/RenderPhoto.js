import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import FastImage from 'react-native-fast-image'
import RenderTag from "./RenderTag";

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
    flex: 1
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    flex: 1
  }
})