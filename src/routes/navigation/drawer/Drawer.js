import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import DrawerMenu from './DrawerMenu'
import RootStack from '../RootStack'
import { GalleryStacks } from '../stacks/GalleryStacks'

const Drawer = createDrawerNavigator()

const DrawerMenuContainer = (props) => {
  const { state, ...rest } = props
  const newState = { ...state }
  newState.routes = newState.routes.filter((item) => item.name !== 'Home')
  return (
    <DrawerContentScrollView {...props}>
      <DrawerMenu {...props} />
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="ホーム"
    drawerContent={DrawerMenuContainer}
    screenOptions={{
      headerShown: false
    }}
  >
    <Drawer.Screen name="ホーム" component={RootStack} />
    <Drawer.Screen name="ギャラリー" component={GalleryStacks} />
  </Drawer.Navigator>
)

export default DrawerNavigator
