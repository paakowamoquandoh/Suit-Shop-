//package import
const express = require("express");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const path = require("path");

// express init
const app = express();

// routes
//home
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.listen(3000, () => {
    console.log("listening on port 3000......")
})