import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import ScreenTemplate from "../../components/ScreenTemplate";
import { firestore } from '../../firebase'
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import RenderItem from "./RenderItem";
import { removeAbe } from "./functions";
import { talkRef } from "../../config";

export default function History() {
  const navigation = useNavigation()
  const [talks, setTalks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async() => {
      try {
        setIsLoading(true)
        const talkCollectionRef = collection(firestore, talkRef);
        const q = query(talkCollectionRef, orderBy("timpstamp", "desc"), limit(100))
        const querySnapshot = await getDocs(q)
        const items = querySnapshot.docs.map((doc) => doc.data())
        const res = removeAbe({items})
        setTalks(res);
      } catch(e) {
        console.log('firebase get error', e)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, []);

  const onPress = ({item}) => {
    navigation.navigate('HistoryDetail', { item })
  }

  return (
    <ScreenTemplate screen='History' statusBar='dark-content' isLoading={isLoading} isError={isError}>
      <ScrollView style={styles.container}>
        {talks.map((item, i) => {
          return (
            <RenderItem
              key={item.id}
              item={item}
              onPress={() => onPress({item})}
            />
          )
        })}
        <View style={{paddingVertical: 20}} />
      </ScrollView>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})