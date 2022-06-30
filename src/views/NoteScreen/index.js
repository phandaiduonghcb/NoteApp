import React from 'react';
import { Platform, KeyboardAvoidingView, ScrollView, Keyboard, Alert, Pressable, StyleSheet, Dimensions, BackHandler, useEffect, View } from 'react-native';
import { Input, Card, Modal, Layout, useTheme, Button, Divider, Icon, Text, TopNavigation, TopNavigationAction, Tab, TabBar, } from '@ui-kitten/components';
// import { ScrollView } from 'react-native-gesture-handler';
import BottomSheetAdd from '../../components/bottomSheetAdd';


import { Provider } from 'react-native-paper';
import BottomSettingNote from '../../components/bottomSettingNote';
import SelectDate from '../../components/selectDate';
// import RichTextEditor from '../../components/richTextEditor';

import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { openDatabase } from "react-native-sqlite-storage";

import moment from 'moment';

const db = openDatabase({
  name: "rn_sqlite",
});

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
  <Icon {...props} name='archive-check' pack='material' />
);

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const BellIcon = (props) => (
  <Icon {...props} name='bell-outline' />
);
const UnBellICon = (props) => (
  <Icon {...props} name='bell-off-outline' />
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
  <Icon {...props} name='mic-outline' />
);
const TaskIcon = (props) => (
  <Icon {...props} name='checkmark-square' />
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

let NOTE_BODY
let NOTE_TITLE
let NOTE_ALARM
let titleY;
const NoteScreen = ({ navigation,route}) => {
  const {id} = route.params;
  const [id_item,set_id_item] = React.useState(id);
  const [EditTextState, setEditTextState] = React.useState("Thời gian chỉnh sửa note");
  const [PinState, setPinSate] = React.useState(false); // State có ghim note hay không
  const [ArchiveState, setArchiveState] = React.useState(false); // State có thêm note và archive hay không
  // const TitleState = useInputState(); // State cho việc hiện title 
  // const NoteState = useInputState();
  // const topState = useBottomNavigationState();
  const [menuVisible, setMenuVisible] = React.useState(false);
  // const [showBottomSheetAdd, setshowBotoomSheetAdd] = React.useState(false);
  const [showBottomSettingNote, setshowBottomSettingNote] = React.useState(false);
  const [showSelectDate, setshowSelectDate] = React.useState(false);
  // State chhọn ngày và giờ 
  const [selectedDate, setSelectedDate] = React.useState(undefined);
  // const [datePickerVisible, setDatePickerVisible] = React.useState(false);
  // const [selectedTime, setSelectedTime] = React.useState();
  // const [timePickerVisible, setTimePickerVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const richText = React.useRef();
  
  const resetState = () => {
      setPinSate(false);
      setArchiveState(false);
      setTitle('');
      setMenuVisible(false);
      setshowBottomSettingNote(false);
      setshowSelectDate(false);
      setSelectedDate(undefined);
  };
  const converDateTime = (alarm) =>
  {
    moment.locale();
    return moment(alarm).format("DD/MMM/YYYY HH:MM");
  }
  const updateState = (item) => {
        setTitle(item.title);
        setSelectedDate(item.alarm == null ? undefined: new Date(item.alarm));

  }
  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  // const renderMenuAction = () => (
  //   <TopNavigationAction icon={DotsVeticalIcon} onPress={toggleMenu}/>
  // );
  const updateData = (id,title,alarm,body) => 
  {
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE notes set title = ? ,alarm = ?,body = ? where id = ?`,
        [title,alarm, body, id],
        (sqlTxn, res) => {
          console.log("id when update: ",id);
          console.log('Results', res.rowsAffected);
          if (res.rowsAffected > 0)
          {
            console.log("update thanh cong");

          }
          else 
          {
            console.log("update failed");
          }
        },
        error => {
          console.log("error on update data " + error.message);
        },
      );
    });
  };
  const Back= async () => {
   
      // console.log(NOTE_TITLE, NOTE_BODY)
      if (id == undefined)
      {
        console.log(NOTE_TITLE);
        if (title == NOTE_TITLE )
        {
          console.log("***\n add a item \n*****");
          // createTables()
          addNote(NOTE_TITLE, NOTE_BODY, selectedDate);
          setTitle('')
          NOTE_BODY=undefined;
          NOTE_TITLE=undefined;
          resetState();
          
        }
        // navigation.goBack();
          
      }
      else
      {
        if (NOTE_BODY==''){

        }
        updateData(id,title,selectedDate,NOTE_BODY);
        console.log("***\n update a item ",id);
        console.log("***");
      
        resetState();
      // getNotes();
    
    // navigation.push('Home');
  }
  navigation.goBack();

}
  // BackHandler.addEventListener("hardwareBackPress",Back);
  React.useEffect(() => {
    const backhandler = BackHandler.addEventListener("hardwareBackPress",Back);
    return () => backhandler.remove();
    // return false;
  });
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={Back} />

  );
  // const [category, setCategory] = useState("");
  // const [categories, setCategories] = useState([]);
  let notes = []

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, alarm TEXT)`,
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

  const addNote = (title, body, alarm) => {
    if (title == '' && body == '') {
      alert("Enter note");
      return false;
    }

    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO notes (title,body,alarm) VALUES (?,?,?)`,
        [title, body, alarm],
        (sqlTxn, res) => {
          console.log(`${title} note added successfully`);
        },
        error => {
          console.log("error on adding category " + error.message);
        },
      );
    });
  };
  const getNote = (id) => {
    
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM notes where id = ?',
        [id],
        (txn,result) => {
          console.log("co id nhen",id);
          var len = result.rows.length;
          if (len > 0)
          {
            console.log("****");
            console.log("co id nhen",id);
            console.log(result.rows.item(0));
            console.log(result.rows.item(0).title);
            console.log("date: ",converDateTime(result.rows.item(0).alarm));
            console.log("****");

            richText.current?.setContentHTML(result.rows.item(0).body)
            NOTE_BODY = result.rows.item(0).body
            
            // setTitle(result.rows.item(0).title);
            updateState(result.rows.item(0));

          }
          else 
          {
            richText.current?.setContentHTML('')
            NOTE_BODY=''
            console.log("nooooooooo id nhen");
            resetState();
          }
        }
      )
    })
  }
  
  React.useEffect(() => {
    async function FetchData (id) {
      // await createTables();
      // console.log("co id nhen",id);
      await getNote(id);
    }
    console.log("id", id);
    FetchData(id);
    // const unsubscribe = navigation.addListener('focus', () => {
    //   // resetState();
    //   console.log("------------")
    //   console.log('Fetching in NoteScreen..')
    //   console.log("id la: ", id);
    //   console.log("------------")
    //   FetchData();
    // });
    // return () => {
    //   unsubscribe;
    // }
  }, [route.params]);
 
  const renderRightTopNavigationAction = () =>
  (
    <React.Fragment >
      <TopNavigationAction icon={PinState ? PinIcon : UnPinIcon} onPress={() => setPinSate(!PinState)} />
      <TopNavigationAction icon={selectedDate== undefined ? UnBellICon : BellIcon} onPress={() => {
        console.log("select date",selectedDate);
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
          {/* <Input
            style={{ padding: 10, }}
            multiline={true}
            value={title}
            onChangeText={nextValue => {
              console.log(nextValue)
              setTitle(nextValue)}}
            placeholder='Title'
            {...TitleState}

            onLayout={event => {
              const layout = event.nativeEvent.layout;
              let titleY = layout.y
            }}
          /> */}
          <Input
            style={{ padding: 10, }}
            placeholder='Place your Text'
            value={title}
            multiline={true}
            onChangeText={nextValue => {
              setTitle(nextValue)
              NOTE_TITLE = nextValue
            }}
          />
          {/* chỗ nhập nội dung note   */}
          <RichTextEditor height={windowHeight * 75 / 100} richText={richText}/>
        </ScrollView>

        {/* <BottomNavigation style={{ height:10,flex: 1, flexDirection: 'row',}} {...topState}> */}
        <Layout style={{ flexDirection: 'row', }}>


          {/* <BottomNavigationTab icon={AddIcon} style={{width:5,alignItems:'center'}}/> */}
          <Button style={{ margin: 2, }} accessoryLeft={RecordingIcon} appearance='ghost' status='basic' size='large' onPress={() => console.log("Recording")}></Button>

          <Text style={{ flex: 1, textAlign: 'center', fontSize: 15, marginTop: 19, }} >{EditTextState} </Text>

          <Button style={{ margin: 2, }} accessoryLeft={DotsVeticalIcon} appearance='ghost' status='basic' size='large' onPress={() => setshowBottomSettingNote(true)} />

        </Layout>
        {/* </BottomNavigation> */}
        {/* </React.Fragment> */}
        {/* <BottomSheetAdd show={showBotoomSheetAdd} onDismiss={() => { setshowBotoomSheetAdd(false) }}></BottomSheetAdd> */}
        <BottomSettingNote show={showBottomSettingNote} onDismiss={() => setshowBottomSettingNote(false)} navigation={navigation} id={id}/>
        {/* <Text> {id} </Text> */}
        <SelectDate isVisible={showSelectDate} onBackButtonPress={() => setshowSelectDate(false)} onBackdropPress={() => setshowSelectDate(false)}
                  selectedDate={selectedDate} setSelectedDate={setSelectedDate} 
                    setIsVisible={setshowSelectDate}
            ></SelectDate>
                

      </Layout>
    </Provider>
  )
}

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});








let Y = 0
let HEIGHT = 0
let HTML = ''

const CameraIcon = (props) => (
  <Icon name='camera' {...props} />
);

const UploadIcon = (props) => (
  <Icon name='upload' {...props} />
);

const RichTextEditor = (props) => {
  let handleCursorPosition = React.useCallback((scrollY) => {
    // Positioning scroll bar
    scrollRef.current.scrollTo({ y: scrollY - 30, animated: true });
  }, [])

  const openCamera = (isCameraLaunched) => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
    }
    let result
    if (isCameraLaunched) {
      launchCamera(options, (response => {
        if (response.assets != undefined) {
          result = response.assets[0].base64
          // console.log(result)
          html = '<img src="data:image/png;base64,' + result + '" />'
          props.richText.current?.insertHTML(html)
          // a = count+1
          // setCount(a)
        }
      }));
    }
    else {
      launchImageLibrary(options, (response => {
        if (response.assets != undefined) {
          result = response.assets[0].base64
          // console.log(result)
          html = '<img src="data:image/png;base64,' + result + '" />'
          props.richText.current?.insertHTML(html)
          // a = count+1
          // setCount(a)
        }
      }));
    }
  }
  React.useEffect(() => {

    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {

      let keyBoardHeight = e.endCoordinates.height
      let maxY = windowHeight - keyBoardHeight
      let newHeight
      if (maxY < Y) {
        newHeight = HEIGHT - Math.round(Y - maxY) - 10
        setEHeight(newHeight - 130);
      }
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
      setKeyboardStatus("Keyboard Hidden");
      setEHeight(props.height)
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const theme = useTheme();

  const [keyboardStatus, setKeyboardStatus] = React.useState(undefined);
  const [eHeight, setEHeight] = React.useState(props.height);
  // const richText = React.useRef();
  const scrollRef = React.useRef()
  const [visible, setVisible] = React.useState(false);

  return (
    <Layout style={{ height: eHeight, marginHorizontal: '3%' }}
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        Y = (layout.y + layout.height)
        HEIGHT = layout.height
      }}
    >
      <ScrollView ref={scrollRef}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <RichEditor

            ref={props.richText}
            onChange={descriptionText => {
              NOTE_BODY = descriptionText
              // console.log("descriptionText:", descriptionText);
              // if (descriptionText != ''){
              //     HTML = descriptionText;
              // }
            }}
            placeholder={'Type your note here!'}
            onCursorPosition={handleCursorPosition}
            onFocus={handleCursorPosition}
            editorStyle={{ backgroundColor: theme['background-basic-color-2'], color: theme["text-basic-color"] }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <RichToolbar
        editor={props.richText}
        iconTint={theme['color-primary-500']}
        selectedIconTint={theme['color-danger-500']}
        actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.insertImage, 'exitKeyboard']}
        onPressAddImage={() => {
          // openCamera()
          setVisible(true)
          // scrollRef.current.scrollTo({ y: 0, animated: true });
          // richText.current?.commandDOM(`document.execCommand('insertHTML', false, "<br/>diaskdja")`);
        }}
        iconMap={{ exitKeyboard: (tintColor) => (<Text style={[{ color: theme['color-primary-500'] }]}>X</Text>), }}
        exitKeyboard={() => props.richText.current?.dismissKeyboard()}
      />
      {/* <Text>{keyboardStatus}</Text> */}
      {/* <View style={styles.container}> */}
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Button accessoryLeft={CameraIcon} onPress={() => {
            setVisible(false)
            openCamera(true)
          }}>
            Take a photo
          </Button>
          <Divider style={{ marginVertical: '2%' }} />
          <Button accessoryLeft={UploadIcon} onPress={() => {
            setVisible(false)
            openCamera(false)
          }}>
            Choose from libary
          </Button>
        </Card>
      </Modal>
    </Layout>
  )
}



export default NoteScreen