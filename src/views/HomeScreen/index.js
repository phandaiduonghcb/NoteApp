import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {

    Layout,
  } from '@ui-kitten/components';
import SearchBar from '../../components/searchBar';
import NoteCard from '../../components/noteCard';





const HomeScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Layout><SearchBar></SearchBar></Layout>
            <Layout style={styles.layoutContainer} level='4'>
                <NoteCard style={styles.card} content='akjsndakljnsdkjnasd'></NoteCard>
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