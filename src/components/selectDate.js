import { Layout } from "@ui-kitten/components";
import React, { useState } from "react";
import {  Text, View } from "react-native";
import Modal from "react-native-modal";


const  SelectDate= (props) => {


 

  return (
    
  
      <Modal isVisible={props.isVisible} onBackButtonPress={props.onBackButtonPress} onBackdropPress={props.onBackdropPress} style={{ flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22}}>
        <Layout style={{  margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5}}>
          <Text style={{marginBottom: 15,
    textAlign: "center",color:'black'}}>Hello!</Text>

        </Layout>
      </Modal>
    
  );
};

export default SelectDate;