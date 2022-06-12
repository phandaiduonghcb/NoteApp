import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Divider, Layout } from '@ui-kitten/components'
import HomeScreen from '../views/HomeScreen'
import TagScreen from '../views/TagScreen'
import NoteScreen from '../views/NoteScreen';

import { Drawer, DrawerItem, IndexPath, Icon, DrawerGroup } from '@ui-kitten/components'

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  // DrawerItemList,
  // DrawerItem,
} from '@react-navigation/drawer';



const NoteIcon = (props) => (
  <Icon {...props} name='credit-card' />
);


const TagIcon = (props) => (
  <Icon {...props} name='plus-square' />
);

const LabelIcon = (props) => (
  <Icon {...props} name='bookmark' />
);

const BellIcon = (props) => (
  <Icon {...props} name='bell' />
);



const Header = (props) => (
  <Layout style={{ paddingVertical: '10%' }}>
    <Text category='h1'>This is header</Text>
    <Divider />
  </Layout>
);

const Footer = (props) => (
  <Layout style={{ paddingVertical: '10%' }}>
    <Text category='h1'>This is Footer</Text>
    <Divider />
  </Layout>
);


const DrawerContent = ({ navigation, state }) => {

  const navigate = (navigation, index) => {
    if (index.row==0){
      navigation.navigate('Home')
    }
    else if (index.row==1){
      // navigation.navigate('')
    }
    else if (index.section==undefined && index.row==2)
    {
      //Ko lam gi het
    }
    else if (index.section==2 && index.row==0)
    {
      navigation.navigate('Home')
    }
    else if (index.section==2 && index.row==1)
    {
      navigation.navigate('Tag')
    }
    else if (index.row==3){
      navigation.navigate('Tag')
    }
    else if (index.row==4){
      navigation.navigate('Note')
    }
  }

  return (
    <Drawer
      header={Header}
      footer={Footer}
      selectedIndex={new IndexPath(state.index)}
      onSelect={index => {navigate(navigation, index)}}>
      <DrawerItem accessoryLeft={NoteIcon} title='Home'/>
      <DrawerItem accessoryLeft={BellIcon} title='Alarm'/>
      <DrawerGroup accessoryLeft={TagIcon} title='Tag Group'>
        <DrawerItem accessoryLeft={TagIcon} title='Add Tag' />
        <DrawerItem accessoryLeft={LabelIcon} title='Tag' />
      </DrawerGroup>

      <DrawerItem title='Tag' />
      <DrawerItem title='Note' />
    </Drawer>
  )
}

const { Navigator, Screen } = createDrawerNavigator();

function MyDrawer() {
  return (
    <Navigator
      useLegacyImplementation
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Screen name="Tag" component={TagScreen} options={{ headerShown: false }} />
      <Screen name="Note" component={NoteScreen} options={{ headerShown: false }} />
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
