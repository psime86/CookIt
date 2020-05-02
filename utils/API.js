//===================================================
// Import requires files
//===================================================

import axios from "axios";

// Define API functions inside exported module.

export default {
    // Get recipe from spoonacular by "searchTerm" (query)
    searchRecipe: function(searchTerm) {

        // Define the api key and apiURL
        const key=process.env.SPOONACULAR_API
        
        // Search spoonacular for recipe ("params" may be made into definable options later on)
        return axios({
            "method":"GET",
            "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
            "header":
                {
                "content-type": "application/octet-stream",
                "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": key,
                },
            "params":
                {
                "diet":"vegetarian",
                "excludeIngredients":"coconut",
                "intolerances":"egg%2C gluten",
                "number":"10",
                "offset":"0",
                "type":"main course",
                "query":"burger"
                }
        })
        .then(res => res.data)
        .catch(err => console.log(err))
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
