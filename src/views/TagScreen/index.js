import React from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {
  Icon, Text, Input,
  Layout,
  TopNavigation, TopNavigationAction
} from '@ui-kitten/components';
const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const TagScreen = ({ navigation }) => {

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => {
      navigation.goBack()
    }} />
  );
  const toggleActive = () => {
    setActive(!active);
  };
  const renderLeftIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleActive}>
      <Icon {...props} name={active ? 'close-outline' : 'plus-outline'}/>
    </TouchableWithoutFeedback>
  );

  const [value, setValue] = React.useState('');
  const [active, setActive] = React.useState(false)

  return (
    <Layout>
      <TopNavigation
        accessoryLeft={BackAction}
        title='Modify tags'
        placeholder='Add a tag here!'
      />
      <Input
        value={value}
        accessoryLeft={renderLeftIcon}

      />
    </Layout>
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

export default TagScreen