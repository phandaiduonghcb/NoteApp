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
  const { active, data } = props;

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
 
 const NoteSortableList = ({navigation, search ,checkAlarm=false,ids,tag}) => {
  // console.log("tag laf gif ", tag);
  // console.log("ids: ",ids);
  const [DATA, setDATA] = React.useState({1:""});
  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, alarm TEXT)`,
        [],
        (sqlTxn, res) => {
          // console.log("table created successfully");
        },
        error => {
          // console.log("error on creating table " + error.message);
        },
      );
    });
  };
  const getNote = (id) => {
    var data = {};
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM notes where id = ?',
        [id],
        (txn,result) => {
          console.log("co id nhen",id);
          var len = result.rows.length;
          if (len > 0)
          {
              data = { title: item.title, body: item.body, alarm: item.alarm ,tag : tag};
              // console.log("data moi",data);
          }
         
        }
      )
    })
  
    return data;
  };
  const getNotes = (search) => {
    if (checkAlarm==false)
    {
    
        db.transaction(txn => {
          txn.executeSql(
            `SELECT * FROM notes ORDER BY id DESC`,
            [],
            (sqlTxn, res) => {
              console.log("notes retrieved successfully");
              let len = res.rows.length;
              var checkIds = undefined
              if (ids != undefined)
              {
                
                checkIds = ids.split(",");
               
              }
              
              console.log(checkIds);
              console.log('Number of records:', len)
              if (len > 0) {
                let results = {};
                for (let i = 0; i < len; i++) {
                  let item = res.rows.item(i);
                  // Loc du lieu o day
                  if (tag == undefined)
                  {
                  const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase()
                  const textData = search.toUpperCase()
                    if (itemData.indexOf(textData) > -1)
                    {
                      
                        results[item.id] = { title: item.title, body: item.body, alarm: item.alarm };

                    }
                  }
                  else 
                  {
                    // console.log("khong vo duoc");
                    const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase()
                    const textData = search.toUpperCase()
                    // console.log("khong vo duoc");
                    if (itemData.indexOf(textData) > -1 )
                    {
                      if (checkIds.indexOf(String(item.id)) > -1)
                      {
                        console.log("chon");
                        results[item.id] = { title: item.title, body: item.body, alarm: item.alarm ,tag : tag};

                      }
                   
                    }

                  }
                  // else 
                  // {
               
                  // }
                }
                if (ids=="")
                {
                  setDATA({});
                }
                else 
                {
                 
                  setDATA(results);
                }
               
                }
               
              
              else {
                setDATA({});
                // console.log("Data, ", DATA);
              }
            },
            error => {
              // console.log("error on getting categories " + error.message);
            },
          );
        });
   
    
    }
    else 
    {
      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM notes where alarm is not null`,
          [],
          (sqlTxn, res) => {
            // console.log("notes retrieved successfully");
            let len = res.rows.length;
            // console.log('Number of records in Alarm:', len)
            if (len > 0) {
              let results = {};
              for (let i = 0; i < len; i++) {
                let item = res.rows.item(i);
                // Loc du lieu o day
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase()
                const textData = search.toUpperCase()
                if (itemData.indexOf(textData) > -1)
                  results[item.id] = { title: item.title, body: item.body, alarm: item.alarm };
              }
              setDATA(results)
              // console.log("Data in Alarm: ", DATA);
            }
            else {
              setDATA({});
              // console.log("Data in Alarm, ", DATA);
            }
          },
          error => {
            // console.log("error on getting categories " + error.message);
          },
        );
      });
    }

 
  }
 
  React.useEffect(() => {
    // console.log(search)
    async function FetchData (search) {
      await getNotes(search);
      
    }
    FetchData(search);
    // const unsubscribe = navigation.addListener('focus', () => {
    //   console.log('Fetching..') 
    //   FetchData(search);
    //   console.log("DATA",DATA);
    // });
    // return () => {
    //   unsubscribe;
    // }
  }, []);
  React.useEffect(() => {
    // console.log(search)
    async function FetchData (search) {
      await getNotes(search);
     
    }
    FetchData(search);
    // const unsubscribe = navigation.addListener('focus', () => {
    //   console.log('Fetching search..') 
    //   FetchData(search);
    //   console.log("DATA",DATA);
    // });
    // return () => {
    //   unsubscribe;
    // }
  }, [search]);
  React.useEffect(() => {
    async function FetchData(search) {
      await createTables();
      await getNotes(search);
    }
     
    FetchData(search); 
    // const unsubscribe = navigation.addListener('focus', () => {
    //   console.log('Fetching Tag..') 
    //   FetchData(search);
    //   console.log("DATA",DATA);
    // });
    // return () => {
    //   unsubscribe;
    // }
  }, [tag]);
  React.useEffect(() => {
    async function FetchData(search) {
      // await createTables();
      await getNotes(search);
     
    }
 
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Fetching navigation..') 
      FetchData(search);
      console.log("DATA",DATA);
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


  const renderRow = useCallback(({ data, active }) => {
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
        onPressRow={(index) => {
          console.log("chon note: ", index);
          if (checkAlarm==false)
          {
            navigation.navigate('Note', { id: index });
          }
          else 
          {
            navigation.navigate('Note', { id: index,checkAlarm:true });

          }
        }}
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
    height: window.height / 4,
    flex: 1,
    marginTop: '1%',
    marginBottom: '1%',
    borderRadius: 5,
    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },
      android: {
        width: window.width - window.width * 4 / 100,
        elevation: 0,
        marginHorizontal: '2%',
      },
    }),
  },
});

export default NoteSortableList