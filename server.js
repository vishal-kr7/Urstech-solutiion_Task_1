const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and enable CORS
app.use(bodyParser.json());
app.use(cors());

let contacts = []; // In-memory array to store contacts

// POST /createContact - Create a new contact
app.post('/createContact', (req, res) => {
  const { first_name, last_name, email, mobile_number } = req.body;
  
  // Basic validation
  if (!first_name || !last_name || !email || !mobile_number) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  const newContact = {
    id: contacts.length + 1,  // Simple way to generate ID
    first_name,
    last_name,
    email,
    mobile_number
  };

  contacts.push(newContact);
  res.status(201).json({ message: 'Contact created successfully', contact: newContact });
});

// GET /getContacts - Retrieve all contacts
app.get('/getContacts', (req, res) => {
  res.status(200).json(contacts);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
