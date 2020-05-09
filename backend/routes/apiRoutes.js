//======================================================
// Dependencies
//======================================================

const express = require("express");
const router = express.Router();
const db = require("../models/index")

//======================================================
// Routes
//======================================================

    router.post("/user", (req, res) => {
        console.log("hit the USER post route!");
        console.log("fb user data: " + req.body.name )
        console.log("fb UID: " + req.body.uidFB)
        const UID = req.body.uidFB;
        const userName = req.body.name;
        const userEmail = req.body.email;
        let noUsers = false;

        // Check to see if there are any documents in "User Collection"
        db.User.find({}).countDocuments()
            .then(res => {
                console.log("count")
                console.log(res)

                // If there are no documents, create one
                if (res == 0) {

                    db.User.create({
                        "email": userEmail,
                        "name" : userName,
                        "uidFB": UID
                    })
                    .then(res => {
                        console.log(res)
                        // Once dummy user is inserted into DB, change boolean to false to start validating and creating users
                        noUsers = false;
                    })
                    .catch(err => console.log(err))
                    
                  // Otherwise, search through documents and try to match to UID  
                } else {

                    // Search DB User collection for all documents 
                    db.User.find({})
                        .then(res => {
                            console.log(res)

                            // Loop through the results of the collection and try to find a matching UID/uidFB
                            res.some(res => {

                                console.log(res.uidFB)
                                console.log(UID)
                        
                                //If match is found, confirm
                                if(res.uidFB == UID) {
                                    console.log("User found in DB. Hello: " + userName + "!")
                                    return true;

                                    // If match isn't found.... create new user 
                                }   else {
                                    console.log("User not in DB..... adding to database now...")
                                    //Create new user
                                    return db.User.create({
                                        "email": userEmail,
                                        "name" : userName,
                                        "uidFB": UID
                                    })
                                    .then(res => {
                                        console.log(res)
                                        console.log("User: " + "'" +userName + "'" + " added to DB successfully!")
                                    })
                                    .catch(err => console.log(err))
                                }
                            })
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))  

    })

    //=============== Basic create user query =================//

        // Create a user to start building DB
        // db.User.create({
        //     "email": userEmail,
        //     "name" : userName,
        //     "uidFB": UID
        // })
        // .then(res => {
        //     console.log(res)
        // })
        // .catch(err => console.log(err))



    //=============== An attempt to validate by count.... works in Robo3t as (db.getCollection('users').find({"uidFB" : "107122224331841"}).count()) ==============//

        // Validate existence
        
    //    if(db.User.find({ "uidFB" : UID }).count() > 0) {
    //     //console.log("data: " + data)
    //     console.log("User found! Hello: " + userName + "!")
    //    } else {
    //        console.log("user not found")
    //    }
            // .then(data => {
            //     res.json(data)
            //     console.log("data: " + data)
            //     console.log("User found! Hello: " + userName + "!")

            //     if (data === null) {
            //         console.log("User is not found in database")
            //         db.User.create({
            //             "email": userEmail,
            //             "name" : userName,
            //             "uidFB": UID
            //         })
            //         .then(res => {
            //             console.log(res)
            //             console.log("User for: " + userName + " Has now been created!")
            //         })
            //         .catch(err => console.log(err))
            //     }
            // })
            // .catch(err => console.log(err))

        ///==========Search based on looping through documents and matching by uidFB to UID from login==============//

        // // Search DB User collection for all documents ( !!!this is flawed if no documents are inside the collection!!! ~~~~~~~~~~FIX THIS SOMEHOW~~~~~~~~~ )
        // db.User.find({})
        // .then(res => {
        //     console.log(res)
        //     // Loop through the results of the collection and try to find a matching UID/uidFB
        //     res.map(res => {
        //         console.log(res.uidFB)
        //         console.log(UID)
        //         console.log()
        //         //If match is found, confirm
        //         if(res.uidFB == UID) {
        //             console.log("User found in DB. Hello: " + userName + "!")
        //             // If match isn't found.... create new user 
        //         }   else {
        //             console.log("User not in DB..... adding to database now...")
        //             //Create new user
        //             db.User.create({
        //                 "email": userEmail,
        //                 "name" : userName,
        //                 "uidFB": UID
        //             })
        //             .then(res => {
        //                 console.log(res)
        //                 console.log("User: " + "'" +userName + "'" + " added to DB successfully!")
        //             })
        //             .catch(err => console.log(err))
        //         }
        //     })
        // })
        // .catch(err => console.log(err))

    
    // Create Recipe Object, and push id (DB id) to User "recipes" Array
    router.post("/recipe", (req, res) => {
        console.log("hit the RECIPE post route!");
        console.log(req.body)
        console.log(req.body.user)
        const userReference = req.body.user
        
        // Create recipe here
        db.Recipe.create({
            "title": req.body.title,
            "readyIn": req.body.readyInMinutes,
            "servings": req.body.servings,
            "link": req.body.sourceUrl,
            "recipeId": req.body.id
        })
        .then(res => {
            console.log("response from creating recipe document: " + res)

            // Assign recipe id (DB Id) to variable to use to push later on
            let dbRecipeId = res._id

            // Search for matching user to "req.body.user"
            db.User.find({})
            
            .then(res => {
                
                // Loop through the User documents and search for a matching "uidFB" (should match JSON.parse(userReference))
                for (let i=0; i< res.length; i++) {

                    console.log(res[i].uidFB)
                    console.log(JSON.parse(userReference))

                    // Use conditional statement to look for a match
                    if (res[i].uidFB == JSON.parse(userReference)) {
                        let match = res._id
                        console.log("Match found!")

                        // When a match is found, add the recipe id (DB Id) to recipes array
                        db.User.findOneAndUpdate
                        (
                            {"id": match},
                            {$push: { "recipes": dbRecipeId}}
                        ).then(res => {
                            console.log(res)
                            console.log("recipe added to user")
                            
                        }).catch(err => console.log(err))
                    } else {
                        // If no match is found... log
                        console.log("no match to USER uid")
                    }
                }
            })
        })          
    })

module.exports = router;