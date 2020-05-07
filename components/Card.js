import React from 'react';
<<<<<<< HEAD
import { View, Text, Image, ScrollView, ShadowPropTypesIOS } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
=======

import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
>>>>>>> dd86308fa80ac152113552e4fef48e39d05bfbfc

export default function BodyCard(props) {
  return (
    <Card
<<<<<<< HEAD
      id={props.id}
      title={props.title}
      image={props.image}
      style={styles.card}
=======
      title='Steak'

      image={require('../assets/images/favorite6.jpeg')}
      containerStyle={{ borderRadius: 10 }}

>>>>>>> dd86308fa80ac152113552e4fef48e39d05bfbfc
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
<<<<<<< HEAD
        title='VIEW NOW'
        id={props.id}
        onPress={() => {props.handleViewBtn()}}
=======
        title='View Recipe'

>>>>>>> dd86308fa80ac152113552e4fef48e39d05bfbfc
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
<<<<<<< HEAD
        title='Add Ingridents to Shopping List '
        id={props.id}
        onPress={() => {props.handleIngredients()}}
=======
        title='Add Ingredients to Grocery List '

>>>>>>> dd86308fa80ac152113552e4fef48e39d05bfbfc
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
<<<<<<< HEAD
        title='Add to Favorite '
        id={props.id}
        onPress={()=> {props.handleAddToFavorites()}}
=======
        title='Add to Favorites'

>>>>>>> dd86308fa80ac152113552e4fef48e39d05bfbfc
      />
    </Card>
  );
}


