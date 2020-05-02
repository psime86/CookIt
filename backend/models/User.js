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
    username: { 
      type: String,
       required: true
    },
    // May not need with FB login
    password: {
       type: String, 
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
    ] 
    
});

const User = mongoose.model("User", userSchema);

module.exports = User;


// Notes: 
// - How do we grab the user id upon login from the DB? 
// - Is the recipes array referencing the right data from the recipe model?