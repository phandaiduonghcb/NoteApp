import React, { Component } from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
    Input,
    ApplicationProvider,
    Icon,
    IconRegistry,
    Layout,
    Text,
    Card
  } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
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