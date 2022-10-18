import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Platform } from 'react-native'
import { colors, fontSize } from 'theme'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../contexts/UserContext'
import ScreenTemplate from '../../components/ScreenTemplate'
import { textFlatten, apiRequest } from './functions'
import { playVoice, playError } from './playSoud'
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import RecognizeVoice from './RecognizeVoice'
import Answer from './Answer'
import Recording from './Recording'
import PlayVoice from './PlayVoice'

export default function Main(props) {
  const { incrementKey } = props
  const navigation = useNavigation()
  const { user } = useContext(UserContext)
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [answer, setAnswer] = useState('')
  const [isProcess, setIsProcess] = useState(false)
  const [voiceSource, setVoiceSource] = useState('')
 
  useEffect(() => {
    function onSpeechResults(e) {
      setResults([e.value[0]] ?? []);
    }
    function onSpeechError(e) {
      console.log('onSpeechError', e);
      destroyRecognizer()
      //setIsProcess(false)
    }
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return function cleanup() {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleListening = async() => {
    try {
      if (isListening) {
        await Voice.stop();
        setResults(results)
        const origin = textFlatten({results})
        setVoiceSource('')
        await onRequest({origin})
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

  const onRequest = async({origin}) => {
    try {
      setIsProcess(true)
      const { answerText, voiceUrl } = await apiRequest({origin})
      if(!answerText || !voiceUrl) return onError()
      setAnswer(answerText)
      setVoiceSource(voiceUrl)
      setIsProcess(false)
    } catch(e) {
      onError()
    }
  }

  const onError = async() => {
    setAnswer('すみません。よくわかりませんでした。すみませんって言ってるじゃないか')
    await playError()
    setIsProcess(false)
  }
  
  return (
    <ScreenTemplate screen='Home' statusBar='dark-content'>
      <View style={styles.root}>
        <View style={styles.textArea}>
          <RecognizeVoice results={results} />
        </View>
        <View style={styles.answerArea}>
          <Answer answer={answer} />
        </View>
        <View style={styles.buttonArea}>
          {!voiceSource?
            <Recording
              isListening={isListening}
              onPress={toggleListening}
              isProcess={isProcess}
              incrementKey={incrementKey}
              results={results}
            />
            :
            <PlayVoice
              voiceSource={voiceSource}
              setVoiceSource={setVoiceSource}
              setAnswer={setAnswer}
              incrementKey={incrementKey}
            />
          }
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
  answerArea: {
    flex: 2,
    width: '100%',
  },
  buttonArea: {
    flex: 0.7,
    width: '100%',
  }
})
