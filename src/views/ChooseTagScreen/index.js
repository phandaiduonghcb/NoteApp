import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar } from 'react-native';
import {
  useTheme,
  Icon, Text, Input, Button, CheckBox,
  Layout,
  TopNavigation, TopNavigationAction
} from '@ui-kitten/components';
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "rn_sqlite",
});

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const ChooseTagScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [filteredData, setFilteredData] = React.useState([])
  const [masterData, setMasterData] = React.useState([])
  const [search, setSearch] = React.useState('')
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
  const deleteTag = (tag) => {
    db.transaction(txn => {
      txn.executeSql(
        `DELETE FROM tags WHERE tag=(?)`,
        [tag],
        (sqlTxn, res) => {
          console.log(`${tag} tag deleted successfully`);
          console.log(tags)
          getTags();
        },
        error => {
          console.log("error on deleting tag " + error.message);
        },
      );
    });
  }
  const getTags = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM tags ORDER BY tag DESC`,
        [],
        (sqlTxn, res) => {
          console.log("tags retrieved successfully");
          let len = res.rows.length;
          console.log('Number of records:', len)
          if (len == 0) setFilteredData([])
          if (len > 0) {
            let results = []
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item)
            }
            console.log(results)
            setFilteredData(results)
            setMasterData(results)
          }
        },
        error => {
          console.log("error on getting tags " + error.message);
        },
      );
    });
  }
  const addTag = (tag, ids = '') => {
    if (tag == '') {
      alert("Enter tag");
      return false;
    }

    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO tags (tag,ids) VALUES (?,?)`,
        [tag, ids],
        (sqlTxn, res) => {
          console.log(`${tag} tag added successfully`);
        },
        error => {
          console.log("error on adding tag " + error.message);
        },
      );
    });
    getTags();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => {
      navigation.goBack()
    }} />
  );
  const renderItem = ({ item }) => (
    <Item item={item} />
  );
  const renderLeftAddButton = (props) => {
    return (
      <Button
        size="medium"
        appearance='ghost'
        status='primary'
        accessoryLeft={<Icon {...props} name='search-outline' />}
      >
      </Button>
    )
  }
  const renderRightAddButton = (props) => {
    return (
      <Button
        size="medium"
        appearance='ghost'
        status='primary'
        accessoryLeft={<Icon {...props} name='checkmark-outline' />}
        onPress={() => {
          addTag(search)
        }}
      >
      </Button>
    )
  }
  const Item = ({ item }) => {
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
    const renderRightItemButton = (props) => {

      return (
        <CheckBox
          style={{ marginRight: '6%' }}
          checked={checked}
          onChange={nextChecked => {
            setChecked(nextChecked)
            console.log(checked)
            modifyTagIds(item, id, checked)
          }}>
        </CheckBox>
      );

    }
    const modifyTagIds = (tagItem, noteId, checked) => {
      let ids = tagItem.ids
      let resultIds
      if (!checked) {
        if (item.ids == '') {
          resultIds = String(noteId)
        }
        else {
          let idArray = item.ids.split(',')
          idArray.push(noteId)
          resultIds = idArray.toString()
        }
      }
      else {
        let idArray = item.ids.split(',')
        let i = idArray.indexOf(String(id))
        idArray.splice(i, 1);
        resultIds = idArray.toString()
      }
      deleteTag(item.tag)
      addTag(item.tag, resultIds)
    }
    const theme = useTheme();
    let initialValue
    if (item.ids == '') {
      initialValue = false;
    }
    else {
      initialValue = item.ids.split(',').indexOf(String(id)) != -1
    }
    const [checked, setChecked] = React.useState(initialValue);
    const [ivalue, setIValue] = React.useState(item.tag)

    // const [iactivte, setIActive] = React.useState('')
    return (
      <View>
        <Input
          textStyle={{ color: theme['text-basic-color'] }}
          disabled={true}
          multiline={true}
          size="medium"
          value={ivalue}
          accessoryLeft={renderLeftItemButton}
          accessoryRight={renderRightItemButton}
          onChangeText={nextValue => setIValue(nextValue)}
        />
      </View >
    )
  }
  React.useEffect(() => {
    async function FetchData() {
      await createTables();
      await getTags();
    }
    FetchData()
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Fetching..')
      FetchData();
    });
    return () => {
      unsubscribe;
    }
  }, [navigation]);
  console.log(filteredData)
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.tag ? item.tag.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      }
      )
      setFilteredData(newData)
      setSearch(text)
    }
    else {
      setFilteredData(masterData)
      setSearch(text)
    }
  }
  return (
    <Layout style={styles.container}>
      <View>
        <TopNavigation
          accessoryLeft={BackAction}
          title='Modify tags'
          placeholder='Add a tag here!'
        />

        <Input
          accessoryLeft={renderLeftAddButton}
          accessoryRight={renderRightAddButton}
          value={search}
          onChangeText={text => searchFilter(text)}
        ></Input>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  tag: {
    fontSize: 32,
  },
});

export default ChooseTagScreen;