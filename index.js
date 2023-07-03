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

// Stores the connection string to mongoDB in variable form.
const conn = 'mongodb+srv://web340_admin:%3C3webdev@bellevueuniversity.feyswh3.mongodb.net/?retryWrites=true&w=majority';
// Creates the port number in variable form.
const port = 3000;

// Sets up the connection to MongoDB.
mongoose.connect(conn).then(() => {
  console.log('Connection to MongoDB database was successful');
}).catch(err => {
  console.log('MongoDB Error: ' + err.message);
})

// Sets the directory for the views templates.
app.set('views', path.join(__dirname, 'views'));
// Setting view engine as ejs.
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Post route handling registration.
app.post('/customers', (req, res, next) => {
  // Creates a new instance of the Customer model
  const newCustomer = new Customer({
    customerId: req.body.customerId,
    email: req.body.email
  });

  // Log the newCustomer object to console.
  console.log(newCustomer);

  //Create the new customer in MongoDB.
  Customer.create(newCustomer, function(err, customer) {
    //If an error occurs during registration process, log an error.
    if (err) {
      console.log(err);
      next(err);
    //If registration process is successful, return to the landing page.
    } else {
      res.render('index', {
        title: 'Home'
      })
    }
  })
})

// Starts the server and listens for incoming requests.
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


