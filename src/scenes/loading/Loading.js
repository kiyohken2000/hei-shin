import React, { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { UserContext } from '../../contexts/UserContext';
import { GalleryContext } from '../../contexts/GalleryContext';
import { fontSize } from 'theme'
import { firestore } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";
import { galleryRef } from '../../key';
import { tempUser } from '../../config';

export default function Loading() {
  const dispatch = useDispatch()
  const { setUser } = useContext(UserContext)
  const { setCount, setRef } = useContext(GalleryContext)

  useEffect(() => {
    initialize()
  }, [])

  const initialize = async() => {
    try {
      const galleryDocumentRef = doc(firestore, 'galery', galleryRef);
      const documentSnapshot = await getDoc(galleryDocumentRef)
      const { count, ref } = documentSnapshot.data()
      setCount(count)
      setRef(ref)
    } catch (e) {
      console.log('initialize error', e)
    } finally {
      setUser(tempUser)
      dispatch(authenticate({ loggedIn: true, checked: true }))
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Loading</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700'
  }
})