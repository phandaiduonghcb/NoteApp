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

const CustomTagScreen = ({ navigation ,route}) => {
  let isFocused = useIsFocused();
  const {ids,tag} = route.params;
  console.log(ids,tag);
  const [search, setSearch] = React.useState('')
  console.log(search)
  return (
    <>
    <Layout>
      <SearchBar setSearch={setSearch} search={search} navigation={navigation} />
    </Layout>
      <NoteSortableList search={search} navigation={navigation} ids={ids} tag={tag}/>
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

export default CustomTagScreen;