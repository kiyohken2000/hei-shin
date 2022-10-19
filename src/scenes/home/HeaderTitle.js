import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontIcon from 'react-native-vector-icons/FontAwesome'
import { colors, fontSize } from "../../theme";
import { useNavigation } from '@react-navigation/native';

export default function HeaderTitle() {
  const navigation = useNavigation()

  const onButtonPress = () => {
    navigation.navigate('ModalStacks', {
      screen: 'Modal',
      params: {}
    })
  }

  return (
    <View style={styles.headerArea}>
      <Text style={styles.headerText}>早く質問しろよ</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onButtonPress}
      >
        <FontIcon
          name='navicon'
          color={colors.white}
          size={23}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: fontSize.xxLarge,
    position: 'absolute'
  },
  button: {
    backgroundColor: colors.lightPurple,
    width: 44,
    height: 44,
    borderRadius: 44/2,
    alignItems: 'center',
    justifyContent: 'center',
    left: 150
  }
})