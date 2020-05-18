import React from 'react';
import { StyleSheet, Text, View, Image, 
    TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


console.disableYellowBox = true;
class settings extends React.Component{

    state = {
        isLoggedin:false,
        userData:"",
        isImageLoading:false
    };

    componentDidMount(){

    _getIdAsyncData = async () => {
        try {
        let activeUser = await AsyncStorage.getItem('allData');
        console.log(activeUser + "**PROFILE SCREEN**");

        if (activeUser !== null) {        
            this.setState({ userData: JSON.parse(activeUser) });
            console.log(this.state.userData);
        } else {
            console.log("allData came back as 'null' from Async.");
        }
        } catch (error) {
        console.log('error retrieving allData from Async.');
        console.log('getItem error: ' + error);
        }      
    };

    _getIdAsyncData().then(() => {
        this.setState({ isLoggedin:true })
        })
  }   

    logout = () => {
        this.setState({ isLoggedin:false, userData:"", isImageLoading:false })
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

  

  render(){
    return (
        <ScrollView>
        {this.state.isLoggedin ?
          this.state.userData ?      
            <View style={styles.container}>
              <Image
                style={{ width: 200, height: 200, borderRadius: 50, marginVertical: 20 }}
                source={{ uri: this.state.userData.picture.data.url }}
                onLoadEnd={() => this.setState({isImageLoading:true})} />
              <ActivityIndicator size="large" color="#0000ff" animating={!this.state.isImageLoading} style={{ position: "absolute" }} />
              <Text style={{ fontSize: 22, marginVertical: 10 }}>Hi {this.state.userData.name}!</Text>
              <TouchableOpacity style={styles.logoutBtn} onPress={this.logout}>
                <Text style={{ color: "#fff" }}>Logout</Text>
              </TouchableOpacity>
            </View> :
            null
            :
          <View style={styles.container}>
            <Image
              style={{ width: 200, height: 200, borderRadius: 50, marginVertical: 20 }}
              source={require("../assets/images/icon1.png")} />
            <TouchableOpacity style={styles.loginBtn} onPress={this.facebookLogIn}>
              <Text style={{ color: "#fff" }}>Login with Facebook</Text>
            </TouchableOpacity>
          </View>
        }
          </ScrollView>
      );
  }
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
        position: "relative",
        bottom: 0
      },
    });


    export default settings