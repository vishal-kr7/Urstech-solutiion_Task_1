// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config(); // Load environment variables from .env file
// const mongoose = require('mongoose');

// const app = express();
// const PORT = process.env.PORT || 3000;

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Define a Mongoose schema for contacts
// const contactSchema = new mongoose.Schema({
//   first_name: String,
//   last_name: String,
//   email: String,
//   mobile_number: String
// });

// const Contact = mongoose.model('Contact', contactSchema);

// // const BASE_URL = 'https://narzokumarprdp494.freshsales.io/api'; // double-check this

// const BASE_URL = process.env.BASE_URL; // Get BASE_URL from .env
// const API_KEY = process.env.API_KEY;   // Get API_KEY from .env

// // Middleware to parse JSON and enable CORS
// app.use(bodyParser.json());
// app.use(cors());

// // Sample route to test server
// app.get('/', (req, res) => {
//   res.send('FreshSales CRM Task Server Running');
// });

// // Function to create a contact in Freshworks CRM
// async function createContactInCRM(data) {
//     const axiosConfig = {
//       headers: {
//         Authorization: `Token token=${API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     };
  
//     return await axios.post(`${BASE_URL}/api/contacts`, data, axiosConfig);
//   }
  
//   // Function to create a contact in MongoDB
//   async function createContactInDB(contactData) {
//     const newContact = new Contact(contactData);
//     return await newContact.save();
//   }

// app.post('/createContact', async (req, res) => {
//     let response = null;
//     const { data_store, first_name, last_name, email, mobile_number } = req.body;
  
//     if (!first_name || !last_name || !email || !mobile_number) {
//       return res.status(400).json({ error: 'Missing required contact fields' });
//     }
  
//     // Prepare contact data
//     const data = {
//       contact: {
//         first_name: first_name,
//         last_name: last_name,
//         email: email,
//         mobile_number: mobile_number,
//       },
//     };
//     console.log(data_store)
//     try {
//       if (data_store === 'CRM') {
//         response = await createContactInCRM(data);
//         return res.status(201).json(response.data);
//       } else if (data_store === 'database') {
//         response = await createContactInDB(data.contact);
//         return res.status(201).json(response);
//       } else {
//         return res.status(400).json({ error: 'Invalid data_store value' });
//       }
//     } catch (error) {
//       handleError(res, error);
//     }
//   });
  
//   // Error handling function
//   function handleError(res, error) {
//     if (error.response) {
//       console.error('Error:', error.response.data);
//       res.status(error.response.status).json({ error: error.response.data });
//     } else if (error.request) {
//       console.error('No response received:', error.request);
//       res.status(500).json({ error: 'No response from API' });
//     } else {
//       console.error('Error:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   }
  
  

// // POST /updateContact
// app.put('/updateContact', async (req, res) => {
//     let response = null;
//     try {
//       console.log('Updating contact...');
  
//       // Ensure that the request body contains the necessary fields
//       const { id, email, mobile_number } = req.body;
//       console.log(req.body);
  
//       if (!id || !email || !mobile_number) {
//         return res.status(400).json({ error: 'Missing required contact fields' });
//       }
  
//       // Prepare contact data
//       const data = {
//         contact: {
//           id: id,
//           email: email,
//           mobile_number: mobile_number,
//         },
//       };
  
//       const axiosConfig = {
//         headers: {
//           Authorization: `Token token=${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       };
  
//       // Send POST request to FreshSales API to create contact
//       response = await axios.put(`${BASE_URL}/api/contacts/${id}`, data, axiosConfig);
  
//       // Return the API response
//       console.log("success");
//       res.status(201).json(response.data);
//     } catch (error) {
//       if (error.response) {
//         // Error response from FreshSales
//         console.error('Error updating contact:', error.response.data);
//         res.status(error.response.status).json({ error: error.response.data });
//       } else if (error.request) {
//         // No response received from FreshSales
//         console.error('No response received:', error.request);
//         res.status(500).json({ error: 'No response from FreshSales API' });
//       } else {
//         // Something went wrong while setting up the request
//         console.error('Error updating contact(Something went wrong while setting up the request):', error.message);
//         res.status(500).json({ error: 'Error creating contact: ' + error.message });
//       }
//     }
//   });

// app.get('/getContact/:id', async (req, res) => {
//     const contactId = req.params.id;
//     let response = null;
  
//     try {
//       console.log(`Retrieving contact with ID: ${contactId}`);
      
//     //   const BASE_URL = 'https://your_correct_domain_here.freshsales.io/api'; // Update with your domain
//     //   const API_KEY = 'your_actual_api_key_here'; // Update with your API key
  
//       const axiosConfig = {
//         headers: {
//           Authorization: `Token token=${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       };
  
//       response = await axios.get(`${BASE_URL}/api/contacts/${contactId}`, axiosConfig);
  
//       // Return the API response
//       res.status(200).json(response.data);
//     } catch (error) {
//       if (error.response) {
//         console.error('Error retrieving contact:', error.response.data);
//         res.status(error.response.status).json({ error: error.response.data });
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//         res.status(500).json({ error: 'No response from FreshSales API' });
//       } else {
//         console.error('Error retrieving contact:', error.message);
//         res.status(500).json({ error: 'Error retrieving contact: ' + error.message });
//       }
//     }
//   });

//   app.delete('/deleteContact/:id', async (req, res) => {
//     const contactId = req.params.id;
//     let response = null;
  
//     try {
//       console.log(`Deleting contact with ID: ${contactId}`);
      
//     //   const BASE_URL = 'https://your_correct_domain_here.freshsales.io/api'; // Update with your domain
//     //   const API_KEY = 'your_actual_api_key_here'; // Update with your API key
  
//       const axiosConfig = {
//         headers: {
//           Authorization: `Token token=${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       };
  
//       response = await axios.delete(`${BASE_URL}/api/contacts/${contactId}`, axiosConfig);
  
//       // Return the API response
//       res.status(200).json(response.data);
//     } catch (error) {
//       if (error.response) {
//         console.error('Error deleting contact:', error.response.data);
//         res.status(error.response.status).json({ error: error.response.data });
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//         res.status(500).json({ error: 'No response from FreshSales API' });
//       } else {
//         console.error('Error deleting contact:', error.message);
//         res.status(500).json({ error: 'Error deleting contact: ' + error.message });
//       }
//     }
//   });
  

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON and enable CORS
app.use(bodyParser.json());
app.use(cors());

// Sample route to test server
app.get('/', (req, res) => {
  res.send('FreshSales CRM Task Server Running');
});

// Use contact routes
app.use('/api', contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
