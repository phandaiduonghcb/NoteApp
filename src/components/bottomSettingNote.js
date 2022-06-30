import { Button, Icon, Layout, Menu, MenuItem } from "@ui-kitten/components";
import React  from "react";
import {Animated, Dimensions, StyleSheet, View, Alert} from 'react-native';
import { PanGestureHandler } from "react-native-gesture-handler";
import { Portal } from "react-native-paper";
import { openDatabase } from "react-native-sqlite-storage";
const CloseButton = (props) => 
(
    <Icon {...props}  name='close-outline'/>
);
const PhotoIcon = (props) => 
(
    <Icon {...props}  name='camera-outline'/>
);
const ImageIcon = (props) => 
(
    <Icon {...props}  name='image-outline'/>
);
const checkIcon = (props) =>
(
    <Icon {...props} name='checkmark-square-2-outline'/>
);
const RecordingIcon = (props) =>
(
    <Icon {...props} name='mic-outline'/>
);
const DeleteIcon = (props) => (
    <Icon {...props} name='delete' pack='material'/>
);
const CopyIcon = (props) => (
    <Icon {...props} name='content-copy' pack='material'/>

);
const LabelIcon = (props) =>
(
    <Icon {...props} name='label' pack='material'/>

);
const db = openDatabase({
    name: "rn_sqlite",
  });
const BottomSettingNote =({show,onDismiss, navigation, id}) => {
    const bottomSheetAddHeight = Dimensions.get('window').height*0.21;
    const deviceWidth = Dimensions.get("window").width;
    const bottom = React.useRef(new Animated.Value(-bottomSheetAddHeight)).current;
    const [open,setOpen] = React.useState(show);
    const [tags, setTags] = React.useState([])
    const onGesture = (event) => {
      if (event.nativeEvent.translationY > 0) 
      {
        bottom.setValue(-event.nativeEvent.translationY);
      }
    };
    const onGestureEnd = (event) => {
      if (event.nativeEvent.translationY > bottomSheetAddHeight /2 )
      {
        onDismiss();
      }
      else{
        bottom.setValue(0);
      }
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
                console.log(results)
                setTags(results)
              }
            },
            error => {
              console.log("error on getting tags " + error.message);
            },
          );
        });
      }
    const DeleteNote = (id) =>
    {
        db.transaction(txn => {
            txn.executeSql(
              `DELETE FROM notes where id = ?`,
              [id],
              (sqlTxn, res) => {
                console.log("id when delete: ",id);
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
    }
    React.useEffect(() => {
        async function FetchData() {
        
          await getTags();
        }
    
        FetchData();
      }, [navigation]);
    React.useEffect(() => {
        if (show)
        {
            setOpen(show);
            Animated.timing(bottom, {
                toValue:0,
                duration:500, 
                useNativeDriver:false,
            }).start();
        }
        else 
        {
            Animated.timing(bottom, {
                toValue:-bottomSheetAddHeight,
                duration: 500,
                useNativeDriver:false,

            }).start(() => {
                setOpen(false);  
            });
        }
    },[show]);
    const covertidsinTag = (tags,id) =>
    {
      var new_tags = []
        if (tags.length > 0 )
        {
          // tags.forEach(element => {
          //   var ids_new = element.ids.split(',');
          //   var index = ids_new.indexOf(id);
          //   if ( index > -1 )
          //   {
          //     ids_new.splice(index,1);

          //   }
          //   ids_new = ids_new.join(',');
          //   console.log(ids_new);
          //   return {"ids": ids_new, "tag": element.tag};
          // });
          new_tags = tags.map(element => 
            {
              var ids_new = element.ids.split(',');
              var index = ids_new.indexOf(id);
              if ( index > -1 )
              {
                ids_new.splice(index,1);

              }
              ids_new = ids_new.join(',');
              // console.log(ids_new);
              return {"ids": ids_new, "tag": element.tag};
            });
        }
        // console.log(new_tags);
        return new_tags;
    }
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
    const addTag = (tag,ids='') => {
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
    const modifyTag = (new_tags) =>
    {
      new_tags.forEach(element => {
        deleteTag(element.tag);
        addTag(element.tag,element.ids);
      });
    }
    return (
        
        <Portal>
           
            {/* <OutsideClickHandler onOutsideClick={onDismiss}> */}
            <Animated.View style={[styles.root, {height:bottomSheetAddHeight,bottom:bottom,shadowOffset:{
                height:-3
            }},styles.common,{flexDirection:'column'}]}    >
                <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd} style={{flex:1}}>
                <View style={[styles.header,{shadowOffset:
                {
                    height:3,

                }},styles.common]}>
                    <View style={{
                        width:60,
                        height:3,
                        borderRadius:1.5,
                        position:"absolute",
                        top: 13,
                        left:(deviceWidth - 60 ) /2,
                        zIndex:10,
                        backgroundColor:"#ccc"
                    }}></View>
                    <Button style={styles.closeIcon} appearance="ghost" status='danger' size='small' accessoryLeft={CloseButton} onPress={onDismiss}/>
                </View>
                
                </PanGestureHandler>
                <Menu style={{}} size='large'>
                    <MenuItem  title='Delete'  accessoryLeft={DeleteIcon} onPress={() => {
                        console.log("Delete");
                        var new_tags = covertidsinTag(tags,id)
                        // console.log(test);
                        Alert.alert("Delete","Do you want to delete this note ?",[ 
                            {
                                text: "Cancel",
                                onPress: () => {
                                    console.log("Cancel Pressed");

                                    onDismiss()},
                                style: "cancel"
                              },
                              { text: "OK", onPress: () => {
                                    console.log("OK Pressed",id);
                                    if (id == undefined)
                                    {
                                      navigation.goBack();
                                    }
                                    else 
                                    {
                                      DeleteNote(id);
                                      modifyTag(new_tags);
                                      console.log("sau khi xoa",tags);
                                      navigation.goBack();
                                    }
                                    onDismiss();
                            } }
                            
                            ]);
                        // onDismiss();
                    }}/>
                    <MenuItem title='Make a copy' accessoryLeft={CopyIcon} onPress={() => {
                        console.log("Make a copy");
                        onDismiss();
                    }}/>
                    <MenuItem title='Labels' accessoryLeft={LabelIcon} onPress={() => {
                        console.log("Labels");
                        if (id == undefined)
                        {
                         
                          onDismiss();
                        }
                        else
                        {
                          navigation.navigate('ChooseTag',{id:id})
                          onDismiss();

                        }
                    }}/>
                </Menu>
                
            </Animated.View>
            {/* </OutsideClickHandler> */}
           
        </Portal>
        
        
    );
}
const styles = StyleSheet.create({
    root:
    {
        position:"absolute",
        left:0,
        right:0,
        zIndex:100,
        backgroundColor:'#fff',
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        overflow:"hidden",
    },
    common:{
        shadowColor: "#000",
        shadowOffset: {
          
            width:0,
        },
        shadowOpacity:0.24,
        shadowRadius:4,
        elevation:3,  
    },
    header:
    {
        height:35,
        backgroundColor:'#000',
    },
    closeIcon:
    {
        position:"absolute",
        right:0,
        top:0,
        zIndex:10,
        margin: 2,
    }
});
export default BottomSettingNote;