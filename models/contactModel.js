const mongoose = require('mongoose');

// Define a Mongoose schema for contacts
const contactSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  mobile_number: String
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

