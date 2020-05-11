import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  AsyncStorage,
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import Title from '../components/Title';
import BodyCard from '../components/Card';
import SearchInput from '../components/SearchInput';
import API from '../utils/API'


class HomeScreen extends React.Component {

    state= {
        recipes: [],
        ingredients: [],
        searchTerm: "",
        UserName: "",
        UserEmail: "",
        UserUID: ""

    }

    // Grab Async data on page load with "componentDidMount"
    componentDidMount () {

      //*  Had to split "_get_____AsyncData" functions into 3 functions to be able to set a different state in each (originally was an object containing all 3 key/values, setting a state object called "USER")
      
      // Get email and set state of "UserEmail"
      _getEmailAsyncData = async () => {
        try {
          let userEmailData = await AsyncStorage.getItem("email");
          if (userEmailData !== null) {
            console.log(userEmailData)
            this.setState({ UserEmail: userEmailData })
            console.log("setting UserEmail state to " + userEmailData)
            console.log(this.state.UserEmail)
          } else {
            console.log("userEailData came back as 'null' from Async.")
          }
        } catch (error) {
          console.log("error retrieving userEmailData from Async.");
          console.log("getItem error: " + error)
        }
      }

      // Get name and set state of "UserName"
      _getNameAsyncData = async () => {
        try {
          let userNameData = await AsyncStorage.getItem("name");
          if (userNameData !== null) {
            console.log(userNameData)
            this.setState({ UserName: userNameData })
            console.log("setting UserEmail state to: " + userNameData)
            console.log(this.state.UserName)
          } else {
            console.log("userNameData came back as 'null' from Async.")
          }
        } catch (error) {
          console.log("error retrieving userNameData from Async.");
          console.log("getItem error: " + error)
        }
      }

      // Get id (fb UID) and set state of "UserUID"
      _getIdAsyncData = async () => {
        try {
          let userIdData = await AsyncStorage.getItem("uidFB");
          if (userIdData !== null) {
            console.log(userIdData)
            this.setState({ UserUID: userIdData })
            console.log("setting UserUID state to: " + userIdData)
            console.log(this.state.UserUID)
          } else {
            console.log("userIdData came back as 'null' from Async.")
          }
        } catch (error) {
          console.log("error retrieving userIdData from Async.");
          console.log("getItem error: " + error)
        }
      }

      // Call all three functions
      _getEmailAsyncData()
      _getNameAsyncData()
      _getIdAsyncData()
      
    }

    // Search Spoonacular API for recipe based on query (searchTerm)
    searchForRecipe = (searchTerm) => {

        // Call API.js function "searchRecipe" to query by this.state.searchTerm
        API.searchRecipe(searchTerm)
            .then(res => {

                console.log(res.results);
                this.setState({recipes: res.results})
            })
    }

    // Search API for recipe Info based on recipe ID number
    getRecipeIngredientInfo = (id, title) => {

        // Save the name of the recipe to a variable
        const recipeTitle = title;
        // Create an object to push the user UID (this.state.UserUID) and recipe name to, and an empty array to push the ingredients too.
        let recipeIngredientData= {
          user: this.state.UserUID,
          name: recipeTitle,
          ingredients: []
        };

        // Call API.js function "getRecipeInfo"
        API.getRecipeInfo(id)
            .then(res => {
                
                console.log(res)
                // Save the returned ingredients to this.state.ingredients array to map through
                this.setState({  ingredients: res.extendedIngredients})
                this.state.ingredients.map(ingredient => {
                    console.log(ingredient.name)
                    // Add each ingredient to the ingredients array in the recipeIngredientData object
                    recipeIngredientData.ingredients.push(ingredient.name)
                    
                })
                // Call API.js function "addRecipeGroceryListToDBAndUser" to send "recipeIngredientData" to backend
                API.addRecipeGroceryListToDBAndUser(recipeIngredientData)
                
                
            })
    }

    // Handle form input change
    handleInputChange = event => {
        // Assign the search change in input to a variable.
        console.log(event)
        let formInput = event
        // Set the this.state.searchTerm to value of formInput.
         this.setState({ searchTerm: formInput })
         console.log(formInput)
        
        
    }

    // Handle form submit button
    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state.searchTerm)
        // Call function "searchForRecipe" with argument of "searchTerm" after validation .
        if (this.state.searchTerm === "") {
            alert("please enter something to search")
        } else {
            this.searchForRecipe(this.state.searchTerm)
            // Reset this.state.searchTerms after function.
            this.setState({searchTerm:""})
        }
        
    }

    // View recipe now, view source. opposed to new element holding detailed data
    handleViewBtn = (sourceLink) => {
        console.log(sourceLink)
        WebBrowser.openBrowserAsync(sourceLink)
    }

    // Get ingredients by searching api via id, save these ingredients to db
    handleIngredients = (id, title) => {
        this.getRecipeIngredientInfo(id, title);
    }

    // Add fav. recipe object to DB
    handleAddToFavorites = (recipe) => {
        console.log(recipe)
        let userRefById = this.state.UserUID
        const recipeObject = {
          user: userRefById,
          id: recipe.id,
          title: recipe.title,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          sourceUrl: recipe.sourceUrl
        }
        console.log(recipeObject.user)
        // Call API.js function "addFavRecipeToDBAndUser" to send "recipeObject" to backend
        API.addFavRecipeToDBAndUser(recipeObject)

    }

    // Render to page
    render () {
        return (
            <ScrollView>
              <Title />
              <SearchInput
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />

                {this.state.recipes.length ? (
                    <View style={styles.container}>
                        {this.state.recipes.map((recipe,i) => (
                            <BodyCard key={i}
                                image={recipe.image}
                                id={recipe.id}
                                title={recipe.title}
                                readyIn={recipe.readyInMinutes}
                                handleViewBtn={() => {this.handleViewBtn(recipe.sourceUrl)}}
                                handleIngredients={() => {this.handleIngredients(recipe.id, recipe.title)}}
                                handleAddToFavorites={() => {this.handleAddToFavorites(recipe)}}
                            />
                        ))}
                    </View>
                )
                :
                (
                    <View style={styles.container}>
                        <Text>
                            Search for a recipe to get started!
                        </Text>
                    </View>
                )}

            </ScrollView>
            
        );
    }
}

export default HomeScreen;

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});