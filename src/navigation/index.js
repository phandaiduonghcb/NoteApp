import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Layout} from '@ui-kitten/components'
import HomeScreen from '../views/HomeScreen'
import TagScreen from '../views/TagScreen'
import SearchBar from '../components/searchBar'

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Tag')}
      />
      <DrawerItem
        label="Tag"
        onPress={() => props.navigation.toggleDrawer('Home')}
      /> */}
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
      <Drawer.Screen name="Tag" component={TagScreen} options={{headerShown:false}} />
    </Drawer.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
