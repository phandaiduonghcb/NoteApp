import { IndexPath,Layout, Text,Select,SelectItem,Datepicker, Button,  } from "@ui-kitten/components";
import React, { useState } from "react";
import {  StyleSheet} from "react-native";
import Modal from "react-native-modal";
import DateTimePickerModal from 'react-native-modal-datetime-picker';



const  SelectDate= (props) => {


  // const [date, setDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = useState(props.date);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(props.time);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  
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

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirmTime = (date) => {
    setSelectedTime(date);
    hideTimePicker();
  };
  return (
    
    <Layout>
      <Modal isVisible={props.isVisible} onBackButtonPress={props.onBackButtonPress} onBackdropPress={props.onBackdropPress} style={{ }}>
        <Layout style={styles.layout}>
        <Text style={{margin: 10, textAlign: "center"}} status='basic' category='h3'> Add reminder</Text>
        {/* <Text style={{margin: 10, textAlign: "center"}} status='danger' category='h4'> Add a time</Text> */}
        <Text category='h6'>
        Seleted time: {selectedDate ? selectedDate.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }) : 'No date selected'}
        </Text>
      <Button style={{ margin: 2,}} onPress={showDatePicker}> Select a date</Button>
      <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
         <Text category='h6'>
        Seleted time: {selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No date selected'}
        </Text>
      <Button style={{ margin: 2,}} onPress={showTimePicker}> Select a time</Button>
      <DateTimePickerModal
          date={selectedTime}
          isVisible={timePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
        />
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