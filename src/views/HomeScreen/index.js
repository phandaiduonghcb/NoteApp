import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Layout,
  useTheme,
  Text
} from '@ui-kitten/components';
import NoteCard from '../../components/noteCard';
import SearchBar from '../../components/searchBar'
import NoteSortableList from '../../components/noteSortableList';
import BottomBar from '../../components/bottomBar'
import ThemedActionButton from '../../components/themedActionButton'
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
//   const [count, setCount] = React.useState(0)
//   React.useEffect(() => {
//     navigation.addListener(
//         'focus',
//         payload => {
//             setCount(count+1)
//             console.log(count)
//         }
//     );
// }, [])
  return (
    // <Layout>
    //   {/* <View style={styles.container}> */}
    //     <SearchBar navigation={navigation} />
    //     {/* <Layout style={styles.layoutContainer} level='4'>
    //       <NoteCard style={styles.card} content='akjsndakljnsdkjnasd'></NoteCard>
    //       <NoteCard style={styles.card} content='akjasdasdddddddddddddsn'></NoteCard>
    //       <NoteCard style={styles.card} content='andjk'></NoteCard>
    //       <NoteCard style={styles.card} content='akjsndakljnsdkjnasd'></NoteCard>
    //       <NoteCard style={styles.card} content='akjasdasdddddddddddddsn'></NoteCard>
    //       <NoteCard style={styles.card} content='akjsndakljnsdkjnasd'></NoteCard>
    //       <NoteCard style={styles.card} content='akjasdasdddddddddddddsn'></NoteCard>
    //       <NoteCard style={styles.card} content='andjk'></NoteCard>
    //       <NoteCard style={styles.card} content='andjk'></NoteCard>
    //       <NoteCard style={styles.card} content='duong'></NoteCard>
    //     </Layout> */}
    //   {/* </View> */}
    // </Layout>
    <>
    <Layout>
      <SearchBar navigation={navigation} />
    </Layout>
      <NoteSortableList />
      <BottomBar></BottomBar>
      <ThemedActionButton navigation={navigation} />
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

export default HomeScreen