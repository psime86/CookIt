import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default function BodyCard(props) {
  let imageURI = `https://spoonacular.com/recipeImages/${props.image}-240x150.jpg`;
  return (
    <Card
      id={props.id}
      title={props.title}
      containerStyle={{ borderRadius: 10 }}
      style={styles.card}
      // image={{ uri: imageURI }}
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
          backgroundColor: 'rgb(92,112,143)',
        }}
        title='Add to Favorites '
        id={props.id}
        onPress={() => {
          props.handleAddToFavorites();
        }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    color: 'black',
  },
});
