import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';
import { NavigationContainer, useNavigation, navigation, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import API from './utils/API'


console.disableYellowBox = true;
const Stack = createStackNavigator();


export default function App() {

  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });
  

  facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync('237042010845194');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('237042010845194', {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        console.log(type);
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            setLoggedinStatus(true);
            setUserData(data);
            // My add. (bryan) to view response and send data, new from this line down to line 
            console.log(data + " Log-in line 44");
            // Create object to hold user data from FB
            let facebookUserData = {
              email : data.email,
              name: data.name,
              uidFB: data.id,
            }

            // use AsyncStorage to save USER data to use throughout the application.

            _storeData = async (key, value) => {
              try {
                  await AsyncStorage.setItem(key, JSON.stringify(value));
                  console.log("data: " + key + " ...added to asyncStorage!")
              } catch (error) {
                console.log("error setting item to AsyncStorage")
                console.log("setItem error: " + error)
              }
            };
            _storeData("email", data.email);
            _storeData("name", data.name);
            _storeData("uidFB", data.id);
            _storeData("allData", data);            

            

            // Send the data to the back end for validation to see if user exists, if not create user
            API.sendUserToDB(facebookUserData)
            .then(data => {
              console.log("on the login page line 73")
              console.log(data + " DBID on Login line 74")
              // Save the returned database id to "databaseId" in async storage
              _storeData("databaseId", data);
            })
            .catch(err => console.log(err))
              
               
              // Need to somehow save user object to APP..... AsyncStorage? state / context? redirect to homeScreen and pass object?

            
              console.log(data + "**LOG-IN PAGE line 84**");
          })
          
          .catch(e => console.log(e))
      } else {
         (type === 'cancel')
         console.log(type);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
    console.log('logout');
    _removeUserID = async (key) => {
      try {
        await AsyncStorage.removeItem(key)
        console.log("removed data form async")
      } catch (error) {
        console.log("removeItem error: " + error)
      }
    }
    _removeUserID("email");
    _removeUserID("name");
    _removeUserID("uidFB");
    _removeUserID("databaseId");
    
  }
  console.log(isLoggedin + "-LogIn line 116");
  console.log(userData + "**LOG-IN USER line 117**");

if (isLoggedin === true){
  navigation.setOptions({ headerShown: false });
  return(
    
    <Stack.Navigator>           
    <>
      <Stack.Screen name="Cook-it" component={BottomTabNavigator} />
    </>
    </Stack.Navigator>
    
  )};

  return (
    isLoggedin ?
      userData ?      
        <View style={styles.container}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 50, marginVertical: 20 }}
            source={{ uri: userData.picture.data.url }}
            onLoadEnd={() => setImageLoadStatus(true)} />
          <ActivityIndicator size="large" color="#0000ff" animating={!isImageLoading} style={{ position: "absolute" }} />
          <Text style={{ fontSize: 22, marginVertical: 10 }}>Hi {userData.name}!</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={this.logout}>
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableOpacity>
        </View> :
        null
        :
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200, borderRadius: 50, marginVertical: 20 }}
          source={require("./assets/images/React.png")} />
        <TouchableOpacity style={styles.loginBtn} onPress={this.facebookLogIn}>
          <Text style={{ color: "#fff" }}>Login with Facebook</Text>
        </TouchableOpacity>
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
    borderRadius: 20
  },
  logoutBtn: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "absolute",
    bottom: 0
  },
});