import axios from "axios"
import { key } from '../../key'
import { kanaToRomaji } from "kuroshiro/lib/util";
import {decode, encode} from 'base-64'
if (!global.btoa) {global.btoa = encode;}
if (!global.atob) {global.atob = decode;}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const generateAnswer = async({message}) => {
  const form = new FormData();
  form.append('apikey', key.A3RT);
  form.append('query', message);
  const response = await axios.post(
    'https://api.a3rt.recruit.co.jp/talk/v1/smalltalk',
    form
  )
  return response.data.results[0].reply
}

const convertNihongoToRomaji = async({text}) => {
  const res = kanaToRomaji(text)
  return res
}

const generateVoice = async({text}) => {
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
}

const getVoice = async({uuid}) => {
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
}

export { generateAnswer, convertNihongoToRomaji, generateVoice, getVoice }