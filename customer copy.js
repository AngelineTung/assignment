// This file will contain the queries to the customer table
const database = require("./database"); ///takes from database.js
const express = require("express");


// Allows us to define a mapping from the URI to a function
router = express.Router();

// can be used to define a GET API.   URI -> CB function.
router.get("/customer/all", (request, response) => {
  database.connection.all("select * from customer", (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send(results);
    }
  });
});

// defines an API which takes id in the request and return the record in response
router.get("/customer/all", (request, response) => { //http://localhost:3000/customer/id?cid=4
  database.connection.all(
    `select * from shop_order where name = ${request.query.cid1}`, //in the query string, get the value of cid
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send(results);
      }
    }
  );
});



//Note: use query instead of all for MySQL - database.connection.query("select * from customer"



// a POST API to store the record received in the request
router.post("/customer/add", (request, response) => { 
  database.connection.all(
    `insert into customer (email, name, pwd) values ('${request.body.email}','${request.body.name}','${request.body.pwd}')`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send("Record saved successfully!");
      }
    }
  );
});

// POST + PUT = Body, GET + DELETE = Query
router.delete("/customer/delete", (request, response) => { //http://localhost:3000/customer/delete?cid=4http://localhost:3000/customer/delete?cid=4http://localhost:3000/customer/delete?cid=4 need to change delete method to get to use browser for this
  database.connection.all(
    `delete from customer where name  = ${request.query.cid}`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send("Record deleted successfully!");
      }
    }
  );
});

//PUT API to update password
router.put("/customer/change", (request, response) => { 
  database.connection.all(
    `UPDATE customer
SET pwd = "${request.body.pwd}"
WHERE name  = ${request.name.cid}`, //can use query.cid as well if not confidential
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send("Record saved successfully!");
      }
    }
  );
});




module.exports = {
  router,
};
