//======================================================
// Dependencies
//======================================================

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/apiRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//=====================================================
// Routes
//=====================================================

// app.use( (req, res, next) => {

//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE")
//     next();

// });

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use("/api", routes);

app.use((req, res, next) => {
    res.send("Welcome to Express, Backend server is up and running!");
});

//=====================================================
// Connect to the Mongo DB
//=====================================================

//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cookitDB", { useNewUrlParser: true, useUnifiedTopology: true });

// DEV:
mongoose.connect( "mongodb://localhost/cookitDB", { useNewUrlParser: true, useUnifiedTopology: true });

//=====================================================
// Start the server
//=====================================================

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
