import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ScreenTemplate from "../../components/ScreenTemplate";
import { firestore } from "../../firebase";
import { doc, getDoc, collection, getDocs, query } from "firebase/firestore";
import RenderImage from "./RenderImage";
import RenderTag from "./RenderTag";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FAB } from 'react-native-paper';
import { colors } from "../../theme";
import { allTagsGenerator, photoIndexGenerator, filterPhotoWithTag, filterTagWithInput, likeSort, idSort } from "./functions";
import Dialog from "react-native-dialog";
import { GalleryContext } from "../../contexts/GalleryContext";
import { HomeTitleContext } from '../../contexts/HomeTitleContext'

export default function Gallery() {
  const navigation = useNavigation()
  const route = useRoute()
  const [photoIndexArray, setPhotoIndexArray] = useState([])
  const [viewPhotos, setViewPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isReverse, setIsReverse] = useState(false)
  const [isTagView, setIsTagView] = useState(false)
  const [currentTags, setCurrentTags] = useState([])
  const [allTags, setAllTags] = useState([])
  const [selectedTag, setSelectedTag] = useState('')
  const [key, setKey] = useState(0)
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState('')
  const [reload, setReload] = useState(0)
  const [isLikeSorted, setIsLikeSorted] = useState(false)
  const { count, ref } = useContext(GalleryContext)
  const { setTitle } = useContext(HomeTitleContext)

  useEffect(() => {
    if(!route.params) return
    const tag = {count: 0, label: route.params.item}
    onTagSelect({tag})
  }, [route.params])

  useEffect(() => {
    const fetchData = async() => {
      try {
        setIsLoading(true)
        const photoCollectionRef = collection(firestore, 'photos');
        const q = query(photoCollectionRef)
        const querySnapshot = await getDocs(q)
        const photoData = querySnapshot.docs.map((doc) => doc.data())
        const allTagArray = allTagsGenerator({items: photoData})
        setAllTags(allTagArray)
        setCurrentTags(allTagArray)
        const photoIndex = photoIndexGenerator({ref, count, photoData})
        setPhotoIndexArray(photoIndex)
        setViewPhotos(photoIndex)
      } catch(e) {
        console.log('firebase get error', e)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [reload]);

  const onImagePress = ({item}) => {
    const { index, source } = viewPhotos.find((v) => v.index === item.index)
    const currentPhotoArray = viewPhotos.sort((a, b) => a.id - b.id)
    const lastIndex = viewPhotos.length
    navigation.navigate('PhotoView', {initialIndex: index, photoIndexArray: currentPhotoArray, lastIndex})
  }

  const onReversePress = () => {
    setKey(prev => prev + 1)
    setViewPhotos(prev => prev.reverse())
    setIsReverse(!isReverse)
  }

  const onTagPress = () => {
    setIsTagView(!isTagView)
    if(!isTagView) {
      setCurrentTags(allTags)
    }
  }

  const onTagSelect = ({tag}) => {
    const result = filterPhotoWithTag({tag, photoIndexArray})
    setTitle(tag.label)
    setSelectedTag(tag)
    setViewPhotos(result)
    setIsTagView(false)
  }

  const removeSelectedTag = () => {
    setViewPhotos(photoIndexArray)
    setIsTagView(false)
    setSelectedTag('')
    setTitle('ギャラリー')
    setCurrentTags(allTags)
  }

  const onSearchTag = () => {
    const result = filterTagWithInput({allTags, input})
    setCurrentTags(result)
    setInput('')
    setVisible(false)
  }

  const handleCancel = () => {
    setCurrentTags(allTags)
    setInput('')
    setVisible(false)
  }

  const onLikeSort = () => {
    if(!isLikeSorted) {
      setKey(prev => prev + 1)
      const res = likeSort({photoIndexArray})
      setViewPhotos(res)
      setIsLikeSorted(true)
    } else {
      setKey(prev => prev + 1)
      const res = idSort({photoIndexArray})
      setViewPhotos(res)
      setIsLikeSorted(false)
    }
  }
  
  return (
    <ScreenTemplate screen='Gallery' statusBar='dark-content' isLoading={isLoading} isError={isError}>
      <View style={styles.container}>
        {!isTagView?
          <FlashList
            key={key}
            estimatedItemSize={125}
            data={viewPhotos}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({item, index}) => {
              return (
                <RenderImage
                  source={item.source}
                  like={item.like}
                  onPress={() => onImagePress({item})}
                />
              );
            }}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
          />
          :
          <FlashList
            key={'#'}
            estimatedItemSize={55}
            data={currentTags}
            keyExtractor={(item, index) => `${item.label}`}
            renderItem={({item, index}) => {
              return (
                <RenderTag item={item} onPress={() => onTagSelect({tag: item})} />
              );
            }}
            numColumns={3}
            contentContainerStyle={styles.tagListContainer}
          />
        }
      </View>
      <View style={styles.fabContainer}>
        {!selectedTag && !isTagView?
          <>
          <FAB
            icon={isLikeSorted?'close':'thumbs-up-down'}
            color={colors.white}
            style={[styles.fab, {backgroundColor: colors.seagreen}]}
            size='large'
            onPress={onLikeSort}
          />
          <View style={{paddingHorizontal:5}} />
          <FAB
            icon='autorenew'
            color={colors.black}
            style={[styles.fab, {backgroundColor: colors.lightyellow, opacity: !isLikeSorted?1.0: 0.6}]}
            size='large'
            onPress={() => setReload(prev => prev + 1)}
            disabled={isLikeSorted}
          />
          <View style={{paddingHorizontal:5}} />
          <FAB
            icon='sort-variant'
            color={colors.black}
            style={[styles.fab, {backgroundColor: isReverse?colors.lightsteelblue: colors.mediumseagreen, opacity: !isLikeSorted?1.0: 0.6}]}
            size='large'
            onPress={onReversePress}
            disabled={isLikeSorted}
          />
          </>
          :null
        }
        <View style={{paddingHorizontal:5}} />
        <FAB
          icon={isTagView?"tag-off":"tag"}
          color={colors.white}
          style={[styles.fab, {backgroundColor: colors.darkPurple}]}
          size='large'
          onPress={onTagPress}
        />
        <View style={{paddingHorizontal:5}} />
        {isTagView?
          <FAB
            icon='tag-search-outline'
            color={colors.white}
            style={[styles.fab, {backgroundColor: colors.mediumvioletred}]}
            size='large'
            onPress={() => setVisible(true)}
          />
          :null
        }
        <View style={{paddingHorizontal:5}} />
        {selectedTag?
          <FAB
            icon='tag-remove-outline'
            color={colors.white}
            style={[styles.fab, {backgroundColor: colors.lightsteelblue}]}
            size='large'
            onPress={removeSelectedTag}
          />
          :null
        }
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>タグを検索</Dialog.Title>
        <Dialog.Input
          placeholder='タグ'
          maxLength={8}
          onChangeText={(text) => setInput(text)}
        />
        <Dialog.Button label="キャンセル" onPress={handleCancel} />
        {input.length >= 1?
          <Dialog.Button label="検索" onPress={onSearchTag} />
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
  },
  listContainer: {
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
  },
  tagListContainer: {
  }
})