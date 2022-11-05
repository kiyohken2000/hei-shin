import React from 'react'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './drawer'
import RootStack from './RootStack'
import Toast from 'react-native-toast-message';

import { isReview } from '../../config'

export default () => {
  return (
    <>
    <NavigationContainer>
      {isReview?
        <RootStack/>:
        <DrawerNavigator />
      }
    </NavigationContainer>
    <Toast />
    </>
  )
}
