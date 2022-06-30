import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Layout,
  useTheme,
  Text
} from '@ui-kitten/components';
import NoteCard from '../../components/noteCard';
import SearchBar from '../../components/searchBar'
import NoteSortableList from '../../components/noteSortableList';
import BottomBar from '../../components/bottomBar'
import ThemedActionButton from '../../components/themedActionButton'
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  let isFocused = useIsFocused();
  const [search, setSearch] = React.useState('')
  console.log(search)
  return (
    <>
    <Layout>
      <SearchBar setSearch={setSearch} search={search} navigation={navigation} />
    </Layout>
      <NoteSortableList search={search} navigation={navigation}/>
      <BottomBar></BottomBar>
      <ThemedActionButton navigation={navigation} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  layoutContainer: {
    padding: "2%",
    flexDirection: 'column'
  },
  card: {
    margin: 1
  },
});

export default HomeScreen