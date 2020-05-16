import React from 'react';

import { TextInput, Button, View } from 'react-native';

export default function Form(props) {
  

  return (
    <View>
      <TextInput onChangeText={text => props.handleInputChange(text)} onSubmitEditing={props.handleFormSubmit} placeholder='Search Recipe' style={styles.input} />
      <Button onPress={props.handleFormSubmit} title='Search' />
    </View>
  );
}

const styles = {
  input: {
    textAlign: 'center',
    borderColor: 'black',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
  },
};
