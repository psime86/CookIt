//===================================================
// Import requires files
//===================================================

import axios from "axios";
import { SPOONACULAR_API } from 'react-native-dotenv'
import React from 'react'

// Define API functions inside exported module.

export default {

    //=================================================================================================
    // Route to get recipe from Spoonacular API by "searchTerm" (query).
    //=================================================================================================

    searchRecipe: function(searchTerm) {

        // Define the api key and apiURL
        let apiKey = SPOONACULAR_API
        console.log("key: " + apiKey)
        console.log("searchterm: " + searchTerm)
        
        // Search spoonacular for recipe "FROM SPOONACULAR API (NOT RAPID API)"
        return axios({
            "method":"GET",
            "url":`https://api.spoonacular.com/recipes/search?query=${searchTerm}&number=20&apiKey=${apiKey}`,
            "header":
                {
                "Accept": "application/json",
                "content-type": "application/json"
                }
        })
        .then(res => res.data)
        .catch(err => console.log(err))
    },

    //=================================================================================================
    // Route to search Spoonacular API for more recipe info (ingredients, etc.) by recipeId number.
    //=================================================================================================

    getRecipeInfo: function(recipeId) {
        
        let apiKey = SPOONACULAR_API
        console.log("ID: " + recipeId)

        return axios({
            "method": "GET",
            "url": `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`,
            "headers": 
                {
                    "Accept": "application/json",
                    "content-type": "application/json"
                }
        })
        .then( res => res.data)
        .catch(err => console.log(err))
    },

    //==========================================================================================================================
    // Send user data to backend, If no User documents, or not found, create User document and return '_id' for async storage.
    //==========================================================================================================================

    sendUserToDB: function(facebookUserData) {
        
        return axios ({
            "method": "POST",
            "url": "http://192.168.1.119:5000/api/user",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            "data": facebookUserData
            
        })
        .then( res => res.data )
        .catch(err => console.log(err.response))
    },
    
    //=============================================================================================
    // Create Recipe document and add '_id' to User document "recipes" array.
    //=============================================================================================

    addFavRecipeToDBAndUser: function(recipeObject) {

        return axios({
            "method": "POST",
            "url": "http://192.168.1.119:5000/api/recipe",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            "data": recipeObject
        })
        .then( res => res.data)
        .catch(err => console.log(err.response))
    },

    //============================================================================================
    // Create GroceryList document and add '_id" to User document "shoppingList" array.
    //============================================================================================

    addRecipeGroceryListToDBAndUser: function(groceryListObject) {

        return axios({
            "method": "POST",
            "url": "http://192.168.1.119:5000/api/grocery",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            "data": groceryListObject
        })
        .then( res => res.data)
        .catch(err => console.log(err.response))
    },
    
    //========================================================================================
    // Find User document by DB '_id".
    //========================================================================================

    findUser: function(id) {
        console.log("made it to API")

        return axios({
            "method": "GET",
            "url": "http://192.168.1.119:5000/api/findUser/" + id,
            "headers": 
                {
                    "Accept": "application/json",
                    "content-type": "application/json"
                }
        })
        .then( res => res.data[0])
        .catch(err => console.log(err.response))
    },

    //========================================================================================
    // Delete Recipe document '_id' form User document "recipe" array.
    //========================================================================================

    deleteRecipeFromUser: function(deleteDataObject) {
        return axios({
            "method": "DELETE",
            "url": "http://192.168.1.119:5000/api/deleteFavRecipe",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            "data": deleteDataObject
        })
        .then(res => res.data)
        .catch(err => console.log(err.response))
    },

    //========================================================================================
    // Delete GroceryList Document and remove '_id' form User document "shoppingList" array.
    //========================================================================================

    deleteGroceryListFromUser: function(deleteDataObject) {
        return axios({
            "method": "DELETE",
            "url": "http://192.168.1.119:5000/api/deleteGroceryList",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            "data": deleteDataObject
        })
        .then(res => res.data)
        .catch(err => console.log(err.response))
    }

};


// Notes:
    // To throw recipes into shopping cart, do we need to call recipe info in BG, grab each item name, and add to cart?