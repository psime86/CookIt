import React from 'react';

import { TextInput, View, Button, StyleSheet } from 'react-native';

export default function Form(props) {
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          onChangeText={(text) => props.handleInputChange(text)}
          placeholder='Search Recipe'
          style={styles.input}
          onSubmitEditing={props.handleFormSubmit}
          returnKeyType='search'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'left',
    borderColor: 'black',
    padding: 4,
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
  butt: {
    borderRadius: 10,
  },
});
