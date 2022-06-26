import React from 'react'
import {Animated, View, TouchableOpacity} from 'react-native'
import {Text} from '@ui-kitten/components'


const NoteCard = (props) => {

    return (
    <Animated.View style={props.style} >
       <View style={{height:'20%'}}><Text style={{}}>{props.data.title}</Text ></View>
       <View style={{height:'80%'}}><Text  style={{}}>{props.data.body}</Text></View>
       <View style={{height:'80%'}}><Text  style={{}}>{props.data.alarm}</Text></View>
       
    </Animated.View>
    )
}

export default NoteCard