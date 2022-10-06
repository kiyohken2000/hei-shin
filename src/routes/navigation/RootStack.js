import React, { useState, useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from "./tabs/Tabs";
import Post from "../../scenes/post/Post";
import { HomeTitleContext } from "../../contexts/HomeTitleContext";
import { ModalStacks } from "./stacks/ModalStacks";
import { TransitionPresets } from "@react-navigation/stack";
import { HomeStacks } from "./stacks/HomeStacks";

const Stack = createStackNavigator()

export default function RootStack() {
  const [title, setTitle] = useState('default title')

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
          </Stack.Navigator>
      )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}