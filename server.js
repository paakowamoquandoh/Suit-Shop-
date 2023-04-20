
const express = require("express");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const path = require("path");

//declare static path
let staticPath = path.join(__dirname, "public");

// express init
const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

// routes
//home
app.get("/", (req, res) =>{
    res.sendFile(path.join(staticPath, "index.html"));
})

//signup route
app.get("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"))
})

app.post("/signup", (req, res) => {
    let {nameValue, emailValue, passwordValue, numberValue, termsAndConditions, notification} = req.body

    //validation
    if (nameValue.length < 3) {
        return res.json({"alert": "name must be 3 letters or more"});
    }else if(!emailValue.length){
        return res.json({"alert": "enter your email"});
    }else if(!passwordValue.length){
        return res.json({"alert": "password should be 8 letters long"});
    }else if(!numberValue.length){
        return res.json({"alert": "enter  phone number"});
    }else if (!Number(numberValue) || numberValue.length < 10) {
        return res.json({"alert": "invalid number, please enter valid number"});
    }else if(!termsAndConditions.checked){
        return res.json({"alert": "you must agree to our terms and conditions"});
    }else{
        //store user in database
    }

    res.json("data recieved");
})

//404
app.get("/404", (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req,res) => {
   res.redirect("/404");
})

app.listen(3000, () => {
    console.log("listening on port 3000......")
})