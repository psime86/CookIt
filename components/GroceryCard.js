import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Card, CheckBox, Button } from 'react-native-elements';
// import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';



export default function GroceryCard(props) {
  
  return (
    <Card title={props.title} containerStyle={{ borderRadius: 10 }}>
      <View>
        <Text>{props.list}</Text>
        <View>
          <TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <CheckBox />
              {/* <FlatList
                data={ingredient}
                renderItem={({item}) => <Text>{item}</Text> }
                keyExtractor={(item, index) => index.toString()}
              /> */}

             
              <Text style={styles.text}>Apple</Text>
              <AntDesign
                name='delete'
                size={20}
                color='black'
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/*List item */}
        <View>
          <TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <CheckBox />
              <Text style={styles.text}>Apple</Text>
              <AntDesign
                name='delete'
                size={20}
                color='black'
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/*Add button*/}
        <TextInput style={styles.input} placeholder='New Grocery Item' />
        {/*Delete button*/}
        <Button
          buttonStyle={{
            borderRadius: 10,
            marginBottom: 10,
            backgroundColor: 'rgb(148,148,148)',
          }}
          title='Add to List'
        />
        <Button
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: 'rgb(242,127,118)',
          }}
          title='Delete List'
          onPress={()=> {props.deleteFromShoppingList()}}
        />
      </View>
    </Card>
  );
}

const styles = {
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
    flex: 1,
  },
};
