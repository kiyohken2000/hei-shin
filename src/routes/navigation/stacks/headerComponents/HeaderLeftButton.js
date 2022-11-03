import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import FontIcon from 'react-native-vector-icons/FontAwesome'
import { colors } from "../../../../theme";
import { useNavigation } from '@react-navigation/native';

export default function HeaderLeftButton() {
  const navigation = useNavigation()

  const onButtonPress = () => {
    navigation.openDrawer()
  }
  return (
    <TouchableOpacity
      onPress={onButtonPress}
      style={styles.container}
    >
      <FontIcon
        name='navicon'
        color={colors.black}
        size={23}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20
  }
})