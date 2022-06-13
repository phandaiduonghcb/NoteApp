import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';
import NoteCard from '../../components/noteCard';
import SearchBar from '../../components/searchBar'
import NoteSortableList from '../../components/noteSortableList';

const Archive = ({ navigation }) => {
  return (
    // <Layout>
    //   {/* <View style={styles.container}> */}
    //     <SearchBar navigation={navigation} />
    //     {/* <Layout style={styles.layoutContainer} level='4'>
    //       <NoteCard style={styles.card} content='akjsndakljnsdkjnasd'></NoteCard>
    //       <NoteCard style={styles.card} content='akjasdasdddddddddddddsn'></NoteCard>
    //       <NoteCard style={styles.card} content='andjk'></NoteCard>
    //       <NoteCard style={styles.card} content='akjsndakljnsdkjnasd'></NoteCard>
    //       <NoteCard style={styles.card} content='akjasdasdddddddddddddsn'></NoteCard>
    //       <NoteCard style={styles.card} content='akjsndakljnsdkjnasd'></NoteCard>
    //       <NoteCard style={styles.card} content='akjasdasdddddddddddddsn'></NoteCard>
    //       <NoteCard style={styles.card} content='andjk'></NoteCard>
    //       <NoteCard style={styles.card} content='andjk'></NoteCard>
    //       <NoteCard style={styles.card} content='duong'></NoteCard>
    //     </Layout> */}
    //   {/* </View> */}
    // </Layout>
    <><Layout>
      <SearchBar navigation={navigation} />
    </Layout>
      <NoteSortableList />
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

export default Archive