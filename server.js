const express = require("express");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const path = require("path");

//firebase
let serviceAccount = require("./suit-shopper-firebase-adminsdk-ky59r-eea8ac3b18.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let dB = admin.firestore();


const dotnev = require("dotenv");

dotnev.config();





//declare static path
let staticPath = path.join(__dirname, "./");

// express init
const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

// routes
//home
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

//signup route
app.get("/signup", (req, res) => {
  res.sendFile(path.join(staticPath, "signup.html"));
});

app.post("/signup", (req, res) => {
  let { name, email, password, number, termsAndConditions, notification } =
    req.body;
  console.log(req.body);
  //validation
  if (name.length < 3) {
    return res.json({ alert: "name must be 3 letters or more" });
  } else if (!email.length) {
    return res.json({ alert: "enter your email" });
  } else if (!password.length) {
    return res.json({ alert: "password should be 8 letters long" });
  } else if (!number.length) {
    return res.json({ alert: "enter  phone number" });
  } else if (!Number(number) || number.length < 10) {
    return res.json({ alert: "invalid number, please enter valid number" });
  } else if (!termsAndConditions) {
    return res.json({ alert: "you must agree to our terms and conditions" });
  }
  //store user in database
  dB.collection("users")
    .doc(email)
    .get()
    .then((user) => {
      if (user.exists) {
        return res.json({ alert: "email already exists" });
      } else {
        //encrypt and store password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            dB.collection("users")
              .doc(email)
              .set(req.body)
              .then((data) => {
                res.json({
                  name: req.body.name,
                  email: req.body.email,
                  seller: req.body.seller,
                });
              });
          });
        });
      }
    });
});

//login route
app.get("/login", (req, res) => {
  res.sendFile(path.join(staticPath, "login.html"));
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (!email.length || !password.length) {
    return res.json({ alert: "fill all inputs" });
  }

  dB.collection("users")
    .doc(email)
    .get()
    .then((user) => {
      if (!user.exists) {
        return res.json({ alert: "Log in email does not exist" });
      } else {
        bcrypt.compare(password, user.data().password, (err, result) => {
          if (result) {
            let data = user.data();
            return res.json({
              name: data.name,
              email: data.email,
              seller: data.seller,
            });
          } else {
            return res.json({ alert: "password in incorrect" });
          }
        });
      }
    });
});

//admin
app.get("/admin", (req,res) => {
  res.sendFile(path.join(staticPath, "admin.html"));
})

app.post("/admin", (req,res) => {
  let {name, about, address,number, tAndC, validInfo, email} = req.body;
  if (!name.length || !address.length || !about.length || number.lenght < 10 || !Number(number)) { 
    return res.json({"alert": "some information(s) is/are invalid"});   
  }else if(!tAndC || !validInfo){
    return res.json({"alert": "agree to our terms and conditions"}); 
  }else{
    //update admin status
    dB.collection("admin").doc(email).set(req.body)
    .then(data => {
      dB.collection("users").doc(email).update({
        admin: true
      }).then(data => {
          res.json(true);
      })
    })
  }
})

//add product
app.get("/addProduct", (req,res) => {
  res.sendFile(path.join(staticPath, "addProduct.html"));
})

//get upload link
app.get("/S3url", (req,res) => {
  generateUrl().then(url => res.json(url));
})

//404
app.get("/404", (req, res) => {
  res.sendFile(path.join(staticPath, "404.html"));
});

app.use((req, res) => {
  res.redirect("/404");
});

app.listen(4001, () => {
  console.log("listening on port 4001......");
});
