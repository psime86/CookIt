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
        console.log("hit the post route! (user)");
        console.log("fb user data: " + req.body.name )
        console.log("fb UID: " + req.body.uidFB)
        const UID = req.body.uidFB;
        const userName = req.body.name;
        const userEmail = req.body.email;
        let noUsers = true;

        if (noUsers === true) {
            // Create a user to start building DB
            db.User.create({
                "email": "dummyUser@gmail.com",
                "name" : "dummy",
                "uidFB": 000000000000000
            })
            .then(res => {
                console.log(res)
                // Once dummy user is inserted into DB, change boolean to false to start validating and creating users
                noUsers = false;
            })
            .catch(err => console.log(err))

        } else {

            // Search DB User collection for all documents ( !!!this is flawed if no documents are inside the collection!!! ~~~~~~~~~~FIX THIS SOMEHOW~~~~~~~~~ )
            db.User.find({})
            .then(res => {
                console.log(res)
                // Loop through the results of the collection and try to find a matching UID/uidFB
                res.map(res => {
                    console.log(res.uidFB)
                    console.log(UID)
                    
                    //If match is found, confirm
                    if(res.uidFB == UID) {
                        console.log("User found in DB. Hello: " + userName + "!")
                        // If match isn't found.... create new user 
                    }   else {
                        console.log("User not in DB..... adding to database now...")
                        //Create new user
                        db.User.create({
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

    })

module.exports = router;