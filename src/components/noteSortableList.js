import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
    Animated,
    Image,
    StyleSheet,
    Platform,
    Easing,
    View,
    Dimensions,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import { Text, Layout } from '@ui-kitten/components'
import NoteCard from './noteCard';

const window = Dimensions.get('window');
 
 const data = {
   0: {
     title: 'https://placekitten.com/200/240',
     content: 'Chloe',
   },
   1: {
     title: 'https://placekitten.com/200/201',
     content: 'Jasper',
   },
   2: {
     title: 'https://placekitten.com/200/202',
     content: 'Pepper',
   },
   3: {
     title: 'https://placekitten.com/200/203',
     content: 'Oscar',
   },
   4: {
     title: 'https://placekitten.com/200/204',
     content: 'Dusty',
   },
   5: {
     title: 'https://placekitten.com/200/205',
     content: 'Spooky',
   },
   6: {
     title: 'https://placekitten.com/200/210',
     content: 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
   },
   7: {
     title: 'https://placekitten.com/200/215',
     content: 'Smokey',
   },
   8: {
     title: 'https://placekitten.com/200/220',
     content: 'Gizmo',
   },
   9: {
     title: 'https://placekitten.com/220/239',
     content: 'Kitty',
   },
 };
 
 function Row(props) {
   const {active, data} = props;
 
   const activeAnim = useRef(new Animated.Value(0));
   const style = useMemo(
     () => ({
       ...Platform.select({
         ios: {
           transform: [
             {
               scale: activeAnim.current.interpolate({
                 inputRange: [0, 1],
                 outputRange: [1, 1.07],
               }),
             },
           ],
           shadowRadius: activeAnim.current.interpolate({
             inputRange: [0, 1],
             outputRange: [2, 10],
           }),
         },
 
         android: {
           transform: [
             {
               scale: activeAnim.current.interpolate({
                 inputRange: [0, 1],
                 outputRange: [1, 1.07],
               }),
             },
           ],
           elevation: activeAnim.current.interpolate({
             inputRange: [0, 1],
             outputRange: [2, 6],
           }),
         },
       }),
     }),
     [],
   );
   useEffect(() => {
     Animated.timing(activeAnim.current, {
       duration: 300,
       easing: Easing.bounce,
       toValue: Number(active),
       useNativeDriver: true,
     }).start();
   }, [active]);
 
   return (
    <NoteCard style={[styles.row, style]} data={data}></NoteCard>
   );
 }
 
 const NoteSortableList = () => {
   const renderRow = useCallback(({data, active}) => {
     return <Row data={data} active={active} />;
   }, []);
 
   return (
    // <View style={styles.container}>
        <Layout style={styles.container}>
       <SortableList
         style={styles.list}
         contentContainerStyle={styles.contentContainer}
         data={data}
         renderRow={renderRow}
       />
       </Layout>
    // </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   },
   list: {
     flex: 1,
   },
   contentContainer: {
     width: window.width,
     ...Platform.select({
       ios: {
         paddingHorizontal: 100,
       },
       android: {
         paddingHorizontal: 0,
       },
     }),
   },
   row: {
     flexDirection: 'column',
    //  alignItems: 'center',
    //  backgroundColor: 'gray',
     padding: 16,
     height: window.height/5,
     flex: 1,
     marginTop: '1%',
     marginBottom: '1%',
     borderRadius: 5,
     ...Platform.select({
       ios: {
         width: window.width - 30 * 2,
         shadowColor: 'rgba(0,0,0,0.2)',
         shadowOpacity: 1,
         shadowOffset: {height: 2, width: 2},
         shadowRadius: 2,
       },
       android: {
         width: window.width - window.width*4/100,
         elevation: 0,
         marginHorizontal: '2%',
       },
     }),
   },
 });

 export default NoteSortableList