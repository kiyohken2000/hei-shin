import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import ScreenTemplate from "../../components/ScreenTemplate";
import RenderPhoto from "./RenderPhoto";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { firestore } from "../../firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";
import { FAB } from 'react-native-paper';
import { colors } from "../../theme";
import Dialog from "react-native-dialog";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system'
import Toast from 'react-native-toast-message';

export default function PhotoView() {
  const route = useRoute()
  const { photoIndexArray, initialIndex, lastIndex } = route.params
  const [index, setIndex] = useState(initialIndex)
  const [currentPhoto, setCurrentPhoto] = useState(photoIndexArray[index])
  const [key, setKey] = useState(0)
  const [tags, setTags] = useState([])
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState('')
  const [tagVisible, setTagVisible] = useState(true)
  const [isProcess, setIsProcess] = useState(false)

  useEffect(() => {
    setCurrentPhoto(photoIndexArray[index])
  }, [index])

  useEffect(() => {
    fetchData()
  }, [index])

  const fetchData = async() => {
    try {
      const photoDocumentRef = doc(firestore, 'photos', `${photoIndexArray[index].id}`);
      const documentSnapshot = await getDoc(photoDocumentRef)
      const { id, tags } = documentSnapshot.data()
      setTags(tags)
    } catch(e) {
      console.log('error', e)
      addPhotoData()
    }
  }

  const addPhotoData = async() => {
    try {
      const photoDocumentRef = doc(firestore, 'photos', `${currentPhoto.id}`)
      const documentRef = await setDoc(photoDocumentRef, {
        id: currentPhoto.id,
        tags: []
      });
    } catch(e) {
      console.log('error', e)
    }
  }

  const LeftSwipeActions = () => {
    if(index <= 0) return
    return (
      <View style={styles.container}>
        <RenderPhoto source={photoIndexArray[index - 1].source} />
      </View>
    )
  }

  const RightSwipeActions = () => {
    if(index >= lastIndex - 1) return
    return (
      <View style={styles.container}>
        <RenderPhoto source={photoIndexArray[index + 1].source} />
      </View>
    )
  }

  const onSwipeableOpen = ({item}) => {
    switch (item) {
      case 'left':
        setIndex(prev => prev - 1)
        setTags([])
        setKey(prev => prev + 1)
        break;
      case 'right':
        setIndex(prev => prev + 1)
        setTags([])
        setKey(prev => prev + 1)
        break;
      default:
        console.log('none')
    }
  }

  const addTag = async() => {
    try {
      const photoDocumentRef = doc(firestore, 'photos', `${photoIndexArray[index].id}`);
      await updateDoc(photoDocumentRef, {
        tags: arrayUnion(input)
      });
      setInput('')
      setVisible(false);
      fetchData()
    } catch(e) {
      console.log('error', e)
    }
  }

  const deleteTag = async({item}) => {
    try {
      const photoDocumentRef = doc(firestore, 'photos', `${photoIndexArray[index].id}`);
      await updateDoc(photoDocumentRef, {
        tags: arrayRemove(item)
      });
      fetchData()
    } catch(e) {
      console.log('error', e)
    }
  }

  const onSavePress = async() => {
    try {
      setIsProcess(true)
      const { uri } = await FileSystem.downloadAsync(
        currentPhoto.source,
        FileSystem.documentDirectory + `${currentPhoto.id}.jpg`
      )
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const asset = await MediaLibrary.saveToLibraryAsync(uri);
        Toast.show({
          type: 'success',
          text1: '保存しました',
        });
      }
    } catch(e) {
      console.log('error', e)
      Toast.show({
        type: 'error',
        text1: '保存に失敗しました',
      });
    } finally {
      setIsProcess(false)
    }
  }

  return (
    <ScreenTemplate screen='PhotoView' statusBar='dark-content' key={key}>
      <Swipeable
        renderLeftActions={LeftSwipeActions}
        renderRightActions={RightSwipeActions}
        onSwipeableOpen={(item) => onSwipeableOpen({item})}
        containerStyle={styles.container}
      >
        <RenderPhoto
          source={currentPhoto.source}
          tags={tags}
          index={index}
          deleteTag={deleteTag}
          tagVisible={tagVisible}
        />
      </Swipeable>
      <View style={styles.fabContainer}>
        <FAB
          icon="pencil"
          style={[styles.fab, {backgroundColor: colors.lightGrayPurple}]}
          size='large'
          onPress={() => setVisible(true)}
        />
        <View style={{paddingHorizontal:5}} />
        <FAB
          icon={tagVisible?"tag-off":"tag"}
          color={colors.white}
          style={[styles.fab, {backgroundColor: colors.darkPurple}]}
          size='large'
          onPress={() => setTagVisible(!tagVisible)}
        />
        <View style={{paddingHorizontal:5}} />
        {!isProcess?
          <FAB
            icon='file-download'
            color={colors.black}
            style={[styles.fab, {backgroundColor: colors.lightsteelblue}]}
            size='large'
            onPress={onSavePress}
          />
          :
          <View style={[styles.fab, {backgroundColor: colors.lightsteelblue}]}>
            <ActivityIndicator size="large" color={colors.seagreen} />
          </View>
        }
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>写真にタグを追加</Dialog.Title>
        <Dialog.Input
          placeholder='タグ'
          maxLength={8}
          onChangeText={(text) => setInput(text)}
        />
        <Dialog.Button label="キャンセル" onPress={() => setVisible(false)} />
        {input.length > 3?
          <Dialog.Button label="追加" onPress={addTag} />
          :null
        }
      </Dialog.Container>
    </ScreenTemplate>
  )
}

const { height, width } = Dimensions.get('window')
const widthRatio = width * 0.17
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fabContainer: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 40,
    flexDirection: 'row'
  },
  fab: {
    width: widthRatio,
    height: widthRatio,
    borderRadius: widthRatio / 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
})