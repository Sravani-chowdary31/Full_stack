const express = require('express'); 
const request = require('request');
const app = express();
var http=require('http');
var fs=require('fs');
const session=require("express-session");
const bp=require("body-parser");
const ejs=require("ejs");
const axios=require("axios");
const ph = require("password-hash");


app.set('view engine','ejs');
app.use('/public',express.static('public'));
app.use('/pdf',express.static('pdf'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
}));
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./firestore.json");
 
initializeApp({
    credential: cert(serviceAccount)
  });
  
const db = getFirestore();

app.get('/', function (req, res) {  
  res.sendFile(__dirname+"/public"+"/group2.html");
}) 
  
app.get('/signup', function (req, res) {  
    res.render("signup",{errormessage:""})
})  

  
app.post('/signupSubmit', function (req, res) { 
  db.collection('usersDemo')
  .where("Email","==",req.body.email)
  .get()
  .then((docs)=>{
    if(docs.size>0){
      res.render("signup.ejs",{errormessage:"This account is already existed,Please login"})
    }
    else{
      db.collection('usersDemo').add({
        FullName:req.body.fullname,
        Email:req.body.email,
        Password:ph.generate(req.body.password),
    }).then(()=>{
      res.render("login")
const request = require('Crequest');
})
    }
  }) 
  
})
app.get('/login', function (req, res){
    res.render("login")

})

app.post("/loginSubmit", function (req,res) {  
    console.log(req.body);
    db.collection('usersDemo')
   .where("Email","==",req.body.email)
   .get()
   .then((docs)=>{
    let verified=false;
    docs.forEach((doc)=>{
      verified=ph.verify(req.body.password,doc.data().Password)
    })
    if(verified){
        req.session.authenticated = true;
        res.sendFile(__dirname+"/public"+"/group.html");
    }
    else{
        res.send("Fail")
    }
   })
})
app.get('/cse',(req,res)=>
{
res.sendFile(__dirname+"/public"+"/cse.html");
})
app.get('/aiml',(req,res)=>
{
res.sendFile(__dirname+"/public"+"/aiml.html");
})
app.get('/ece',(req,res)=>
{
res.sendFile(__dirname+"/public"+"/ece.html");
})
app.get('/it',(req,res)=>
{
res.sendFile(__dirname+"/public"+"/it.html");
})
app.get('/eee',(req,res)=>
{
res.sendFile(__dirname+"/public"+"/eee.html");
})
app.get('/aids',(req,res)=>
{
res.sendFile(__dirname+"/public"+"/aids.html");
})
app.get('/mec',(req,res)=>
{
res.sendFile(__dirname+"/public"+"/mec.html");
})
app.get('/civ',(req,res)=>
{
res.sendFile(__dirname+"/public"+"/civ.html");
})
app.get('/csbs',(req,res)=>
{
res.sendFile(__dirname+"/public"+"/csbs.html");
})
var port =5000;
 app.listen(port, () => {
   console.log('server started');
});