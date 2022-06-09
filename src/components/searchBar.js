import React from 'react';
import {View, StyleSheet, } from 'react-native'
import { Input, Icon, Button } from '@ui-kitten/components';

const searchIcon = (props) => (
    <Icon {...props} name='search' />
);
const InputSimpleUsageShowcase = () => {

    const [value, setValue] = React.useState('');
  
    return (
      <Input
        placeholder='Place your Text'
        value={value}
        onChangeText={nextValue => setValue(nextValue)}
      />
    );
  };

const LeftButton = (props) => (
    <Button accessoryLeft={MenuOutline} appearance='ghost' {...props}></Button>
)
const MenuOutline = (props) => (
    <Icon {...props} name='menu-outline'/>
  );
const SearchBar = () => 
    {
        const [value, setValue] = React.useState('');

        return (
            <View style={styles.container}>
            <Input
                placeholder='Place your Text'
                accessoryLeft={LeftButton}
                value={value}
                onChangeText={nextValue => setValue(nextValue)}
            />
            </View>
            );
    }

const styles = StyleSheet.create({
    container: {
        margin:'2%'
    },
  });

export default SearchBar