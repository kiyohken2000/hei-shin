import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TouchableOpacityBase } from "react-native";
import { colors, fontSize } from "../../theme";
import Dialog from "react-native-dialog";
import FontIcon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get('window')

export default function RenderTag(props) {
  const { item, deleteTag } = props
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation()

  const onTagPress = () => {
    navigation.navigate('Gallery', {item})
  }

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onTagPress}
      >
        <Text style={styles.label}>{item}</Text>
        <View style={{paddingHorizontal:5}} />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setVisible(true)}
        >
          <FontIcon
            name='close'
            color={colors.black}
            size={width * 0.04}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
    <Dialog.Container visible={visible}>
      <Dialog.Title>タグを削除しますか？</Dialog.Title>
      <Dialog.Button label="キャンセル" onPress={() => setVisible(false)} />
      <Dialog.Button label="タグを削除" onPress={() => deleteTag({item})} />
    </Dialog.Container>
    </>
  )
}

const widthRatio = width * 0.07
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  button: {
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 5,
    backgroundColor: colors.lightsteelblue,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontSize: fontSize.large,
    color: colors.black
  },
  deleteButton: {
    backgroundColor: colors.gray,
    width: widthRatio,
    height: widthRatio,
    borderRadius: widthRatio / 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
})