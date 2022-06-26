import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';
import NoteCard from '../../components/noteCard';
import SearchBar from '../../components/searchBar'
import NoteSortableList from '../../components/noteSortableList';
import BottomBar from '../../components/bottomBar'
import ThemedActionButton from '../../components/themedActionButton'

const ArchiveScreen = ({ navigation }) => {
  return (
    <Layout></Layout>
    
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

export default ArchiveScreen