import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

export default function BodyCard() {
  return (
    <Card
      title='Steak'
      image={require('../assets/images/header.jpg')}
      style={styles.card}
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
        }}
        title='VIEW NOW'
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
