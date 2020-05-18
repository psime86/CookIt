//======================================================
// Dependencies
//======================================================

const express = require("express");
const router = express.Router();
const db = require("../models/index")

//======================================================
// Routes
//======================================================

    //===================================================================================================================================================================================================
    // Route to "/user", to Check if User collection holds any documents, if not create, else check User collection for document with matching UID, if no match found, create new User document.
    //===================================================================================================================================================================================================
    
    router.post("/user", (req, res) => {
        console.log("hit the USER post route! (BACKEND)");
        console.log("fb user data: " + req.body.name )
        console.log("fb UID: " + req.body.uidFB)
        const UID = req.body.uidFB;
        const userName = req.body.name;
        const userEmail = req.body.email;
        let match = false;
        // Check to see if there are any documents in "User Collection"
        db.User.find({}).countDocuments()
            .then(data => {
                console.log("count (BACKEND)")
                console.log(data)
                // If there are no documents, create one
                if (data == 0) {
                    console.log("No documents in User collection, creating document for this user now. (BACKEND)")
                    db.User.create({
                        "email": userEmail,
                        "name" : userName,
                        "uidFB": UID
                    })
                    .then(data => {
                        console.log(data)
                        // Once dummy user is inserted into DB, change boolean to false to start validating and creating users
                        console.log("Returning DB '_id' to front end. (BACKEND)")
                        res.json(data._id)   
                    })
                    .catch(err => console.log(err))
                  // Otherwise, search through documents and try to match to UID  
                } else {
                    // Search DB User collection for all documents 
                   return db.User.find({})
                        .then(data => {
                            console.log(data)
                            // Loop through the results of the collection and try to find a matching UID/uidFB
                            for ( let i =0; i< data.length; i++) {
                                console.log(data[i].uidFB)
                                console.log(UID)
                                //If match is found, confirm
                                if(data[i].uidFB == UID) {
                                    console.log("User found in DB. Hello: " + userName + "! (BACKEND)")
                                    match = true
                                    console.log("Returning DB '_id' to front end. (BACKEND)")
                                   return res.json(data[i]._id)
                                    // If match isn't found.... create new user 
                                }   else {
                                    console.log("No matches to the inputted user... (BACKEND)") 
                                }
                            }
                            if (match == false) {
                                    console.log("No match found in DB... adding user now (BACKEND)")
                                    //Create new user
                                    return db.User.create({
                                        "email": userEmail,
                                        "name" : userName,
                                        "uidFB": UID
                                    })
                                    .then(data => {
                                        console.log(data)
                                        console.log("User: " + "'" +userName + "'" + " added to DB successfully! (BACKEND)")
                                        console.log("Returning DB '_id' to front end. (BACKEND)")
                                        res.json(data._id)
                                    })
                                    .catch(err => console.log(err)) 
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))  
    })

    //=====================================================================================================================================================================
    // Route to "/recipe" to create Recipe document, match UserUID to User document in User collection and push id (DB id) to User document "recipes" array.
    //=====================================================================================================================================================================

    router.post("/recipe", (req, res) => {
        console.log("hit the RECIPE post route! (BACKEND)");
        console.log(req.body)
        console.log(req.body.user)
        const userReference = req.body.user
        let match = false
        // Validate
        db.User.findById({ _id: userReference }).populate("recipes")
            .then(data => {
                console.log(data)
                // If no recipes iin recipe array, create doc and add
                if ( !data.recipes.length) {
                    console.log("no recipes in found for this user!")
                    // Create Recipe document here
                    db.Recipe.create({
                        "title": req.body.title,
                        "readyIn": req.body.readyInMinutes,
                        "servings": req.body.servings,
                        "link": req.body.sourceUrl,
                        "recipeId": req.body.id
                    })
                    .then(data => {
                        console.log("response from creating Recipe document: " + data)
                        // Assign Recipe "_id" (DB Id) to variable to use to push later on
                        let dbRecipeId = data._id
                        // Update User document
                        return db.User.findOneAndUpdate
                            (
                                {_id: userReference},
                                {$push: { "recipes": dbRecipeId}}
                            ).then(data => {
                                console.log(data)
                                console.log("Recipe '_id' added to User 'recipes' array! (BACKEND)")
                                console.log("attempting to return data from recipe route (BACKEND)")
                                return res.json(data)    
                            }).catch(err => console.log(err))
                    }) 
                } else {
                    for (let i=0; i< data.recipes.length; i++) {
                        console.log(data.recipes[i].recipeId)
                        console.log(req.body.id)
                        if(data.recipes[i].recipeId == req.body.id) {
                            match = true
                            console.log("This recipe is already in your favorites. (BACKEND)")
                            const exists = "This recipe is already in your favorites"
                            res.json(exists)
                            break;
                        } else{
                            console.log("No match found in User recipe array, creating document and adding now (BACKEND)")
                        }
                    }
                    // If match = false after the loop then create
                        if (match == false) {
                            db.Recipe.create({
                                "title": req.body.title,
                                "readyIn": req.body.readyInMinutes,
                                "servings": req.body.servings,
                                "link": req.body.sourceUrl,
                                "recipeId": req.body.id
                            })
                            .then(data => {
                                console.log("response from creating Recipe document: " + data)
                                // Assign Recipe "_id" (DB Id) to variable to use to push later on
                                let dbRecipeId = data._id
                                // Update User document
                                return db.User.findOneAndUpdate
                                    (
                                        {_id: userReference},
                                        {$push: { "recipes": dbRecipeId}}
                                    ).then(data => {
                                        console.log(data)
                                        console.log("Recipe '_id' added to User 'recipes' array! (BACKEND)")
                                        console.log("attempting to return data from recipe route (BACKEND)")
                                        return res.json(data)     
                                    }).catch(err => console.log(err))
                            }) 
                        }
                }
            })        
    })

    //=====================================================================================================================================================================
    // Route to "/grocery" to create GroceryList document, match UserUID to User document in User collection and push id (DB id) to User document "shoppingList" array.
    //=====================================================================================================================================================================
    
    router.post("/grocery", (req, res) => {
        console.log("hit the GROCERY post route! (BACKEND)");
        console.log(req.body)
        console.log(req.body.user)
        const userReference = req.body.user
        let match = false;
        // Validate
        db.User.findById({ _id: userReference }).populate("shoppingList")
            .then(data => {
                console.log(data)
                // If no recipes in shoppingList array, create doc and add
                if ( !data.shoppingList.length) {
                    console.log("no Grocery Lists found for this user!")
                    // Create GroceryList document here
                    db.GroceryList.create({
                        "title": req.body.name,
                        "ingredients": req.body.ingredients
                    })
                    .then(data => {
                        console.log("response from creating GroceryList document: " + data)
                        // Assign GroceryList "_id" (DB Id) to variable to use to push later on
                        let dbGroceryListId = data._id
                        return db.User.findOneAndUpdate
                            (
                                { _id: userReference },
                                {$push: { shoppingList: dbGroceryListId}}
                            ).then(data => {
                                console.log(data)
                                console.log("GroceryList '_id' added to User 'shoppingList' array (BACKEND)")
                                console.log("attempting to return data from grocery route (BACKEND)")
                                return res.json(data)         
                            }).catch(err => console.log(err)) 
                    })
                    .catch(err => console.log(err))
                } else {
                    for (let i=0; i< data.shoppingList.length; i++) {
                        console.log(data.shoppingList[i].title)
                        console.log(req.body.name)
                        if(data.shoppingList[i].title == req.body.name) {
                            match = true
                            console.log("This recipe is already in your Grocery List. (BACKEND)")
                            const exists = "This recipe is already in your Grocery List."
                            res.json(exists)
                            break;
                        } else{
                            console.log("No match found in User shoppingList array. (BACKEND)")
                        }
                    }
                    // If match = false after the loop then create doc
                        if (match == false) {
                            // Create GroceryList document here
                            db.GroceryList.create({
                                "title": req.body.name,
                                "ingredients": req.body.ingredients
                            })
                            .then(data => {
                                console.log("response from creating GroceryList document: " + data)
                                // Assign GroceryList "_id" (DB Id) to variable to use to push later on
                                let dbGroceryListId = data._id
                                return db.User.findOneAndUpdate
                                    (
                                        { _id: userReference },
                                        {$push: { shoppingList: dbGroceryListId}}
                                    ).then(data => {
                                        console.log(data)
                                        console.log("GroceryList '_id' added to User 'shoppingList' array (BACKEND)")
                                        console.log("attempting to return data from grocery route (BACKEND)")
                                        return res.json(data)            
                                    }).catch(err => console.log(err))         
                            })
                            .catch(err => console.log(err))
                        }
                }
            })
    })

    //====================================================================================================================================
    // Find user by '_id' then return populated
    //====================================================================================================================================

    router.get("/findUser/:id", (req, res) => {
        console.log("hit the 'findUser' get route! (BACKEND)");
        // console.log("params: " + req.params.UserUID)
        // const userReference = req.params.UserUID
        return db.User.find({_id: req.params.id}).populate('recipes').populate('shoppingList')
        .then(data =>  res.json(data) )
        .catch(err => console.log(err))
    })

    //===================================================================================================================================
    // Find Recipe document by '_id' and delete from collection, then remove '_id' from User documents "recipe" array.
    //===================================================================================================================================

    router.delete("/deleteFavRecipe", (req, res) =>{
        console.log("Hit the 'deleteFavRecipe' route! (BACKEND)")
        console.log(req.body)
        let userReference = req.body.user
        let recipeDBId = req.body.recipeDBId
        console.log(userReference)
        db.Recipe.findByIdAndDelete(
            {_id: recipeDBId}
        )
        .then(() => {
            console.log("Recipe deleted from DB Recipe collection (BACKEND)")
           return db.User.findByIdAndUpdate(
                {_id: userReference},
                { $pull: { recipes: recipeDBId}}
            )
            .then(data => {
                console.log(data)
                console.log("Recipe '_id' removed from User document (BACKEND)")
                console.log("Now attempting to return data from delete route (BACKEND)")
                res.json(data)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })

    //===================================================================================================================================
    // Find GroceryList document by '_id' and delete from collection, then remove '_id' from User documents "shoppingList" array.
    //===================================================================================================================================

    router.delete("/deleteGroceryList", (req, res) =>{
        console.log("Hit the 'deleteFavRecipe' route! (BACKEND)")
        console.log(req.body)
        let userReference = req.body.user
        let groceryListDBId = req.body.groceryListDBId
        console.log(userReference)
        db.GroceryList.findByIdAndDelete(
            {_id: groceryListDBId}
        )
        .then(() => {
            console.log("GroceryList deleted from DB GroceryList collection (BACKEND)")
           return db.User.findByIdAndUpdate(
                {_id: userReference},
                { $pull: { shoppingList: groceryListDBId}}
            )
            .then(data => {
                console.log(data)
                console.log("GroceryList '_id' removed from User document (BACKEND)")
                console.log("Now attempting to return data from delete route (BACKEND)")
                res.json(data)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })


module.exports = router;