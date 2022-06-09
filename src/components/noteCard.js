
import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Card, Input, Text } from "@ui-kitten/components";

const Header = () => {
    return (
        <View><Text>header</Text></View>
    )
}
const NoteCard = (props) => {
    return (
        <View style={styles.container}>
        <Card header={Header}>
            <View style={styles.card}>
                <Text>{props.content}</Text>
            </View>
        </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
      marginBottom: 10
    },
    container: {
        marginBottom: '2%'
    },
  });
export default NoteCard