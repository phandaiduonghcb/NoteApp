import React from 'react'
import {Animated, View, StyleSheet} from 'react-native'
import {Text} from '@ui-kitten/components'


const NoteCard = (props) => {

    return (
    <Animated.View style={props.style}>
       <View style={{}}><Text style={{}}>{props.data.title}</Text ></View>
       <View style={{}}><Text  style={{}}>{props.data.content}</Text></View>
    </Animated.View>
    )
}

export default NoteCard