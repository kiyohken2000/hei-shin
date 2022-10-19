import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

export default function ScreenTemplate(props) {
  const { screen, statusBar, isLoading, isError } = props
  const [barStyle, setBarStyle] = useState('')
  const [trigger, setTorigger] = useState(0)

  useFocusEffect(
    useCallback(() => {
      console.log('screen:', screen)
      setTorigger(prev => prev + 1)
    }, [screen, statusBar])
  );

  useEffect(() => {
    setBarStyle(statusBar)
  }, [trigger])

  if(isLoading) {
    return <LoadingScreen />
  }

  if(isError) {
    return <ErrorScreen />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={barStyle} />
      {props.children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})