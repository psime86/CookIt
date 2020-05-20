import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import * as Facebook from 'expo-facebook';
import API from '../utils/API';
import { apisAreAvailable } from 'expo';
import { AsyncStorage } from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  navigation,
  StackActions,
} from '@react-navigation/native';
import { APP_ID } from 'react-native-dotenv';

console.disableYellowBox = true;
//const Stack = createStackNavigator();

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });
  const FBID = APP_ID;

  facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync(FBID);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(FBID, {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            setLoggedinStatus(true);
            setUserData(data);
            const FBdata = data;
            // My add. (bryan) to view response and send data, new from this line down to line
            console.log(data);
            console.log(token + ' This is the token');
            // Create object to hold user data from FB
            let facebookUserData = {
              email: data.email,
              name: data.name,
              uidFB: data.id,
            };

            // use AsyncStorage to save USER data to use throughout the application.

            _storeData = async (key, value) => {
              try {
                await AsyncStorage.setItem(key, JSON.stringify(value));
                console.log('data: ' + key + ' ...added to asyncStorage!');
              } catch (error) {
                console.log('error setting item to AsyncStorage');
                console.log('setItem error: ' + error);
              }
            };

            // Send the data to the back end for validation to see if user exists, if not create user
            API.sendUserToDB(facebookUserData)
              .then((data) => {
                console.log('on the login page');
                console.log(data);
                // Save the returned database id to "databaseId" in async storage
                _storeData('databaseId', data);
              })
              .catch((err) => console.log(err));
          })
          .catch((e) => console.log(e));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
    _removeUserID = async (key) => {
      try {
        await AsyncStorage.removeItem(key);
        console.log('removed data form async');
      } catch (error) {
        console.log('removeItem error: ' + error);
      }
    };

    _removeUserID('databaseId');
  };

  if (isLoggedin === true) {
    navigation.setOptions({ tabBarVisible: true });
  } else {
    navigation.setOptions({ tabBarVisible: false });
  }

  return isLoggedin ? (
    userData ? (
      <View>
        <ImageBackground
          source={require('../assets/images/logout.jpg')}
          style={{ width: '100%', height: '100%' }}
        >
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 50,
              marginTop: 40,
              marginHorizontal: 30,
              marginLeft: 100,
            }}
            source={{ uri: userData.picture.data.url }}
            onLoadEnd={() => setImageLoadStatus(true)}
          />
          <ActivityIndicator
            size='large'
            color='#0000ff'
            animating={!isImageLoading}
            style={{ position: 'absolute' }}
          />
          <Text style={{ fontSize: 22, marginVertical: 10, marginLeft: 125 }}>
            Hi {userData.name}!
          </Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={this.logout}>
            <Text style={{ color: '#fff', fontSize: 20 }}>Logout</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    ) : null
  ) : (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/login1.jpg')}
        style={{ width: '100%', height: '100%' }}
      >
        <View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={this.facebookLogIn}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>
              Login with Facebook
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 330,
    position: 'absolute',
    marginLeft: 100,
  },
  logoutBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute',
    marginLeft: 145,
    marginTop: 300,
  },
});
