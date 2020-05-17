//======================================================
// Dependencies
//======================================================

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//======================================================
// GroceryList Model
//======================================================

const groceryListSchema = new Schema({
   
    title: { 
      type: String,
       required: true
    },
    ingredients: {
       type: Array, 
       required: true 
    }
});

const GroceryList = mongoose.model("GroceryList", groceryListSchema);

module.exports = GroceryList;