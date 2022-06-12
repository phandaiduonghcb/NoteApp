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

import React from 'react'
import { StyleSheet} from 'react-native';
import {
  ApplicationProvider,
  IconRegistry

} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { AppNavigator} from './src/navigation';
import SearchBar from './src/components/searchBar'

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
      <AppNavigator/>
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