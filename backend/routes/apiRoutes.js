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
    })

module.exports = router;