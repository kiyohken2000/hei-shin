import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native'
import Button from 'components/Button'
import { colors, fontSize } from 'theme'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../contexts/UserContext'
import ScreenTemplate from '../../components/ScreenTemplate'
import { generateAnswer, convertNihongoToRomaji, generateVoice, getVoice } from './functions'
import { playVoice } from './playSoud'

export default function Home() {
  const navigation = useNavigation()
  const { user } = useContext(UserContext)

  useEffect(() => {
    console.log('user:', user)
  }, [])

  const onButtonPress  = async() => {
    const res = await generateAnswer({message: '今日の天気は？'})
    console.log('応答', res)
    const romaji = await convertNihongoToRomaji({text: res})
    console.log('ローマ字', romaji)
    const uuid = await generateVoice({text: romaji})
    console.log('UUID', uuid)
    const voice = await getVoice({uuid})
    console.log('Voice URL', voice)
    playVoice({voice})
  }
  
  return (
    <ScreenTemplate screen='Home' statusBar='dark-content'>
      <View style={styles.root}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.textContainer}>
          <Text>ヘッダーなしボトムタブあり</Text>
        </View>
        <Button
          title="Go to Details"
          color="white"
          backgroundColor={colors.lightPurple}
          onPress={() => onButtonPress()}
        />
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xxxLarge,
    marginBottom: 20,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  }
})
