import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationProps } from './navigationProps/navigationProps'
import HeaderLeftButton from './headerComponents/HeaderLeftButton'
import { HomeTitleContext } from "../../../contexts/HomeTitleContext";

import Gallery from '../../../scenes/gallery/Gallery'
import PhotoView from '../../../scenes/photoView/PhotoView'

const Stack = createStackNavigator()

export const GalleryStacks = () => {
  const [title, setTitle] = useState('ギャラリー')

  return (
    <HomeTitleContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      <HomeTitleContext.Consumer>
        {(ctx) => (
          <Stack.Navigator
            initialRouteName="Gallery"
            screenOptions={{
              headerShown: true,
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name="Gallery"
              component={Gallery}
              options={({ navigation }) => ({
                title: ctx.title,
                headerBackTitleVisible: false,
                headerLeft: () => <HeaderLeftButton />,
              })}
            />
            <Stack.Screen
              name="PhotoView"
              component={PhotoView}
              options={({ navigation }) => ({
                title: '写真',
                headerBackTitleVisible: false,
              })}
            />
          </Stack.Navigator>
        )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}