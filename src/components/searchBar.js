import React from 'react';
import {View, StyleSheet, } from 'react-native'
import { Input, Icon, Button } from '@ui-kitten/components';
const searchIcon = (props) => (
    <Icon {...props} name='search' />
);

const LeftButton = (navigation) => (
    <Button accessoryLeft={MenuOutline} appearance='ghost'
            onPress={() => {navigation.openDrawer()}}
    ></Button>
)
const MenuOutline = (props) => (
    <Icon {...props} name='menu-outline'/>
  );

const SearchBar = ({ setSearch,search, navigation}) => 
    {
        // const [value, setValue] = React.useState('');

        return (
            <View style={styles.container}>
            <Input
                placeholder='Place your Text'
                accessoryLeft={LeftButton(navigation)}
                value={search}
                onChangeText={nextValue => setSearch(nextValue)}
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