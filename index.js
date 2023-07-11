/*
============================================
; Title: index.js
; Author: John Davidson
; Date: June 18 2023
; Description: Server and route file for pets-r-us assignment.
;===========================================
*/

"use strict";

// Modules
const express = require('express'); // Imports the Express module.
const path = require('path'); // Imports the Path module.
const mongoose = require('mongoose'); // Imports mongoose module.

const Customer = require('./models/customer'); // Imports Customer module.

// Express Module in the form of the variable app.
const app = express();

// Sets the directory for the views templates.
app.set('views', path.join(__dirname, 'views'));
// Setting view engine as ejs.
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Stores the connection string to mongoDB in variable form.
const conn = 'mongodb+srv://web340_admin:<3webdev@bellevueuniversity.feyswh3.mongodb.net/web340DB?retryWrites=true&w=majority';
// Creates the port number in variable form.
const port = 3000;

// Sets up the connection to MongoDB.
mongoose.connect(conn).then(() => {
  console.log('Connection to MongoDB database was successful');
}).catch(err => {
  console.log('MongoDB Error: ' + err.message);
})

// Get route for handling the landing URL path.
app.get('/', (req, res) => {
    res.render('index', {
      title: 'Home'
    });
});

// Get route for handling the grooming URL path.
app.get('/grooming', (req, res) => {
    res.render('grooming', {
      title: 'Grooming'
    });
});

// Get route for handling the boarding URL path.
app.get('/boarding', (req, res) => {
  res.render('boarding', {
    title: 'Boarding'
  });
});

// Get route for handling the training URL path.
app.get('/training', (req, res) => {
  res.render('training', {
    title: 'Training'
  });
});

// Get route for handling the register URL path.
app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Registration'
  });
});

// If data is stored in the database successfully, render the home page.
app.post('/customer-list', (req, res, next) => {
  console.log(req.body.customerId);
  console.log(req.body.email);
  const newCustomer = new Customer({
      customerId: req.body.customerId,
      email: req.body.email
  })

  console.log(newCustomer);

  Customer.create(newCustomer)
  .then (() => {
    res.render('index', {
      title: 'Home'
    })
  })
  .catch((err) => {
    console.log("Customer failed to register")
  })
})

// Get route for handling the customer-list page that displays the customer list data.
app.get('/customer-list', (req, res) => {
  Customer.find({})
  .then ((results) => {
    res.render('customer-list', {
      title: 'Customer List',
      customers: results
    })
  })
  .catch((err) => {
    console.log(err);
  })
})




// Starts the server and listens for incoming requests.
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


