import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';

export default function Title() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/header.jpg')}
        style={styles.img}
      >
        <Text style={styles.title}>Cook-it</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: '100%',
    flex: 2,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
