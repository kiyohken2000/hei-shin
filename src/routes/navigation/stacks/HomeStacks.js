import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationProps } from './navigationProps/navigationProps'
import HeaderRightButton from './headerComponents/HeaderRightButton'
import HeaderLeftButton from './headerComponents/HeaderLeftButton'

import Home from '../../../scenes/home'

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
        options={({ navigation }) => ({
          title: '早く質問しろよ',
          headerShown: true,
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <HeaderLeftButton />,
        })}
      />
    </Stack.Navigator>
  )
}