import React from "react"
import {
    useTheme
} from '@ui-kitten/components'
import ActionButton from 'react-native-action-button';

const ThemedActionButton = ({navigation}) => {
    const theme = useTheme()
  
    return (
      <ActionButton buttonColor={theme['color-primary-500']} onPress={() => {navigation.navigate('Note',{id: undefined})}}></ActionButton>
    )
  }

export default ThemedActionButton