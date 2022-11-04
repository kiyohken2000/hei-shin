import React from 'react'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './drawer'
import RootStack from './RootStack'
import Toast from 'react-native-toast-message';

export default () => {
  return (
    <>
    <NavigationContainer>
      {Platform.OS === 'ios'?
        <RootStack/>:
        <DrawerNavigator />
      }
    </NavigationContainer>
    <Toast />
    </>
  )
}
