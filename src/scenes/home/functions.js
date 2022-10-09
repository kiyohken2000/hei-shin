import axios from "axios"
import { key } from '../../key'
import { kanaToRomaji } from "kuroshiro/lib/util";
import {decode, encode} from 'base-64'
if (!global.btoa) {global.btoa = encode;}
if (!global.atob) {global.atob = decode;}

const sleeping = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const textFlatten = ({results}) => {
  const res = results.join()
  return res
}

const apiRequest = async({origin}) => {
  try {
    console.log('origin', origin)
    const { originText, romaji } = await getAbeAnswer({message: origin})
    console.log('originText', originText)
    console.log('romaji', romaji)
    const uuid = await generateVoice({text: romaji})
    console.log('uuid', uuid)
    const voiceUrl = await getVoicePolling({uuid})
    console.log('voiceUrl', voiceUrl)
    return {
      answerText: originText,
      voiceUrl: voiceUrl
    }
  } catch(e) {
    console.log(e)
    return null
  }
}

const textMerge = ({origin, noSpaceRomaji}) => {
  // 「くだらない質問で終わっちゃったね。また」をつけるかどうか
  const extraOn = false
  const extraText = extraOn?'くだらない質問で終わっちゃったね。また。':''
  const extraRomaji = extraOn?'.kudaranaishItsumoNdeowaclchacltanepaumata':''
  return {
    mergedOrigin: `${origin}${extraText}`,
    mergedRomaji: `${noSpaceRomaji}${extraRomaji}`
  }
}

const removeSpace = ({romaji}) => {
  return romaji.replace(/ /g, '')
}

const getAbeAnswer = async({message}) => {
  try {
    const res = await axios.post(
      'https://webapi-test-omc3n2et7a-an.a.run.app',
      {
        'data': message
      },
      {
        headers: {
          "Content-Type" : "application/json; charset=utf-8"
        }
      }
    )
    const { origin, romaji } = res.data
    const noSpaceRomaji = removeSpace({romaji})
    const { mergedOrigin, mergedRomaji } = textMerge({origin, noSpaceRomaji})
    return {
      originText: mergedOrigin,
      romaji: mergedRomaji
    }
  } catch(e) {
    console.log('error getAbeAnswer', e)
    return null
  }
}

const generateVoice = async({text}) => {
  try {
    const response = await axios.post(
      'https://api.uberduck.ai/speak',
      {
        'pace': 1,
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

const getVoicePolling = async({uuid}) => {
  console.log('polling start')
  const res1 = await getVoice({uuid})
  if(res1) {
    return res1
  } else {
    console.log('sleep 1')
    await sleeping(2*1000);
    const res2 = await getVoice({uuid})
    if(res2) {
      return res2
    } else {
      console.log('sleep 2')
      await sleeping(2*1000);
      const res3 = await getVoice({uuid})
      if(res3) {
        return res3
      } else {
        console.log('sleep 3')
        await sleeping(2*1000);
        const res4 = await getVoice({uuid})
        if(res4) {
          return res4
        } else {
          console.log('sleep 4')
          await sleeping(2*1000);
          const res5 = await getVoice({uuid})
          if(res5) {
            return res5
          } else {
            console.log('sleep 5')
            await sleeping(2*1000);
            const res6 = await getVoice({uuid})
            if(res6) {
              return res6
            } else {
              console.log('sleep 6')
              await sleeping(2*1000);
              const res7 = await getVoice({uuid})
              if(res7) {
                return res7
              } else {
                console.log('sleep 7')
                await sleeping(2*1000);
                const res8 = await getVoice({uuid})
                if(res8) {
                  return res8
                } else {
                  console.log('sleep 8')
                  await sleeping(2*1000);
                  const res9 = await getVoice({uuid})
                  if(res9) {
                    return res9
                  } else {
                    console.log('sleep 9')
                    await sleeping(2*1000);
                    const res10 = await getVoice({uuid})
                    if(res10) {
                      return res10
                    } else {
                      console.log('polling time out')
                      return null
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

const getVoice = async({uuid}) => {
  try {
    const response = await axios.get(
      'https://api.uberduck.ai/speak-status',
      {
        params: {
          'uuid': uuid
        },
        auth: {
          username: key.uberduckKey,
          password: key.uberduckSecret
        }
      }
    );
    return response.data.path
  } catch(e) {
    console.log('error getVoice', e)
    return null
  }
}

export {
  textFlatten,
  apiRequest
}