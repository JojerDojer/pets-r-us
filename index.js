/*
============================================
; Title: index.js
; Author: John Davidson
; Date: June 18 2023
; Description: Server and route file for pets-r-us assignment.
;===========================================
*/

// Modules
const express = require('express'); // Imports the Express module.
const path = require('path'); // Imports the Path module

// Express Module in the form of the variable app.
const app = express();

// Sets the directory for the views templates.
app.set('views', path.join(__dirname, 'views'));
// Setting view engine as ejs.
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

// Sets 'index' as the root route.
app.get('/', (req, res) => {
    res.render('index');
});

//
app.get('/grooming', (req, res) => {
    res.render('grooming');
});

app.get('/boarding', (req, res) => {
  res.render('boarding');
})

app.get('/training', (req, res) => {
  res.render('training');
})

// Starts the server and listens for incoming requests.
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

// app.set('views', path.join(__dirname, 'views'));
