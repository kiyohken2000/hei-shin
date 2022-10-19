import React, { useState, useContext } from "react";
import { Platform } from "react-native";
import { createStackNavigator } from '@react-navigation/stack'
import { HomeTitleContext } from "../../contexts/HomeTitleContext";
import { ModalStacks } from "./stacks/ModalStacks";
import { TransitionPresets } from "@react-navigation/stack";
import { HomeStacks } from "./stacks/HomeStacks";

const Stack = createStackNavigator()

export default function RootStack() {
  const [title, setTitle] = useState('default title')
  const isIos = Platform.OS === 'ios'

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
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen
              name='HomeRoot'
              component={HomeStacks}
            />
            <Stack.Group
              screenOptions={{
                presentation: 'modal',
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
                gestureEnabled: isIos
              }}
            >
              <Stack.Screen
                name='ModalStacks'
                component={ModalStacks}
              />
            </Stack.Group>
          </Stack.Navigator>
      )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}