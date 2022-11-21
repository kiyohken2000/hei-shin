import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import ScreenTemplate from "../../components/ScreenTemplate";
import { colors } from '../../theme'
import Question from "./Question";
import Answer from "../home/Answer";
import PlayVoice from "./PlayVoice";
import { GalleryContext } from "../../contexts/GalleryContext";
import { randomImageGenerator } from "../home/functions";

export default function HistoryDetail() {
  const route = useRoute()
  const { count } = useContext(GalleryContext)
  const { item } = route.params
  const [imageSource, setImageSource] = useState('')

  useEffect(() => {
    const imgUrl = randomImageGenerator({count})
    setImageSource(imgUrl)
  }, [item.id])

  return (
    <ScreenTemplate screen='HistoryDetail' statusBar='dark-content'>
      <View style={styles.container}>
        <View style={styles.questionArea}>
          <Question question={item.question} />
        </View>
        <View style={styles.answerArea}>
          <Answer answer={item.answer} imageSource={imageSource} />
        </View>
        <View style={styles.buttonArea}>
          <PlayVoice voiceSource={item.voiceSource} />
        </View>
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionArea: {
    flex: 1,
    width: '100%'
  },
  answerArea: {
    flex: 3,
    width: '100%'
  },
  buttonArea: {
    flex: 1,
    width: '100%'
  }
})