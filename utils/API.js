//===================================================
// Import requires files
//===================================================

import axios from "axios";
import { SPOONACULAR_API } from 'react-native-dotenv'

// Define API functions inside exported module.

export default {
    // Get recipe from spoonacular by "searchTerm" (query)
    searchRecipe: function(searchTerm) {

        // Define the api key and apiURL
        let apiKey = SPOONACULAR_API
        console.log("key: " + apiKey)
        console.log("searchterm: " + searchTerm)
        
        // Search spoonacular for recipe "FROM SPOONACULAR API (NOT RAPID API)"
        return axios({
            "method":"GET",
            "url":`https://api.spoonacular.com/recipes/search?query=${searchTerm}&number=10&apiKey=${apiKey}`,
            "header":
                {
                "content-type": "application/octet-stream"
                }
        })
        .then(res => res.data)
        .catch(err => console.log(err))
        
        // attempt 2 (Spoonacular with RAPID API, results error)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // let URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search";
        // let config = {
        //     headers: {
        //         "content-type": "application/json",
        //         "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        //         "x-rapidapi-key": apiKey,
        //     },
        //     params: {
        //         "diet":null,
        //         "excludeIngredients":"coconut",
        //         "intolerances":"egg%2C gluten",
        //         "number":"10",
        //         "offset":"0",
        //         "type":"main course",
        //         "query": searchTerm
        //     }
        //   };

        //   return axios.get(URL, config)
        //     .then(res => res.data)
        //     .catch(err => console.log(err))
    },

    



    // Route to search for more recipe info (ingredients, etc.) by recipeId number
    getRecipeInfo: function(recipeId) {
        
        const URL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`
        const key=process.env.SPOONACULAR_API
        
        return axios ({
            "method": "GET",
            "url": URL,
            "headers": 
                {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                    "x-rapidapi-key": key,  
                }
        })
        .then( res => res.data)
        .catch(err => console.log(err))
    },
    // Route from app to send user info to backend to create user (user collection)
    saveUserToDB: function(userId) {
        return axios.post("/api/user/" + userId)
            .then(res => res.data)
            .catch(err => console.log(err))
    },
    // Send recipeId to user and push into recipe array (more code needed on back end)
    saveRecipeToUser: function(recipeId) {
        return axios.post("/api/user/" + recipeId)
            .then(res => res.data)
            .catch(err => console.log(err))
    },
    // Save recipe to DB (recipe collection) as object
    saveRecipeToDB: function(recipeObject) {
        return axios.post("/api/recipe", recipeObject )
            .then(res => res.data)
            .catch(err => console.log(err))
    },
    // Delete recipe from recipe collection (can i use same route to delete from recipe collection and user recipe array? adding add. route just in case)
    deleteRecipe: function(recipeId) {
        return axios.delete("/api/recipe/" + id)
            .then(res => res.data)
            .catch(err => console.log(err))
    },
    // Delete recipe ID form user recipe array (may not be needed)
    deleteRecipeFromUser: function(recipeId) {
        return axios.delete("/api/user/" + recipeId) 
            .then(res => res.data)
            .catch(err => console.log(err))
    }
};


// Notes:
    // To throw recipes into shopping cart, do we need to call recipe info in BG, grab each item name, and add to cart?