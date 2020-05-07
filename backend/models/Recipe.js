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
    ingredients: {
       type: String, 
       required: true 
    },
    description: {
        type: String,
        required: true
    },
    image: { 
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    recipeId: {
        type: Number,
        required: true
    }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;