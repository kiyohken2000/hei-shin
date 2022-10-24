import React, { useState, useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { HomeTitleContext } from "../../../contexts/HomeTitleContext";

import History from "../../../scenes/history/History";
import HistoryDetail from "../../../scenes/historyDetail/HistoryDetail";

const Stack = createStackNavigator()

export const ModalStacks = () => {
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
              headerShown: true,
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name='History'
              component={History}
              options={{
                title: '過去の質問',
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name='HistoryDetail'
              component={HistoryDetail}
              options={{
                title: '過去の質問',
                headerBackTitleVisible: false,
              }}
            />
          </Stack.Navigator>
      )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}