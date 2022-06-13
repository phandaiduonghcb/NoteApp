import React from 'react';
import {Alert,Pressable,StyleSheet ,Dimensions} from 'react-native';
import {Input, Button, Divider, Icon, Text, TopNavigation, TopNavigationAction,Tab, TabBar ,BottomNavigation, BottomNavigationTab,Layout, Menu,  MenuItem,OverflowMenu  } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

// var AntDesignICon = require('react-native-vector-icons/AntDesign')
const PinIcon = (props) => (
  <Icon {...props}  name='pin' pack='material' />
  
);
const UnPinIcon = (props) => 
(
  <Icon {...props} name='pin-off' pack='material' />
)
const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const BellIcon = (props) => (
  <Icon {...props} name='bell-outline'/>
);
const DotsVeticalIcon = (props) => (
 <Icon {...props} name='dots-vertical' pack='material'/>
);
const PersonIcon = (props) => (
  <Icon {...props} name='person-outline'/>
);
const AddIcon = (props) => (
  <Icon {...props} name='plus-square-outline'/>
);
const EmailIcon = (props) => (
  <Icon {...props} name='email-outline'/>
);
const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const useTabBarState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};
const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const NoteScreen = ({ navigation, route }) => {
  // const topState = useTabBarState();
  const find_dimesions = (layout)=>{
    const {x, y, width, height} = layout;
    console.warn(x);
    console.warn(y);
    console.warn(width);
    console.warn(height);
    return height;
  };
  const [EditTextState,setEditTextState] = React.useState("Thời gian chỉnh sửa note");
  const [PinState,setPinSate] = React.useState(false);
  const TitleState = useInputState();
  const NoteState = useInputState();
  const topState = useBottomNavigationState();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={DotsVeticalIcon} onPress={toggleMenu}/>
  );
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>

  );
 
  const renderRightTopNavigationAction = () =>
  (
    <React.Fragment >
    <TopNavigationAction icon={PinState ? PinIcon : UnPinIcon} onPress={() => setPinSate(!PinState)}/>
    <TopNavigationAction icon={BellIcon } onPress={() => console.log("fadf")}/>
    </React.Fragment>
   
   
  );

  
    return (
     <Layout style={{flex: 1, flexDirection: 'column',}}>

     
      {/* <React.Fragment> */}

        <TopNavigation style={{height:10,flexBasis:10}} accessoryLeft={BackAction} accessoryRight={renderRightTopNavigationAction}/>
      
      {/* <Divider/> */}
      <ScrollView style={{height:windowHeight}}>
        <Input
          style={{padding: 10,fontSize:50,flex:1}}
          multiline={true}
          // textStyle={{ minHeight: 50 }}
          placeholder='Title'
          {...TitleState}
        />
       
          <Input
        style={{ padding: 10,}}
      
          multiline={true}
          placeholder='Note'
          {...NoteState}
        />

        </ScrollView>
        
     <Divider/>
        <BottomNavigation style={{ height:10}} {...topState}>
          <BottomNavigationTab  style={{minWidth:20}}icon={AddIcon} />
          <Text style={{margin: 2,}} >{EditTextState} </Text>
          <OverflowMenu style={{flex: 1,    margin: 8,}} anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
            <MenuItem accessoryLeft={BellIcon} title='fdasfjh' onPress={() => (setMenuVisible(!toggleMenu))}></MenuItem>
          </OverflowMenu >
          
        </BottomNavigation>
      {/* </React.Fragment> */}
    
      </Layout>

    )
}

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 10,
  },
});

export default NoteScreen