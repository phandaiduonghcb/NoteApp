import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Layout, Button, Icon, ButtonGroup } from '@ui-kitten/components'


const ImageIcon = (props) => (
    <Icon {...props} name='image' />
);
const TaskIcon = (props) => (
    <Icon {...props} name='checkmark-square' />
);
const MicIcon = (props) => (
    <Icon {...props} name='mic' />
);
const AddIcon = (props) => (
    <Icon {...props} name='search' />
);

const BottomBar = () => {
    return (
        <Layout style={styles.topContainer}>
            <View style={styles.container}>
                <ButtonGroup style={styles.buttonGroup} appearance='ghost' status='basic'>
                    <Button accessoryLeft={ImageIcon} />
                    <Button accessoryLeft={TaskIcon} />
                    <Button accessoryLeft={MicIcon} />
                </ButtonGroup>
            </View>
            {/* <View style={styles.secondContainer}>
                <Button style={styles.button} accessoryLeft={ImageIcon}></Button>
            </View> */}
        </Layout>
    )
}


const styles = StyleSheet.create({
    topContainer: {
        borderWidth: 1,
        BorderRadius: 20,
        flexDirection: 'row',
        padding: '2%',
    }
    ,
    container: {
        flexDirection: 'row',
        // borderWidth: 1,
        // borderRadius: 10,
        alignItems: 'center',
        // justifyContent: 'center',
        spaceBetween: '2',
        width: '80%'
    },
    secondContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%'
    },
    button: {
        marginVertical: '2%',
        marginLeft: '2%',
        // borderRadius: '10'
    },
    buttons: {
        marginVertical: '2%',
        marginLeft: '6%',
    }
});

export default BottomBar