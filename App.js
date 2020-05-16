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
//import StartScreen from './screens/StartScreen';
import HomeScreen from './screens/HomeScreen';
import expo from 'expo';
import * as Facebook from 'expo-facebook';
import { useState } from 'react';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

// export default function App(props) {

//   const [isLoadingComplete, setLoadingComplete] = React.useState(false);
//   const [initialNavigationState, setInitialNavigationState] = React.useState();
//   const BottomTab = createBottomTabNavigator();
//   const INITIAL_ROUTE_NAME = 'HomeScreen';
//   const containerRef = React.useRef();
//   //const { getInitialState } = useLinking(containerRef);
//   const [isLoggedin, setLoggedinStatus] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [isImageLoading, setImageLoadStatus] = useState(false);
//   const navigation = useNavigation();
//   // // Load any resources or data that we need prior to rendering the app
//   // React.useEffect(() => {
//   //   async function loadResourcesAndDataAsync() {
//   //     try {
//   //       SplashScreen.preventAutoHide();

//   //       // Load our initial navigation state
//   //       setInitialNavigationState(await getInitialState());

//   //       // Load fonts
//   //       await Font.loadAsync({
//   //         ...Ionicons.font,
//   //         'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
//   //       });
//   //     } catch (e) {
//   //       // We might want to provide this error information to an error reporting service
//   //       console.warn(e);
//   //     } finally {
//   //       setLoadingComplete(true);
//   //       SplashScreen.hide();
//   //     }
//   //   }

//   //   loadResourcesAndDataAsync();

//   facebookLogIn = async () => {
//     try {
//       await Facebook.initializeAsync('237042010845194');
//       const {
//         type,
//         token,
//         expires,
//         permissions,
//         declinedPermissions,
//       } = await Facebook.logInWithReadPermissionsAsync('237042010845194', {
//         permissions: ['public_profile', 'email'],
//       });
//       if (type === 'success') {
//         // Get the user's name using Facebook's Graph API
//         fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
//           .then(response => response.json())
//           .then(data => {
//             setLoggedinStatus(true);
//             console.log(setLoggedinStatus);
//             setUserData(data);
//             console.log(data);
//             if(data) {
//               alert('Logged In!');
//               console.log(alert);
//                 <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
//                 <BottomTab.Screen
//                 name='Home'
//                 component={HomeScreen}
//                 />
//                 </BottomTab.Navigator>
              
//               //props.navigation.navigate("HomeScreen")
//               //navigation.jumpTo("HomeScreen");
//             } else {
//               return(
//               //   <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
//               //   <BottomTab.Screen
//               //   name='Home'
//               //   component={HomeScreen}
//               //   />
//               //   </BottomTab.Navigator>
//               // );
//               this.props.navigation.navigate("LogIn") 
//               //alert('Login Failed'); // Anything you want to do if login failed.
//               //console.log(alert);
//               )}
//           })          
//           .catch(e => console.log(e)) 
        

//       } else {
//         // type === 'cancel'
//       }
//     } catch ({ message }) {
//       alert(`Facebook Login Error: ${message}`);
//     }
//   }

//   logout = () => {
//     setLoggedinStatus(false);
//     setUserData(null);
//     setImageLoadStatus(false);
//   }

//   return (
//     isLoggedin ?
//       userData ?
//         <View style={styles.container}>
//           <Image
//             style={{ width: 200, height: 200, borderRadius: 50 }}
//             source={{ uri: userData.picture.data.url }}
//             onLoadEnd={() => setImageLoadStatus(true)} />
//           <ActivityIndicator size="large" color="#0000ff" animating={!isImageLoading} style={{ position: "absolute" }} />
//           <Text style={{ fontSize: 22, marginVertical: 10 }}>Hi {userData.name}!</Text>
//           <TouchableOpacity style={styles.logoutBtn} onPress={this.logout}>
//             <Text style={{ color: "#fff" }}>Logout</Text>
//           </TouchableOpacity>
//         </View> :
//         <HomeScreen/>
//         :
//       <View style={styles.container}>
//         <Image
//           style={{ width: 200, height: 200, borderRadius: 50, marginVertical: 20 }}
//           source={require("./assets/images/React.png")} />
//         <TouchableOpacity style={styles.loginBtn} onPress={this.facebookLogIn}>
//           <Text style={{ color: "#fff" }}>Login with Facebook</Text>
//         </TouchableOpacity>
//       </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e9ebee',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loginBtn: {
//     backgroundColor: '#4267b2',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20
//   },
//   logoutBtn: {
//     backgroundColor: 'grey',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     position: "absolute",
//     bottom: 0
//   },
// });



  export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);

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

  
  console.log(isLoggedin)
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
