// This file will contain the queries to the customer table
const database = require("./database"); ///takes from database.js
const express = require("express");
var login;

// Allows us to define a mapping from the URI to a function
router = express.Router();


//get all the items available

router.get("/customer/all", (request, response) => {
  database.connection.all("select * from item", (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send(results);
    }
  });
});

  // defines an API which takes id in the request and return the record in response
  router.get("/login", (request, response) => { //http://localhost:3000/customer/id?cid=4
    database.connection.all(
      //`select * from customer where email = "${request.query.email3}" and pwd = "${request.query.pwd3}"`,
      `select shop_order.itemID, shop_order.quantity, shop_order.address, shop_order.order_date, shop_order.shipping_date from customer,shop_order where customer.email = "${request.query.email}" and shop_order.custEmail = "${request.query.email}"and customer.pwd = "${request.query.pwd}"`, //in the query string, get the value of cid
      (errors, results) => {
        if (errors) {
          response.status(500).send("Some error occurred");
        } else {
          response.status(200).send(results);
        }
      }
    );
  });





// a POST API to store the record received in the request
router.post("/customer/add", (request, response) => { 
  database.connection.all(
    
    `insert into customer (email, name, pwd) values ('${request.body.email}','${request.body.name}','${request.body.pwd}')`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("This email is already in use");
      } else {
        response.status(200).send("Record saved successfully!");
      }
    }
  );
});

// POST + PUT = Body, GET + DELETE = Query
router.delete("/customer/delete", (request, response) => { //http://localhost:3000/customer/delete?cid=4http://localhost:3000/customer/delete?cid=4http://localhost:3000/customer/delete?cid=4 need to change delete method to get to use browser for this
  database.connection.all(
    `delete from customer where pwd  = "${request.query.pwd2}" and email = "${request.query.email2}"`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send("Record deleted successfully!");
      }
    }
  );
});

//PUT API to update email address
router.put("/customer/change", (request, response) => { 
  database.connection.all(
    `UPDATE customer
SET pwd = "${request.body.pwd_new}"
WHERE email  = "${request.body.email5}" and pwd  = "${request.body.pwd5}"`, //can use query.cid as well if not confidential
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
