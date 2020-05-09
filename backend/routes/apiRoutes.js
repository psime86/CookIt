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


        // Validate existence
        
       if(db.User.find({ "uidFB" : UID }).count() > 0) {
        //console.log("data: " + data)
        console.log("User found! Hello: " + userName + "!")
       } else {
           console.log("user not found")
       }
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
    })

module.exports = router;