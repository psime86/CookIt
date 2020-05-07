import React from 'react';

import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

export default function BodyCard() {
  return (
    <Card
      title='Steak'

      image={require('../assets/images/favorite6.jpeg')}
      containerStyle={{ borderRadius: 10 }}

    >
      <Text style={{ marginBottom: 10 }}>
        The idea with React Native Elements is more about component structure
        than actual design.
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
        title='Add to Favorites'

      />
    </Card>
  );
}


