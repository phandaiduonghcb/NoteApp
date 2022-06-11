import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import SearchBar from '../../components/searchBar';
import {

    Layout,
  } from '@ui-kitten/components';
import NoteCard from '../../components/noteCard';

const TagScreen = ({ navigation}) => {
    return (
      <Layout>
        <ScrollView style={styles.container}>
            <SearchBar navigation={navigation} />
            <Layout style={styles.layoutContainer} level='4'>
                <NoteCard style={styles.card} content='TagScreen'></NoteCard>
                <NoteCard style={styles.card} content='akjasdasdddddddddddddsn'></NoteCard>
                <NoteCard style={styles.card} content='andjk'></NoteCard>
                <NoteCard style={styles.card} content='akjsndakljnsdkjnasd'></NoteCard>
                <NoteCard style={styles.card} content='akjasdasdddddddddddddsn'></NoteCard>
                <NoteCard style={styles.card} content='akjsndakljnsdkjnasd'></NoteCard>
                <NoteCard style={styles.card} content='akjasdasdddddddddddddsn'></NoteCard>
                <NoteCard style={styles.card} content='andjk'></NoteCard>
                <NoteCard style={styles.card} content='andjk'></NoteCard>
                <NoteCard style={styles.card} content='duong'></NoteCard>
            </Layout>
        </ScrollView>
      </Layout>
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

export default TagScreen