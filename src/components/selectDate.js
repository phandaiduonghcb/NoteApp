import { IndexPath,Layout, Text,Select,SelectItem,Datepicker, Button,  } from "@ui-kitten/components";
import React, { useState } from "react";
import {  StyleSheet} from "react-native";
import Modal from "react-native-modal";
import DateTimePickerModal from 'react-native-modal-datetime-picker';



const  SelectDate= (props) => {


  // const [date, setDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  // const [selectedTime, setSelectedTime] = useState(props.time);
  // const [timePickerVisible, setTimePickerVisible] = useState(false);
  // console.log(selectedDate == undefined ? "ko hien" : 'hien');
  const [isVisibleDelete,setisVisibleDelete] = useState(selectedDate == undefined ? true: false); 

  // console.log(isVisibleDelete);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    
  };

  // const showTimePicker = () => {
  //   setTimePickerVisible(true);
  // };

  // const hideTimePicker = () => {
  //   setTimePickerVisible(false);
  // };

  // const handleConfirmTime = (date) => {
  //   setSelectedTime(date);
  //   hideTimePicker();
  // };
  const handleSave =() =>
  {
    props.setSelectedDate(selectedDate);
    setisVisibleDelete(!isVisibleDelete);
    props.setIsVisible(false);
  }
  const handleDelete = () =>
  {
    setSelectedDate(undefined);
    // props.setselectedDate();
    // props.setIsVisible(false);
    props.setSelectedDate(undefined);
    // setisVisibleDelete(!isVisibleDelete);
    setisVisibleDelete(!isVisibleDelete);
    props.setIsVisible(false);

  }
  return (
    
    <Layout>
      <Modal isVisible={props.isVisible} onBackButtonPress={props.onBackButtonPress} onBackdropPress={props.onBackdropPress} style={{ }}>
        <Layout style={styles.layout}>
        <Text style={{margin: 10, textAlign: "center"}} status='basic' category='h4'> Add reminder</Text>
        {/* <Text style={{margin: 10, textAlign: "center"}} status='danger' category='h4'> Add a time</Text> */}
        <Text category='s1' >
        Seleted time: {selectedDate ? selectedDate.toLocaleString() : 'No date selected'}
        </Text>
      <Button style={{ margin: 10}}  onPress={showDatePicker}> Select a date</Button>
      <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
         {/* <Text category='h6'> */}
        {/* Seleted time: {props.selectedTime ? props.selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No date selected'}
        </Text>
      <Button style={{ margin: 2,}} onPress={showTimePicker}> Select a time</Button>
      <DateTimePickerModal
          date={props.selectedDate ? props.selectedTime : new Date(props.selectedDate)}
          isVisible={timePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
        /> */}
        <Layout style={{flexDirection:'row',marginTop:10}}>
          
            <Button style={{margin:5}} appearance='ghost' status='success' disabled={selectedDate == undefined ? true : false} onPress={handleDelete}>Delete</Button>
            <Button style={{margin:5}} appearance='ghost' status='basic' onPress={() => props.setIsVisible(false)}>Cancel</Button>
            <Button style={{margin:5}} appearance='ghost' status='info' onPress={handleSave}>Save</Button>
            
        </Layout>
         {/* <Text> {selectedDate.toLocaleDateString()} </Text> */}
        </Layout>
        
      </Modal>
    
    </Layout>
    
  );
};
const styles = StyleSheet.create({
  layoutModal:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  layout:{
    // height:500,
    flexDirection:'column',
    margin: 20,
    // backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});  
export default SelectDate;