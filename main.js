const customer = require("./customer");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const database = require("./database");


app = express(); //means we're creating an instance of web server

app.use(cors());
app.use(bodyparser.json());

app.use(customer.router); //asking my program to also use customer.router

app.listen(3000); //listen to port 3000

