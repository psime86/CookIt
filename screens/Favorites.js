import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

import FavoriteTitle from '../components/FavoriteTitle';
import FavoriteCard from '../components/FavoriteCard';

export default function Favorites() {
  return (
    <ScrollView>
      <FavoriteTitle />
      <View style={styles.container}>
        <FavoriteCard />
        <FavoriteCard />
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    padding: 10,
    backgroundColor: 'rgb(163,176,186)',
  },
};

// 'rgb(169,183,200)'
