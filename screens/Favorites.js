import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import API from '../utils/API';
// import { ScrollView } from 'react-native-gesture-handler';

import FavoriteTitle from '../components/FavoriteTitle';
import FavoriteCard from '../components/FavoriteCard';
import PTRView from 'react-native-pull-to-refresh';
class FavoriteList extends React.Component {
  state = {
    favList: [],
    UserDBId: '',
    ingredients: [],
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
        console.log('made it inside next function');
        console.log(res);
        console.log(res.recipes);
        this.setState({ favList: res.recipes });
        console.log('confirming favList');
        console.log(this.state.favList);
      })
      .catch((err) => console.log(err));
  };

  //=============================================================================================
  // handle event for button "View" , view source.
  //=============================================================================================

  handleViewBtn = (sourceLink) => {
    console.log(sourceLink);
    WebBrowser.openBrowserAsync(sourceLink);
  };

  //=========================================================================================
  // Handle event to start to get ingredients rom API via id, save these ingredients to db.
  //=========================================================================================

  handleIngredients = (id, title) => {
    this.getRecipeIngredientInfo(id, title);
  };

  //=======================================================================================================================================
  // Search API for recipe Info based on recipe ID number, then create groceryList document and add to User documents 'shoppingList" array.
  //========================================================================================================================================

  getRecipeIngredientInfo = (id, title) => {
    // Save the name of the recipe to a variable
    const recipeTitle = title;
    // Create an object to push the user UID (this.state.UserUID) and recipe name to, and an empty array to push the ingredients too.
    let recipeIngredientData = {
      user: this.state.UserDBId,
      name: recipeTitle,
      ingredients: [],
    };
    // Call API.js function "getRecipeInfo"
    API.getRecipeInfo(id).then((res) => {
      console.log(res);
      // Save the returned ingredients to this.state.ingredients array to map through
      this.setState({ ingredients: res.extendedIngredients });
      this.state.ingredients.map((ingredient) => {
        console.log(ingredient.name);
        // Add each ingredient to the ingredients array in the recipeIngredientData object
        recipeIngredientData.ingredients.push(ingredient.name);
      });
      // Call API.js function "addRecipeGroceryListToDBAndUser" to send "recipeIngredientData" to backend
      API.addRecipeGroceryListToDBAndUser(recipeIngredientData).then((res) => {
        console.log('returned from grocery route back to front end');
        console.log(res);
        if (!res.name) {
          Alert.alert(
            'Invalid Entry',
            'This recipe is already added to your Grocery List.'
          );
        }
      });
    });
  };

  //==================================================================================================
  // Delete recipe document from collection, then remove id from User document, then filter state.
  //==================================================================================================

  deleteFromFavorites = (id) => {
    console.log(id);
    let deleteDataObject = {
      user: this.state.UserDBId,
      recipeDBId: id,
    };
    API.deleteRecipeFromUser(deleteDataObject)
      .then((res) => {
        this.setState({
          favList: this.state.favList.filter((recipe) => recipe._id !== id),
        });
        console.log('Below should be the returned data from delete route');
        console.log(res);
      })
      .catch((err) => console.log(err));
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
      <PTRView
        onRefresh={this.refresh}
        style={{ backgroundColor: 'rgb(163,176,186)' }}
      >
        <ScrollView style={{ backgroundColor: 'rgb(163,176,186)' }}>
          <FavoriteTitle />
          {this.state.favList.length ? (
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
              {this.state.favList.map((recipe, i) => (
                <FavoriteCard
                  key={i}
                  id={recipe.recipeId}
                  image={recipe.recipeId}
                  title={recipe.title}
                  readyIn={recipe.readyIn}
                  handleViewBtn={() => {
                    this.handleViewBtn(recipe.link);
                  }}
                  handleIngredients={() => {
                    this.handleIngredients(recipe.recipeId, recipe.title);
                  }}
                  deleteFromFavorites={() => {
                    this.deleteFromFavorites(recipe._id);
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
                Your Favorites Recipe List is Empty
              </Text>
              <Text style={styles.head}>
                If Recipes Were Added Swipe Down to Refresh
              </Text>
            </View>
          )}
        </ScrollView>
      </PTRView>
    );
  }
}

export default FavoriteList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'rgb(163,176,186)',
  },
  head: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
});
