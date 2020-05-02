//======================================================
// Dependencies
//======================================================

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/apiRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//=====================================================
// Routes
//=====================================================

app.use("/api", routes);

app.use((req, res, next) => {
    res.send("Welcome to Express");
});

//=====================================================
// Connect to the Mongo DB
//=====================================================

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cookitDB", { useNewUrlParser: true });

// DEV: mongodb://localhost/cookitDB

//=====================================================
// Start the server
//=====================================================

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
