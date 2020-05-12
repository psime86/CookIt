//======================================================
// Dependencies
//======================================================

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//======================================================
// User Model
//======================================================

const userSchema = new Schema({
    // May not need with FB login
    email: { 
      type: String,
       required: true
    },
    // May not need with FB login
    name: {
       type: String, 
       required: true 
    },
    uidFB: {
        type: Number,
        required: true
    },
    userCreated: {
        type: Date,
        default: Date.now
    },
    // Key to the user model
    recipes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Recipe"
        }
    ],
    shoppingList: [
        {
            type: Schema.Types.ObjectId,
            ref: "GroceryList"
        }
    ]
    
});

const User = mongoose.model("User", userSchema);

module.exports = User;


// Notes: 
// - How do we grab the user id upon login from the DB? 
// - Is the recipes array referencing the right data from the recipe model?