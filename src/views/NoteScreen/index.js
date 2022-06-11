import React from 'react';
import {Alert,Pressable,StyleSheet } from 'react-native';
import {Input, Button, Divider, Icon, Text, TopNavigation, TopNavigationAction,Tab, TabBar ,BottomNavigation, BottomNavigationTab, Layout } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const BellIcon = (props) => (
  <Icon {...props} name='bell-outline'/>
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

const NoteScreen = () => {
  // const topState = useTabBarState();
  const TitleState = useInputState();
  const NoteState = useInputState();

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon}/>

  );
  const topState = useBottomNavigationState();
  const renderRightTopNavigationAction = () =>
  (
    
    <TopNavigationAction icon={BellIcon}/>
      
    
  );

  
    return (
      <Layout>
      <React.Fragment>
        <TopNavigation accessoryLeft={BackAction} accessoryRight={renderRightTopNavigationAction}/>
        

      <Divider/>
      <Input
        
        multiline={true}
        textStyle={{ minHeight: 50 }}
        placeholder='Title'
        {...TitleState}
      />
      <Divider/>
      <Input
       style={{flex:1}}
        multiline={true}
        textStyle={{minHeight: 999 }}
        placeholder='Multiline'
        {...NoteState}
      />
    
      <BottomNavigation style={{minHeight:50}} {...topState}>
        <BottomNavigationTab style={{width:'50%'}} icon={AddIcon} />
        <BottomNavigationTab style={{width:'50%'}} icon={EmailIcon}/>
      </BottomNavigation>
      </React.Fragment>
    
  </Layout>

    )
}

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 10,
  },
});

export default NoteScreen