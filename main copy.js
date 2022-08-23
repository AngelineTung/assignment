const customer = require("./customer");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dir = __dirname.split('backend')[0];
const { auth,requiresAuth } = require('express-openid-connect');
require('dotenv').config();
const path = require('path');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER
};


app = express(); //means we're creating an instance of web server

app.use(cors());
app.use(bodyparser.json());
app.use(auth(config));
// req.isAuthenticated is provided from the auth router



app.get('/',requiresAuth(), function(req,res){
   res.send(JSON.stringify(req.oidc.user))
   res.sendFile(path.join(dir+'frontend-master/index.html'));
 //res.sendFile(path.join(__dirname+ 'frontend/index_org.html'));
   //res.send(JSON.stringify(req.oidc.user))
 });



app.get('/login', requiresAuth(),(req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in": 'Not logged in');
});

// auth router attaches /login, /logout, and /callback routes to the baseURL


app.get('/profile', requiresAuth(), (req, res)=> {
  res.send(JSON.stringify(req.oidc.user))
});




app.use(customer.router); //asking my program to also use customer.router

app.listen(3000); //listen to port 3000