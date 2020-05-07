import React from 'react';

import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { TextInput, View, TouchableHighlight, Text } from 'react-native';

export default function Form(props) {
  

  return (
    <View>
      <TextInput onChangeText={text => props.handleInputChange(text)}  placeholder='Search Recipe' style={styles.input} />
      <Button onPress={props.handleFormSubmit} title='Search' />
=======
    <View style={styles.container}>
      <View>
        <TextInput placeholder='Search Recipe' style={styles.input} />
      </View>
      <View>
        <Button
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: 'rgb(92,112,143)',
          }}
          title='Search'
        />
      </View>

>>>>>>> dd86308fa80ac152113552e4fef48e39d05bfbfc
    </View>
  );
}

const styles = {
  input: {

    textAlign: 'left',
    borderColor: 'black',
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    flex: 2,
    marginHorizontal: 10,
    width: 250,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  but: {
    flex: 1,

  },
};
