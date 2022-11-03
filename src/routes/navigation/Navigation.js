import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './drawer'
import RootStack from './RootStack'
import Toast from 'react-native-toast-message';

export default () => {
  return (
    <>
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
    <Toast />
    </>
  )
}
