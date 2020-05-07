import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import GroceryTitle from '../components/GroceryTitle';
import GroceryCard from '../components/GroceryCard';

export default function GroceryList() {
  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <GroceryTitle style={{ flex: 2, height: 50 }} />
      </View>
      <View style={styles.container}>
        <GroceryCard />
        <GroceryCard />
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    padding: 10,
    backgroundColor: 'rgb(218,168,185)',
  },
};
