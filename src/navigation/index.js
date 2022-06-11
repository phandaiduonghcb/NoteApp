import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Layout} from '@ui-kitten/components'
import HomeScreen from '../views/HomeScreen'
import TagScreen from '../views/TagScreen'
import SearchBar from '../components/searchBar'

import {Drawer, DrawerItem, IndexPath} from '@ui-kitten/components'

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  // DrawerItemList,
  // DrawerItem,
} from '@react-navigation/drawer';
const DrawerContent= ({ navigation, state}) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title='Home' />
    <DrawerItem title='Tag' />
  </Drawer>
)

const { Navigator, Screen } = createDrawerNavigator();

function MyDrawer() {
  return (
    <Navigator
      useLegacyImplementation
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
      <Screen name="Tag" component={TagScreen} options={{headerShown:false}} />
    </Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
