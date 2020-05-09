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
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import Title from '../components/Title';
import BodyCard from '../components/Card';
import SearchInput from '../components/SearchInput';
import API from "../utils/API"

class HomeScreen extends React.Component {

    state= {
        recipes: [],
        ingredients: [],
        groceryList: [],
        searchTerm: "",

    }
    // Search API for recipe based on query (searchTerm)
    searchForRecipe = (searchTerm) => {

        API.searchRecipe(searchTerm)
            .then(res => {

                console.log(res.results);
                this.setState({recipes: res.results})
            })
    }
    // Search API for recipe Info based on recipe ID number
    getRecipeInfo = (id, title) => {

        // Save the name of the recipe to a variable
        const recipeTitle = title;
        // Create an empty array to later be defined
        let shoppingList = [];
        // Create an object to push the recipe name to and an empty array to push the ingredients too.
        let recipeIngredientData= {
          name: recipeTitle,
          ingredients: []
        };

        // Run API call "getRecipeInfo"


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
                // push the object into the shopping list
                shoppingList.push(recipeIngredientData)
                this.setState({ groceryList: shoppingList })
                console.log("after setting state...")
                console.log(this.state.groceryList)
                // Call another function that then sends this state to somewhere and populates the list? or send to backend and retrieve from database?
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

    handleViewBtn = (sourceLink) => {
        console.log(sourceLink)
        WebBrowser.openBrowserAsync(sourceLink)
    }

    handleIngredients = (id, title) => {
        this.getRecipeInfo(id, title);
    }

    handleAddToFavorites = (id) => {
        console.log(id)
    }

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
                                handleAddToFavorites={() => {this.handleAddToFavorites(recipe.id)}}
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