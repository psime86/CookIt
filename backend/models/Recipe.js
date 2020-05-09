//======================================================
// Dependencies
//======================================================

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//======================================================
// Recipe Model
//======================================================

const recipeSchema = new Schema({
    title: { 
      type: String,
       required: true
    },
    readyIn: {
        type: Number
    },
    servings: {
        type: Number,
    },
    link: {
        type: String,
    },
    recipeId: {
        type: Number,
        required: true
    }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;