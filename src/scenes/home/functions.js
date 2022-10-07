import axios from "axios"
import { key } from '../../key'
import { kanaToRomaji } from "kuroshiro/lib/util";
import {decode, encode} from 'base-64'
if (!global.btoa) {global.btoa = encode;}
if (!global.atob) {global.atob = decode;}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const textFlatten = ({results}) => {
  const res = results.join()
  return res
}

const generateAnswer = async({message}) => {
  try {
    const form = new FormData();
    form.append('apikey', key.A3RT);
    form.append('query', message);
    const response = await axios.post(
      'https://api.a3rt.recruit.co.jp/talk/v1/smalltalk',
      form
    )
    return response.data.results[0].reply
  } catch(e) {
    console.log('error generateAnswer', e)
    return null
  }
}

const convertKanjiToHiragana = async({res}) => {
  try {
    const response = await axios.post(
      "https://jlp.yahooapis.jp/FuriganaService/V2/furigana",
      {
        "id": "1",
        "jsonrpc": "2.0",
        "method": "jlp.furiganaservice.furigana",
        "params": {
          "q": res
        }
      },
      {
        headers: {
          "User-Agent" : `Yahoo AppID: ${key.yahooClientID}`,
          "Content-Type" : "application/json; charset=utf-8"
        }
      }
    )
    const result = response.data.result.word
    const res2 = result.map(item => item.furigana)
    const response2 = res2.join().replace(/,/g, '')
    return response2
  } catch (e) {
    console.log('error convertKanjiToHiragana', e)
    return null
  }
}

const convertNihongoToRomaji = async({text}) => {
  const res = kanaToRomaji(text)
  return res
}

const generateVoice = async({text}) => {
  try {
    const response = await axios.post(
      'https://api.uberduck.ai/speak',
      {
        'pace': 0.5,
        'voicemodel_uuid': key.voiceModelUUID,
        'speech': text
      },
      {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Basic ' + btoa(`${key.uberduckKey}:${key.uberduckSecret}`),
          'content-type': 'application/json'
        }
      }
    );
    return response.data.uuid
  } catch (e) {
    console.log('error generateVoice', e)
    return null
  }
}

const getVoice = async({uuid}) => {
  try {
    await sleep(10*1000);
    const response = await axios.get('https://api.uberduck.ai/speak-status', {
      params: {
        'uuid': uuid
      },
      auth: {
        username: 'pub_uwgbmqsbkisaqltihc',
        password: 'pk_73b45083-e4ea-47ef-bc4e-09bd120afbd1'
      }
    });
    return response.data.path
  } catch(e) {
    console.log('error getVoice', e)
    return null
  }
}

export { generateAnswer, convertNihongoToRomaji, generateVoice, getVoice, textFlatten, convertKanjiToHiragana }