import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Image } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default function FavoriteCard(props) {
  let imageURI = `https://spoonacular.com/recipeImages/${props.image}-240x150.jpg`;
  return (
    <Card
      id={props.id}
      title={props.title}
      style={styles.card}
      containerStyle={{ borderRadius: 10 }}
    >
      <Image
        style={{ width: '100%', height: 150, flex: 1, margin: 'auto' }}
        source={{ uri: imageURI }}
      />
      <Text style={{ marginBottom: 10, marginTop: 10 }}>
        <Ionicons name='md-time' size={18} color='black' /> {props.readyIn}
        min
      </Text>
      <Button
        buttonStyle={{
          backgroundColor: 'rgb(92,112,143)',
        }}
        title='View Recipe'
        id={props.id}
        onPress={() => {
          props.handleViewBtn();
        }}
      />
      <Button
        buttonStyle={{
          marginTop: 10,
          backgroundColor: 'rgb(92,112,143)',
        }}
        title='Add Ingredients to Grocery List '
        id={props.id}
        onPress={() => {
          props.handleIngredients();
        }}
      />
      <Button
        buttonStyle={{
          marginTop: 10,
          backgroundColor: 'rgb(242,127,118)',
        }}
        title='Delete '
        onPress={() => {
          props.deleteFromFavorites();
        }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 20,
    color: 'rgb(121,150,128)',
  },
});
