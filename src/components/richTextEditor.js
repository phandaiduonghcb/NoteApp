import React from "react";
import {Platform, KeyboardAvoidingView, StyleSheet, ScrollView, Keyboard, Dimensions } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {Layout, useTheme } from '@ui-kitten/components';
import { Text, Button, Card, Modal, Divider, Icon } from '@ui-kitten/components'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let Y = 0
let HEIGHT = 0
let HTML = ''

const CameraIcon = (props) => (
    <Icon name='camera' {...props} />
);

const UploadIcon = (props) => (
    <Icon name='upload' {...props} />
);

const RichTextEditor = (props) => {
    props.a=4
    console.log(props.a)
    let handleCursorPosition = React.useCallback((scrollY) => {
        // Positioning scroll bar
        scrollRef.current.scrollTo({ y: scrollY - 30, animated: true });
    }, [])

    const openCamera = (isCameraLaunched) => {
        let options = {
            mediaType: 'photo',
            includeBase64: true,
        }
        let result
        if (isCameraLaunched) {
            launchCamera(options, (response => {
                if (response.assets != undefined) {
                    result = response.assets[0].base64
                    // console.log(result)
                    html = '<img src="data:image/png;base64,' + result + '" />'
                    richText.current?.insertHTML(html)
                    // a = count+1
                    // setCount(a)
                }
            }));
        }
        else{
            launchImageLibrary(options, (response => {
                if (response.assets != undefined) {
                    result = response.assets[0].base64
                    // console.log(result)
                    html = '<img src="data:image/png;base64,' + result + '" />'
                    richText.current?.insertHTML(html)
                    // a = count+1
                    // setCount(a)
                }
            }));
        }
    }
    React.useEffect(() => {
        
        const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {

            let keyBoardHeight = e.endCoordinates.height
            maxY = windowHeight - keyBoardHeight
            let newHeight
            if (maxY < Y) {
                newHeight = HEIGHT - Math.round(Y - maxY) - 10
                setEHeight(newHeight-130);
            }
            setKeyboardStatus("Keyboard Shown");
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
            setKeyboardStatus("Keyboard Hidden");
            setEHeight(props.height)
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const theme = useTheme();

    const [keyboardStatus, setKeyboardStatus] = React.useState(undefined);
    const [eHeight, setEHeight] = React.useState(props.height);
    const richText = React.useRef();
    const scrollRef = React.useRef()
    const [visible, setVisible] = React.useState(false);

    return (
        <Layout style={{ height: eHeight , marginHorizontal:'3%'}}
            onLayout={event => {
                const layout = event.nativeEvent.layout;
                Y = (layout.y + layout.height)
                HEIGHT = layout.height
            }}
        >
            <ScrollView ref={scrollRef}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <RichEditor

                        ref={richText}
                        onChange={descriptionText => {
                            // console.log("descriptionText:", descriptionText);
                            if (descriptionText != ''){
                                HTML = descriptionText;
                            }
                        }}
                        placeholder={'Type your note here!'}
                        onCursorPosition={handleCursorPosition}
                        onFocus={handleCursorPosition}
                        editorStyle={{ backgroundColor: theme['background-basic-color-2'], color: theme["text-basic-color"] }}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

            <RichToolbar
                editor={richText}
                iconTint={theme['color-primary-500']}
                selectedIconTint={theme['color-danger-500']}
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.insertImage, 'exitKeyboard']}
                onPressAddImage={() => {
                    // openCamera()
                    setVisible(true)
                    // scrollRef.current.scrollTo({ y: 0, animated: true });
                    // richText.current?.commandDOM(`document.execCommand('insertHTML', false, "<br/>diaskdja")`);
                }}
                iconMap={{ exitKeyboard: (tintColor) => (<Text style={[{ color: theme['color-primary-500'] }]}>X</Text>), }}
                exitKeyboard={() => richText.current?.dismissKeyboard()}
            />
            {/* <Text>{keyboardStatus}</Text> */}
            {/* <View style={styles.container}> */}
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true}>
                    <Button accessoryLeft={CameraIcon} onPress={() => {
                        setVisible(false)
                        openCamera(true)
                    }}>
                        Take a photo
                    </Button>
                    <Divider style={{ marginVertical: '2%' }} />
                    <Button accessoryLeft={UploadIcon} onPress={()=>{
                        setVisible(false)
                        openCamera(false)
                    }}>
                        Choose from libary
                    </Button>
                </Card>
            </Modal>
        </Layout>
    )
}

const styles = StyleSheet.create({

    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
export default RichTextEditor