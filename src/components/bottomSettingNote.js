import { Button, Icon, Layout, Menu, MenuItem } from "@ui-kitten/components";
import React  from "react";
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import { PanGestureHandler } from "react-native-gesture-handler";
import { Portal } from "react-native-paper";
const CloseButton = (props) => 
(
    <Icon {...props}  name='close-outline'/>
);
const PhotoIcon = (props) => 
(
    <Icon {...props}  name='camera-outline'/>
);
const ImageIcon = (props) => 
(
    <Icon {...props}  name='image-outline'/>
);
const checkIcon = (props) =>
(
    <Icon {...props} name='checkmark-square-2-outline'/>
);
const RecordingIcon = (props) =>
(
    <Icon {...props} name='mic-outline'/>
);
const DeleteIcon = (props) => (
    <Icon {...props} name='delete' pack='material'/>
);
const CopyIcon = (props) => (
    <Icon {...props} name='content-copy' pack='material'/>

);
const LabelIcon = (props) =>
(
    <Icon {...props} name='label' pack='material'/>

);

const BottomSettingNote =({show,onDismiss, navigation}) => {
    const bottomSheetAddHeight = Dimensions.get('window').height*0.21;
    const deviceWidth = Dimensions.get("window").width;
    const bottom = React.useRef(new Animated.Value(-bottomSheetAddHeight)).current;
    const [open,setOpen] = React.useState(show);
   
    const onGesture = (event) => {
      if (event.nativeEvent.translationY > 0) 
      {
        bottom.setValue(-event.nativeEvent.translationY);
      }
    };
    const onGestureEnd = (event) => {
      if (event.nativeEvent.translationY > bottomSheetAddHeight /2 )
      {
        onDismiss();
      }
      else{
        bottom.setValue(0);
      }
    };
    
    React.useEffect(() => {
        if (show)
        {
            setOpen(show);
            Animated.timing(bottom, {
                toValue:0,
                duration:500, 
                useNativeDriver:false,
            }).start();
        }
        else 
        {
            Animated.timing(bottom, {
                toValue:-bottomSheetAddHeight,
                duration: 500,
                useNativeDriver:false,

            }).start(() => {
                setOpen(false);  
            });
        }
    },[show]);
    return (
        
        <Portal>
           
            {/* <OutsideClickHandler onOutsideClick={onDismiss}> */}
            <Animated.View style={[styles.root, {height:bottomSheetAddHeight,bottom:bottom,shadowOffset:{
                height:-3
            }},styles.common,{flexDirection:'column'}]}    >
                <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd} style={{flex:1}}>
                <View style={[styles.header,{shadowOffset:
                {
                    height:3,

                }},styles.common]}>
                    <View style={{
                        width:60,
                        height:3,
                        borderRadius:1.5,
                        position:"absolute",
                        top: 13,
                        left:(deviceWidth - 60 ) /2,
                        zIndex:10,
                        backgroundColor:"#ccc"
                    }}></View>
                    <Button style={styles.closeIcon} appearance="ghost" status='danger' size='small' accessoryLeft={CloseButton} onPress={onDismiss}/>
                </View>
                
                </PanGestureHandler>
                <Menu style={{}} size='large'>
                    <MenuItem  title='Delete'  accessoryLeft={DeleteIcon} onPress={() => {
                        console.log("Delete");
                        onDismiss();
                    }}/>
                    <MenuItem title='Make a copy' accessoryLeft={CopyIcon} onPress={() => {
                        console.log("Make a copy");
                        onDismiss();
                    }}/>
                    <MenuItem title='Labels' accessoryLeft={LabelIcon} onPress={() => {
                        console.log("Labels");
                        navigation.navigate('ChooseTag')
                        onDismiss();
                    }}/>
                </Menu>
                
            </Animated.View>
            {/* </OutsideClickHandler> */}
           
        </Portal>
        
        
    );
}
const styles = StyleSheet.create({
    root:
    {
        position:"absolute",
        left:0,
        right:0,
        zIndex:100,
        backgroundColor:'#fff',
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        overflow:"hidden",
    },
    common:{
        shadowColor: "#000",
        shadowOffset: {
          
            width:0,
        },
        shadowOpacity:0.24,
        shadowRadius:4,
        elevation:3,  
    },
    header:
    {
        height:35,
        backgroundColor:'#000',
    },
    closeIcon:
    {
        position:"absolute",
        right:0,
        top:0,
        zIndex:10,
        margin: 2,
    }
});
export default BottomSettingNote;