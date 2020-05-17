import * as React from 'react';
import { Platform, StatusBar, ActivityIndicator, Image,
   StyleSheet, View, Text, TouchableOpacity, Alert, } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import LoginScreen from './LogIn';
import { useState } from 'react';


const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

  export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const [isLoggedin, setLoggedinStatus] = useState(false);


  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  
  console.log(isLoggedin + "-App.js")
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <NavigationContainer>
          <Stack.Navigator>            
        {isLoggedin ? (
          <>
          <Stack.Screen name="Cook-it" component={BottomTabNavigator} />
          </>
        ) : (
          <Stack.Screen name="Cook-it" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
        </View>
    );
  }
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#fff',
  },
});
