import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native'
import { colors, fontSize } from 'theme'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../contexts/UserContext'
import ScreenTemplate from '../../components/ScreenTemplate'
import { generateAnswer, convertNihongoToRomaji, generateVoice, getVoice, textFlatten, convertKanjiToHiragana, getVoicePolling } from './functions'
import { playVoice, playError } from './playSoud'
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import RecognizeVoice from './RecognizeVoice'
import Buttons from './Buttons'

export default function Home() {
  const navigation = useNavigation()
  const { user } = useContext(UserContext)
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [answer, setAnswer] = useState('')
  const [isProcess, setIsProcess] = useState(false)
  const [isPlay, setIsPlay] = useState(false)
 
  useEffect(() => {
    function onSpeechResults(e) {
      setResults(e.value ?? []);
    }
    function onSpeechError(e) {
      console.error(e);
    }
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return function cleanup() {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const toggleListening = async() => {
    try {
      if (isListening) {
        await Voice.stop();
        const origin = textFlatten({results})
        await apiRequest({origin})
        setIsListening(false);
      } else {
        setResults([]);
        await Voice.start("ja-JP");
        setIsListening(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const apiRequest  = async({origin}) => {
    try {
      setIsProcess(true)
      const res = await generateAnswer({message: origin})
      if(!res) return onError()
      console.log('応答', res)
      const hiragana = await convertKanjiToHiragana({res})
      if(!hiragana) return onError()
      console.log('ひらがな', hiragana)
      const romaji = await convertNihongoToRomaji({text: hiragana})
      if(!romaji) return onError()
      console.log('ローマ字', romaji)
      const uuid = await generateVoice({text: romaji})
      if(!uuid) return onError()
      console.log('UUID', uuid)
      const voice = await getVoicePolling({uuid})
      if(!voice) return onError()
      console.log('Voice URL', voice)
      setAnswer(res)
      setIsPlay(true)
      const voiceResult = await playVoice({voice})
      setIsPlay(false)
      setIsProcess(false)
    } catch(e) {
      onError()
    }
  }

  const onError = async() => {
    setIsPlay(true)
    setAnswer('すみません。よくわかりませんでした。すみませんって言ってるじゃないか')
    const voiceResult = await playError()
    setIsProcess(false)
    setIsPlay(false)
  }
  
  return (
    <ScreenTemplate screen='Home' statusBar='dark-content'>
      <View style={styles.root}>
        <View style={styles.textArea}>
          <RecognizeVoice results={results} />
        </View>
        <View style={styles.buttonArea}>
          <Buttons
            isListening={isListening}
            onPress={toggleListening}
            answer={answer}
            isProcess={isProcess}
            isPlay={isPlay}
          />
        </View>
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
  textArea: {
    flex: 1,
    width: '100%',
  },
  buttonArea: {
    flex: 2,
    width: '100%',
  }
})
