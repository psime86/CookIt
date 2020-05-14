import React from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

export default function FavoriteCard(props) {
  return (
    <Card
      id={props.id}
      title={props.title}
      
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
          backgroundColor: 'rgb(92,112,143)',
        }}
        title='View Recipe'
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
          backgroundColor: 'rgb(92,112,143)',
        }}
        title='Add Ingredients to Grocery List '
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
          backgroundColor: 'rgb(242,127,118)',
        }}
        title='Delete '
        onPress={()=> {props.deleteFromFavorites()}}
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
