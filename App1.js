import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import  {Input} from '@ui-kitten/components'
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "rn_sqlite",
});
const ChooseTagScreen = () => {
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
          if (len == 0) setTags([])
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
  const Item = ({ tag }) => (
    <View style={styles.item}>
      <Text style={styles.tag}>{tag}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item tag={item.tag} />
  );
  React.useEffect(() => {
    async function FetchData() {
      await createTables();
      await getTags();
    }
    FetchData()
    return () => {

    }
  }, [])
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
    else{
      setFilteredData(masterData)
      setSearch(text)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Input
          value={search}
          onChangeText={text => searchFilter(text)}
        ></Input>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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