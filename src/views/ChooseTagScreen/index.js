import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View, FlatList, ScrollView } from 'react-native';
import {
  useTheme,
  Icon, Text, Input, Button, CheckBox,
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


const ChooseTagScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => {
      // navigation.goBack()
      navigation.navigate('Note',{id: id});
    }} />
  );
  const AddInput = ({ tag }) => {
    const renderLeftItemButton = (props) => {
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
    const renderRightItemButton = (props) => {
      return (
        <Button
          size="medium"
          appearance='ghost'
          status='primary'
          accessoryLeft={<Icon {...props} name='checkmark-outline' />}
          onPress={() => {
            addTag(ivalue)
          }}
        >
        </Button>
      )
    }
    const [ivalue, setIValue] = React.useState(tag)
    // const [iactivte, setIActive] = React.useState('')
    return (
      <View>
        <Input
          placeholder="Enter tag here..."
          multiline={true}
          size="medium"
          value={ivalue}
          accessoryLeft={renderLeftItemButton}
          accessoryRight={renderRightItemButton}
          onChangeText={nextValue => {
            setIValue(nextValue)
          }}
        />
      </View >
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
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  const [tags, setTags] = React.useState([])
  const OriginalTags = JSON.parse(JSON.stringify(tags))

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
          if (len == 0) setTags([])
          if (len > 0) {
            let results = []
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item)
            }
            console.log(results)
            setTags(results)
          }
        },
        error => {
          console.log("error on getting tags " + error.message);
        },
      );
    });
  }
  const addTag = (tag,ids='') => {
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

  const getHeader = () => {
    return (
      <>
        <TopNavigation
          accessoryLeft={BackAction}
          title='Modify tags'
          placeholder='Add a tag here!'
        />
        <AddInput tag='' ></AddInput>
      </>
    )
  }

  return (
    <>
      <Layout>{getHeader()}</Layout>
      <Layout style={{ height: '100%' }}>
        {/* {getHeader()} */}
        <KeyboardAvoidingView>
          <FlatList
            contentContainerStyle={{ paddingBottom: '50%' }}
            removeClippedSubviews={false}
            data={tags}
            renderItem={renderItem}
            keyExtractor={item => item.tag}
          />
        </KeyboardAvoidingView>
      </Layout>
    </>
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

export default ChooseTagScreen