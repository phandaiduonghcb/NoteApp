import React from 'react'
import {Animated, View, TouchableOpacity} from 'react-native'
import {Text} from '@ui-kitten/components'
import { WebView } from 'react-native-webview';

const NoteCard = (props) => {
    let content = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' + props.data.body +'</body></html>'
    return (
    <Animated.View style={props.style} >
       <View style={{height:'20%'}}><Text style={{}}>{props.data.title}</Text ></View>
       {/* <View style={{height:'80%'}}><Text  style={{}}>{props.data.body}</Text></View> */}
       <WebView originWhitelist={['*']} source={{html: content}} />
    </Animated.View>
    )
}

export default NoteCard