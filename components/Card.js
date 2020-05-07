import React from 'react';
import { View, Text, Image, ScrollView, ShadowPropTypesIOS } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

export default function BodyCard(props) {
  return (
    <Card
      id={props.id}
      title={props.title}
      image={props.image}
      style={styles.card}
    >
      <Text style={{ marginBottom: 10 }}>
        Ready in {props.readyIn} minutes!
      </Text>
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title='VIEW NOW'
        id={props.id}
        onPress={() => {props.handleViewBtn()}}
      />
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          marginTop: 10,
        }}
        title='Add Ingridents to Shopping List '
        id={props.id}
        onPress={() => {props.handleIngredients()}}
      />
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          marginTop: 10,
        }}
        title='Add to Favorite '
        id={props.id}
        onPress={()=> {props.handleAddToFavorites()}}
      />
    </Card>
  );
}

const styles = {
  card: {
    flex: 1,
    marginTop: 20,
    color: 'rgb(121,150,128)',
  },
};
