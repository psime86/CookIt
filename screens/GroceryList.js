import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  View,
  ScrollView,
  AsyncStorage,
  Text,
  FlatList,
  Button,
  StyleSheet,
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import GroceryTitle from '../components/GroceryTitle';
import GroceryCard from '../components/GroceryCard';
import API from '../utils/API';
import PTRView from 'react-native-pull-to-refresh';
class GroceryList extends React.Component {
  state = {
    // define state component here
    UserDBId: '',
    shoppingList: '',
  };

  //===========================================================================================
  // Component did Mount
  //===========================================================================================

  componentDidMount() {
    // define function to get databaseId from Async
    _getIdAsyncData = async () => {
      try {
        let databaseId = await AsyncStorage.getItem('databaseId');
        if (databaseId !== null) {
          console.log(databaseId);
          this.setState({ UserDBId: JSON.parse(databaseId) });
          console.log('setting UserUID state to: ' + databaseId);
          console.log(this.state.UserDBId);
        } else {
          console.log("databaseId came back as 'null' from Async.");
        }
      } catch (error) {
        console.log('error retrieving databaseId from Async.');
        console.log('getItem error: ' + error);
      }
    };
    // Call function to retrieve databaseId from Async
    _getIdAsyncData().then(() => {
      console.log(
        "after retrieving databaseId... call next function 'getUserDataFromDB()'"
      );
      this.getUserDataFromDB();
    });
  }

  //======================================================================================
  // Get User data from DB.
  //======================================================================================

  getUserDataFromDB = () => {
    //this.setState({getUser: true})
    // Grab User "shoppingList"
    API.findUser(this.state.UserDBId)
      .then((res) => {
        console.log(
          'after retrieveing user DB data..... log response on front end'
        );
        console.log(res);
        console.log(res.shoppingList);
        this.setState({ shoppingList: res.shoppingList });
        console.log('confirming state of shoppingList after setting');
        console.log(this.state.shoppingList);
      })
      .catch((err) => console.log(err));
  };

  //===================================================================================================================================
  // Delete GroceryList document from GroceryList collection by '_id', then remove from User document "shoppingList" array by '_id"
  //===================================================================================================================================

  deleteFromShoppingList = (id) => {
    console.log(id);
    let deleteDataObject = {
      user: this.state.UserDBId,
      groceryListDBId: id,
    };
    API.deleteGroceryListFromUser(deleteDataObject).then((res) => {
      this.setState({
        shoppingList: this.state.shoppingList.filter((list) => list._id !== id),
      });
      console.log('Below should be the returned data from the delete route');
      console.log(res);
    });
  };

  //==================================================================================================
  // Render to screen.
  //==================================================================================================
  refresh = () => {
    return new Promise((resolve) => {
      _getIdAsyncData = async () => {
        try {
          let databaseId = await AsyncStorage.getItem('databaseId');
          if (databaseId !== null) {
            console.log(databaseId);
            this.setState({ UserDBId: JSON.parse(databaseId) });
            console.log('setting UserUID state to: ' + databaseId);
            console.log(this.state.UserDBId);
          } else {
            console.log("databaseId came back as 'null' from Async.");
          }
        } catch (error) {
          console.log('error retrieving databaseId from Async.');
          console.log('getItem error: ' + error);
        }
      };
      // Call function to retrieve databaseId from Async
      _getIdAsyncData().then(() => {
        console.log(
          "after retrieving databaseId... call next function 'getUserDataFromDB()'"
        );
        this.getUserDataFromDB();
      });
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  render() {
    return (
      // <View>
      //   <FlatList
      //           data={this.state.shoppingList}
      //           renderItem={({item}) => <Text>{item.ingredients}</Text> }
      //           keyExtractor={(item, index) => index.toString()}
      //         />
      // </View>
      <PTRView
        onRefresh={this.refresh}
        style={{ backgroundColor: 'rgb(218,168,185)' }}
      >
        <ScrollView style={{ backgroundColor: 'rgb(218,168,185)' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <GroceryTitle style={{ flex: 2, height: 50 }} />
          </View>

          {this.state.shoppingList.length ? (
            <View style={styles.container}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}
                >
                  Swipe Down to Refresh
                </Text>
              </View>
              {this.state.shoppingList.map((listObject, i) => (
                <GroceryCard
                  key={i}
                  title={listObject.title}
                  list={listObject.ingredients}
                  deleteFromShoppingList={() => {
                    this.deleteFromShoppingList(listObject._id);
                  }}
                />
              ))}
            </View>
          ) : (
            <View style={styles.container}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                Your Grocery List is Empty
              </Text>
              <Text style={styles.head}>
                If Ingredients Were Added Swipe Down to Refresh
              </Text>
            </View>
          )}
        </ScrollView>
      </PTRView>
    );
  }
}

export default GroceryList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'rgb(218,168,185)',
  },
  butt: {
    color: 'black',
  },
  head: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
});
