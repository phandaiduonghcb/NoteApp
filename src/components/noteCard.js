import React from 'react'
import {Animated, View, TouchableOpacity} from 'react-native'
import {Text, useTheme} from '@ui-kitten/components'
import { WebView } from 'react-native-webview';

const NoteCard = (props) => {
    const theme = useTheme()
    let content = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' + `<div style="color: ${theme['text-basic-color']}">` + props.data.body + '</div>' + '</body></html>'
    return (
    <Animated.View style={props.style} >
       <View style={{height:'20%'}}><Text style={{}}>{props.data.title}</Text ></View>
       <View style={{height:'20%'}}><Text  style={{}}>{props.data.alarm}</Text></View>
       {/* <WebView
       style={{backgroundColor:theme['background-basic-color'], color: theme['text-basic-color']}}
       originWhitelist={['*']} source={{html: content}} /> */}
    </Animated.View>
    )
}

export default NoteCard