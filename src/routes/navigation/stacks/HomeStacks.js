import React from 'react'
import { Platform, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationProps } from './navigationProps/navigationProps'
import HeaderRightButton from './headerComponents/HeaderRightButton'
import HeaderLeftButton from './headerComponents/HeaderLeftButton'

import Home from '../../../scenes/home'
import { isReview } from '../../../config'
import { rootStackOptions } from './navigationProps/navigationProps'

const Stack = createStackNavigator()

export const HomeStacks = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={navigationProps}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => (
          isReview?rootStackOptions.reviewMode:rootStackOptions.productionMode
        )}
      />
    </Stack.Navigator>
  )
}