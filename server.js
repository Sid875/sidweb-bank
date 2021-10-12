const HTTP_PORT = process.env.PORT || 3000;

const express = require("express");											//	require express as web application framework
const hbs = require('hbs');								//	require handlebars as templating engine 
var fs = require("fs");
var bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
const { setUncaughtExceptionCaptureCallback } = require("process");
const e = require("express");

const app = express();
app.set('view engine', 'hbs')

var rawdata = fs.readFileSync('user.json');
var Users = JSON.parse(rawdata);


app.get("/", function(req,res){
    res.render('login')
});

app.post("/",urlencodedParser, function(req,res){
    var email = req.body.txtEmail;
    var password = req.body.txtPassword;
    if(Users.hasOwnProperty(email)){
       console.log("Trigger Check");
       var cPassword = Users[email];
       if(cPassword===password){
           console.log("cPass Check");
           res.render('mainPage',{whatever: email})
       }
       else{
           res.render('login', {errors: "Invalid Password!"});
       }
    }
    else{
           res.render('login', {errors: "Invalid Username!"})
    }
});

const server = app.listen(HTTP_PORT, function() {
    console.log(`Listening on port ${HTTP_PORT}`);
});