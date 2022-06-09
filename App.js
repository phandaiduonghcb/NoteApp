/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Input,
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
  Card
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import HomeScreen from './src/views/HomeScreen';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (props) => (
  <Icon {...props} name='search' />
);

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <HomeScreen></HomeScreen>
    </ApplicationProvider>
  </>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

// export default Flex;