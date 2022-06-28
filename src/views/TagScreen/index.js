import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View, FlatList } from 'react-native';
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
  const AddInput = ({ tag }) => {
    const renderLeftItemButton = (props) => {
      return (
        <Button
          size="medium"
          appearance='ghost'
          status='primary'
          accessoryLeft={<Icon {...props} name='plus-outline' />}
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
          onChangeText={nextValue => setIValue(nextValue)}
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
        <Button
          size="medium"
          appearance='ghost'
          status='primary'
          accessoryLeft={<Icon {...props} name='trash-2-outline' />}
          onPress={() => {
            deleteTag(item.tag)
          }}
        >
        </Button>
      )
    }
    const [ivalue, setIValue] = React.useState(item.tag)
    // const [iactivte, setIActive] = React.useState('')
    return (
      <View>
        <Input
          multiline={true}
          onBlur={() => {
            if (ivalue != item.tag){
              deleteTag(item.tag)
              console.log('------')
              addTag(ivalue,item.ids)
            }
          }}
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
          if (len==0) setTags([])
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
  const addTag = (tag,ids='') => {
    if (tag=='') {
      alert("Enter tag");
      return false;
    }

    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO tags (tag,ids) VALUES (?,?)`,
        [tag,ids],
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
    <Layout style={{height: '100%'}}>
      <KeyboardAvoidingView>
        <FlatList
          removeClippedSubviews={false}
          data={tags}
          renderItem={renderItem}
          keyExtractor={item => item.tag}
          ListHeaderComponent={getHeader}
        />
      </KeyboardAvoidingView>
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