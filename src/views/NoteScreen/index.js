import React from 'react';
import { Alert, Pressable, StyleSheet, Dimensions, SafeAreaView, View } from 'react-native';
import { Input, Button, Divider, Icon, Text, TopNavigation, TopNavigationAction, Tab, TabBar, BottomNavigation, BottomNavigationTab, Layout, Menu, MenuItem, OverflowMenu } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheetAdd from '../../components/bottomSheetAdd';

import { Provider } from 'react-native-paper';
import BottomSettingNote from '../../components/bottomSettingNote';
import SelectDate from '../../components/selectDate';
import RichTextEditor from '../../components/richTextEditor';

// var AntDesignICon = require('react-native-vector-icons/AntDesign')
const PinIcon = (props) => (
  <Icon {...props} name='pin' pack='material' />

);
const UnPinIcon = (props) =>
(
  <Icon {...props} name='pin-off' pack='material' />
)
const ArchiveIcon = (props) =>
(
  <Icon {...props} name='archive-arrow-down' pack='material' />
);
const UnArchiveIcon = (props) =>
(
  <Icon {...props} name='archive-arrow-up' pack='material' />
);

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const BellIcon = (props) => (
  <Icon {...props} name='bell-outline' />
);
const DotsVeticalIcon = (props) => (
  <Icon {...props} name='dots-vertical' pack='material' />
);
const PersonIcon = (props) => (
  <Icon {...props} name='person-outline' />
);
const AddIcon = (props) => (
  <Icon {...props} name='plus-square-outline' />
);
const EmailIcon = (props) => (
  <Icon {...props} name='email-outline' />
);
const RecordingIcon = (props) =>
(
    <Icon {...props} name='mic-outline'/>
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
 
  const [EditTextState, setEditTextState] = React.useState("Thời gian chỉnh sửa note");
  const [PinState, setPinSate] = React.useState(false); // State có ghim note hay không
  const [ArchiveState, setArchiveState] = React.useState(false); // State có thêm note và archive hay không
  const TitleState = useInputState(); // State cho việc hiện title 
  // const NoteState = useInputState();
  // const topState = useBottomNavigationState();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [showBottomSheetAdd, setshowBotoomSheetAdd] = React.useState(false);
  const [showBottomSettingNote, setshowBottomSettingNote] = React.useState(false);
  const [showSelectDate, setshowSelectDate] = React.useState(false);
  // State chhọn ngày và giờ 
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  // const [datePickerVisible, setDatePickerVisible] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState(new Date());
  // const [timePickerVisible, setTimePickerVisible] = React.useState(false);
  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // const renderMenuAction = () => (
  //   <TopNavigationAction icon={DotsVeticalIcon} onPress={toggleMenu}/>
  // );
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />

  );

  const renderRightTopNavigationAction = () =>
  (
    <React.Fragment >
      <TopNavigationAction icon={PinState ? PinIcon : UnPinIcon} onPress={() => setPinSate(!PinState)} />
      <TopNavigationAction icon={BellIcon} onPress={() => {
        console.log("select date");
        setshowSelectDate(!showSelectDate);

      }} />
      <TopNavigationAction icon={ArchiveState ? UnArchiveIcon : ArchiveIcon} onPress={() => setArchiveState(!ArchiveState)} />
    </React.Fragment>


  );



  return (
    <Provider>


      <Layout style={{ flex: 1, flexDirection: 'column', }}>


        {/* <React.Fragment> */}

        <TopNavigation style={{ height: 10, flexBasis: 10 }} accessoryLeft={BackAction} accessoryRight={renderRightTopNavigationAction} />

        {/* <Divider/> */}
        <ScrollView style={{ height: windowHeight }}>
          <Input
            style={{ padding: 10, }}
            multiline={true}

            placeholder='Title'
            {...TitleState}

            onLayout={event => {
              const layout = event.nativeEvent.layout;
              titleY = layout.y
            }}
          />
          {/* chỗ nhập nội dung note   */}
          <RichTextEditor height={windowHeight*75/100} />
        </ScrollView>

        {/* <BottomNavigation style={{ height:10,flex: 1, flexDirection: 'row',}} {...topState}> */}
        <Layout style={{ flexDirection: 'row', }}>


          {/* <BottomNavigationTab icon={AddIcon} style={{width:5,alignItems:'center'}}/> */}
          <Button style={{ margin: 2, }} accessoryLeft={RecordingIcon} appearance='ghost' status='basic' size='large' onPress={()=> console.log("Recording")}></Button>

          <Text style={{ flex: 1, textAlign: 'center', fontSize: 15, marginTop: 19, }} >{EditTextState} </Text>

          <Button style={{ margin: 2, }} accessoryLeft={DotsVeticalIcon} appearance='ghost' status='basic' size='large' onPress={() => setshowBottomSettingNote(true)} />

        </Layout>
        {/* </BottomNavigation> */}
        {/* </React.Fragment> */}
        {/* <BottomSheetAdd show={showBotoomSheetAdd} onDismiss={() => { setshowBotoomSheetAdd(false) }}></BottomSheetAdd> */}
        <BottomSettingNote show={showBottomSettingNote} onDismiss={() => setshowBottomSettingNote(false)} />

        <SelectDate isVisible={showSelectDate} onBackButtonPress={() => setshowSelectDate(false)} onBackdropPress={() => setshowSelectDate(false)}
                  date={selectedDate} time={selectedTime} 
            
            ></SelectDate>
                {/* <Text> {selectedDate.toLocaleDateString()} </Text> */}

      </Layout>
    </Provider>
  )
}

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 10,
  },
});

export default NoteScreen