//Imports mongoose module.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create customerSchema with fields for customerId and email.
let customerSchema = new Schema({
  customerId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }
});

// Exports the Customer module.
module.exports = mongoose.model('Customer', customerSchema);
