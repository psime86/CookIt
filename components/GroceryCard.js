import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { Card, Button } from 'react-native-elements';
// import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export default function GroceryCard(props) {
  const [text, setText] = useState('');
  const [ingredients, setIngredients] = useState(props.list);

  //function to get text from text input
  const changeHandler = (val) => {
    setText(val);
  };

  //add additional ingridents to groceryList
  const submitHandler = (text) => {
    if (text.length > 0) {
      setIngredients((prevIngredients) => {
        console.log(`ingrident: ${prevIngredients}`);
        return [...prevIngredients, text];
      });
    } else {
      Alert.alert('Invalid Entry', 'Please enter an item.');
    }
    setText('');
  };

  //delete individual item
  const deleteHandler = (list) => {
    setIngredients((prevIngredients) => {
      return prevIngredients.filter((item) => item !== list);
    });
  };

  return (
    <Card title={props.title} containerStyle={{ borderRadius: 10 }}>
      <View>
        {ingredients.map((list) => (
          <TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.text}>{list}</Text>
              <AntDesign
                name='delete'
                size={20}
                color='black'
                style={styles.icon}
                onPress={(e) => deleteHandler(list)}
              />
            </View>
          </TouchableOpacity>
        ))}

        {/*Input Text*/}
        <TextInput
          style={styles.input}
          placeholder='New Grocery Item'
          onChangeText={changeHandler}
        />
        {/*Add to list button*/}
        <Button
          buttonStyle={{
            borderRadius: 10,
            marginBottom: 10,
            backgroundColor: 'rgb(148,148,148)',
          }}
          title='Add to List'
          onPress={() => submitHandler(text)}
        />
        {/*Delete button*/}
        <Button
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: 'rgb(242,127,118)',
          }}
          title='Delete List'
          onPress={() => {
            props.deleteFromShoppingList();
          }}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    padding: 10,
    flex: 2,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    margin: 10,
    padding: 10,
  },
});
