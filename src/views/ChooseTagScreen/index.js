import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View, FlatList } from 'react-native';
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


const ChooseTagScreen = ({ navigation }) => {

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
            // let tempTags = []
            // tags.forEach(item => {
            //   if (item.tag.startsWith(nextValue)) {
            //     tempTags.push(JSON.parse(JSON.stringify(item)))
            //   }
            // });

            // setTags(tempTags)
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
          style={{marginRight:'6%'}}
          checked={checked}
          onChange={nextChecked => setChecked(nextChecked)}>
        </CheckBox>
      );

    }
    const theme = useTheme();
    const [checked, setChecked] = React.useState(false);
    const [ivalue, setIValue] = React.useState(item.tag)
    // const [iactivte, setIActive] = React.useState('')
    return (
      <View>
        <Input
          textStyle={{ color: theme['color-basic-1100'] }}
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
  const addTag = (tag) => {
    if (tag == '') {
      alert("Enter tag");
      return false;
    }

    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM tags ORDER BY tag DESC`,
        [],
        (sqlTxn, res) => {
          console.log("tags retrieved successfully");
          let len = res.rows.length;
          console.log('Number of records:', len)
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              if (item.tag == tag) {
                alert('Tag already exists')
                return false;
              }
            }
          }
        },
        error => {
          console.log("error on getting tags " + error.message);
        },
      );
    });
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO tags (tag,ids) VALUES (?,?)`,
        [tag, ''],
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
    <Layout>
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

export default ChooseTagScreen