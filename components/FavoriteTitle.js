import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const getFonts = () =>
  Font.loadAsync({
    'DancingScript-Bold': require('../assets/fonts/DancingScript-Bold.ttf'),
    'DancingScript-SemiBold': require('../assets/fonts/DancingScript-SemiBold.ttf'),
  });

export default function FavoriteTitle() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/favorite.jpg')}
          style={styles.img}
        >
          <Text style={styles.title}>Favorites</Text>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 125,
    width: 450,
    flex: 3,
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    flex: 1,
    fontFamily: 'DancingScript-Bold',
    marginRight: 50,
  },
  container: {
    flex: 1,
  },
});
