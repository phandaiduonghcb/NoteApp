import React from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, FlatList } from 'react-native';
import {
  Icon, Text, Input, Button,
  Layout,
  TopNavigation, TopNavigationAction
} from '@ui-kitten/components';
import SearchBar from '../../components/searchBar'
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "rn_sqlite",
});

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);


const TAGS = [
  { tag: 'ai', ids: '1,2,3' },
  { tag: 'didong', ids: '3,4,5' },
]

const TagScreen = ({ navigation }) => {

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => {
      navigation.goBack()
    }} />
  );

  const renderLeftAddButton = (props) => (
    <Button
      size="medium"
      appearance='ghost'
      status='primary'
      accessoryLeft={<Icon {...props} name={value != '' ? 'close-outline' : 'plus-outline'} />}
      onPress={() => {
        if (value != '') {
          setValue("")
        }
      }}>
    </Button>
  );

  const renderRightAddButton = (props) => (
    <Button
      accessoryLeft={<Icon {...props} name='checkmark' />}
      appearance='ghost'
      status='primary'
      onPress={() => {

      }}
    >
    </Button>
  );

  const Item = ({ tag }) => {
    const renderLeftItemButton = (props) => {
      return (
        <Button
          size="medium"
          appearance='ghost'
          status='primary'
          accessoryLeft={<Icon {...props} name='bookmark-outline' />}
          >
        </Button>
      )
    }
    const [ivalue, setIValue] = React.useState(tag)
    // const [iactivte, setIActive] = React.useState('')
    return (
      <View>
        <Input
          multiline={true}
          size="medium"
          value={ivalue}
          accessoryLeft={renderLeftItemButton}
          accessoryRight={renderRightAddButton}
          onChangeText={nextValue => setIValue(nextValue)}
        />
      </View >
    )
  }
  const renderItem = ({ item }) => (
    <Item tag={item.tag} />
  );


  const [value, setValue] = React.useState('');
  const [tags, setTags] = React.useState({})

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS tags (tag TEXT PRIMARY KEY, ids TEXT)`,
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
  const getTags = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM tags ORDER BY tag DESC`,
        [],
        (sqlTxn, res) => {
          console.log("tags retrieved successfully");
          let len = res.rows.length;
          console.log('Number of records:', len)
          if (len > 0) {
            let results = {};
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results[item.id] = { title: item.title, body: item.body, alarm: item.alarm };
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
    async function FetchData() {
      await createTables();
      await getTags();
    }

    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Fetching..')
      FetchData();
    });
    return () => {
      unsubscribe;
    }
  }, [navigation]);

  return (
    <Layout>
      <TopNavigation
        accessoryLeft={BackAction}
        title='Modify tags'
        placeholder='Add a tag here!'
      />
      <ScrollView style={{ height: '100%' }}>
        <Input
          multiline={true}
          size="medium"
          value={value}
          accessoryLeft={renderLeftAddButton}
          accessoryRight={renderRightAddButton}
          onChangeText={nextValue => setValue(nextValue)}
        />
        <FlatList
          data={TAGS}
          renderItem={renderItem}
          keyExtractor={item => item.tag}
        />
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  layoutContainer: {
    padding: "2%",
    flexDirection: 'column'
  },
  card: {
    margin: 1
  },
});

export default TagScreen