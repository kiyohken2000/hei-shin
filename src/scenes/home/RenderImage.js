import React, { useState } from "react";
import { Image, View } from "react-native";
import FastImage from 'react-native-fast-image'

export default function RenderImage(props) {
  const { uri, desiredWidth } = props
  const [desiredHeight, setDesiredHeight] = useState(0)

  if(!uri) {
    return <View />
  }

  Image.getSize(uri, (width, height) => {
    setDesiredHeight(desiredWidth / width * height)
  })

  return (
    <FastImage
      style={{
        width: desiredWidth,
        height: desiredHeight
      }}
      source={{uri: uri}}
    />
  )
}