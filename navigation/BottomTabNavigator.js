import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/Settings';
import GroceryList from '../screens/GroceryList';
import Favorites from '../screens/Favorites';
import { Settings } from 'react-native';
//import StartScreen from '../screens/StartScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerShown: false });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{          
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              focused={focused}
              name='home'
              size={24}
              color='black'
            />
          ),
        }}
      />

      <BottomTab.Screen
        name='GroceryList'
        component={GroceryList}
        options={{
          title: 'Grocery List',
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              focused={focused}
              name='list'
              size={24}
              color='black'
            />
            // <TabBarIcon focused={focused} name='md-book' />
          ),
        }}
      />

      <BottomTab.Screen
        name='Favorites'
        component={Favorites}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              focused={focused}
              name='favorite'
              size={24}
              color='black'
            />
            // <TabBarIcon focused={focused} name='md-book' />
          ),
        }}
      />

      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-cog" />,
        }}
        />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'GroceryList':
      return 'Grocery List';
    case 'Favorites':
      return 'Favorites';
    case 'Settings':
      return 'Settings';
  }
}
