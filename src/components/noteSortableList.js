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
import { useIsFocused } from '@react-navigation/native';

import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "rn_sqlite",
});

const window = Dimensions.get('window');
 
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
 
 const NoteSortableList = ({navigation}) => {
  const [DATA, setDATA] = React.useState({1:''})
  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, alarm TEXT)`,
        [],
        (sqlTxn, res) => {
          console.log("table created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  };
  const getNotes = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM notes ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("categories retrieved successfully");
          let len = res.rows.length;
          console.log('Number of records:',len)
          if (len > 0) {
            let results = {};
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results[item.id] = {title: item.title, body: item.body, alarm: item.alarm };
            }
  
            setDATA(results)
          }
        },
        error => {
          console.log("error on getting categories " + error.message);
        },
      );
    });
  }
  React.useEffect(() => {
    async function FetchData () {
      await createTables();
      await getNotes();
    }
    
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Fetching..')
      FetchData();
    });
    return () => {
      unsubscribe;
    }
  }, [navigation]);

  // if (isFocused){
  //   async function FetchData () {
  //     await createTables();
  //     await getNotes();
  //   }
  //   console.log('Fetching..')
  //   FetchData()
  // }


   const renderRow = useCallback(({data, active}) => {
     return <Row data={data} active={active} />;
   }, []);
 
   return (
    // <View style={styles.container}>
        <Layout style={styles.container}>
       <SortableList
         style={styles.list}
         contentContainerStyle={styles.contentContainer}
         data={DATA}
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