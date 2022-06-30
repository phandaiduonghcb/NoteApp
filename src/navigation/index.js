import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Divider, Layout } from '@ui-kitten/components'
import HomeScreen from '../views/HomeScreen'
import TagScreen from '../views/TagScreen'
import NoteScreen from '../views/NoteScreen';
import ArchiveScreen from '../views/ArchiveScreen'
import ChooseTagScreen from '../views/ChooseTagScreen'

import { Drawer, DrawerItem, IndexPath, Icon, DrawerGroup } from '@ui-kitten/components'

import {
  useDrawerStatus,
  createDrawerNavigator,
} from '@react-navigation/drawer';

import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "rn_sqlite",
});


const NoteIcon = (props) => (
  <Icon {...props} name='credit-card' />
);


const TagIcon = (props) => (
  <Icon {...props} name='plus-square' />
);

const LabelIcon = (props) => (
  <Icon {...props} name='bookmark' />
);

const BellIcon = (props) => (
  <Icon {...props} name='bell' />
);

const ArhiveIcon = (props) => (
  <Icon {...props} name='archive' />
)


const Header = (props) => (
  <Layout style={{ paddingVertical: '10%', alignItems: 'center', justifyContent: 'center' }}>
    <Text category='h1'>My Note</Text>
    <Divider />
  </Layout>
);

const Footer = (props) => (
  <Layout style={{ paddingVertical: '10%' }}>
    {/* <Text category='h1'>This is Footer</Text>
    <Divider /> */}
  </Layout>
);


const DrawerContent = ({ navigation, state }) => {

  const nav = (navigation, index) => {
    // console.log(index)
    if (index.row == 0 && index.section == undefined) {
      navigation.navigate('Home')
    }
    else if (index.row == 1 && index.section == undefined) {
      // navigation.navigate('')
    }
    else if (index.section == undefined && index.row == 2) {
      //Ko lam gi het
      console.log('Group')
    }
    else if (index.row == 0 && index.section == 2) {
      navigation.navigate('Tag')
    }
    else if (index.row == 1 && index.section == 2) {

    }
    else if (index.row == 3 && index.section == undefined) {
      navigation.navigate('Archive')
    }
    
  }

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
            console.log("add tag,:",results);
            setTags(results)
          }
        },
        error => {
          console.log("error on getting tags " + error.message);
        },
      );
    });
  }
  console.log('Render drawer')
  const [tags, setTags] = React.useState([])

  const isDrawerOpen = useDrawerStatus() === 'open';
  React.useEffect(() => {
    async function FetchData() {
      await createTables();
      await getTags();
    }
    // FetchData();
    // setrenderTags_new(renderTags());
    // console.log("render moiw nhen: ",renderTags());
    // const unsubscribe = navigation.addListener('focus', () => {
    //   console.log('Fetching..')
    //   FetchData();
    // });
    // return () => {
    //   unsubscribe;
    // }
  }, [nav]);
  const renderTags = () => {
    console.log("noi dung tag",tags);
    return tags.map((item) => {
      return (
        <DrawerItem accessoryLeft={LabelIcon} title={item.tag} />
      );
    });
  }
  const [renderTags_new,setrenderTags_new] = React.useState([]);

  return (
    <Drawer
      header={Header}
      footer={Footer}
      selectedIndex={new IndexPath(state.index)}
      onSelect={index => { nav(navigation, index) }}>
      <DrawerItem accessoryLeft={NoteIcon} title='Home' />
      <DrawerItem accessoryLeft={BellIcon} title='Alarm' />
      <DrawerGroup accessoryLeft={TagIcon} title='Tag Group'>
        <DrawerItem accessoryLeft={TagIcon} title='Add Tag' />
        {renderTags()}
      </DrawerGroup>
      <DrawerItem accessoryLeft={ArhiveIcon} title='Archive' />
    </Drawer>
  )
}

const { Navigator, Screen } = createDrawerNavigator();

function MyDrawer() {
  return (
    <Navigator
      useLegacyImplementation
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Screen name="Tag" component={TagScreen} options={{ headerShown: false }} />
      <Screen name="Note" component={NoteScreen} options={{ headerShown: false }} />
      <Screen name="Archive" component={ArchiveScreen} options={{ headerShown: false }} />
      <Screen name="ChooseTag" component={ChooseTagScreen} options={{ headerShown: false }} />
    </Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
