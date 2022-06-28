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
 import { YellowBox } from "react-native";
 YellowBox.ignoreWarnings([""]);
 import React from 'react'
 import {
   ApplicationProvider,
   IconRegistry
 
 } from '@ui-kitten/components';
 import { EvaIconsPack } from '@ui-kitten/eva-icons';
 import * as eva from '@eva-design/eva';
 import { AppNavigator} from './src/navigation';
 import { MaterialIconsPack } from './src/Icons/material-icons';
 
 export default () => (
   <>
     <IconRegistry icons={[EvaIconsPack,MaterialIconsPack]} />
     <ApplicationProvider {...eva} theme={eva.light}>
       <AppNavigator/>
     </ApplicationProvider>
   </>
 );
 
 // export default Flex;