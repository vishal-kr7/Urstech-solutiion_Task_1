const axios = require('axios');
const Contact = require('../models/contactModel');
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

// Function to create a contact in Freshworks CRM
async function createContactInCRM(data) {
  const axiosConfig = {
    headers: {
      Authorization: `Token token=${API_KEY}`,
      'Content-Type': 'application/json',
    },
  };
  return await axios.post(`${BASE_URL}/api/contacts`, data, axiosConfig);
}

// Function to create a contact in MongoDB
async function createContactInDB(contactData) {
  const newContact = new Contact(contactData);
  return await newContact.save();
}

// Create Contact
async function createContact(req, res) {
  let response = null;
  const { data_store, first_name, last_name, email, mobile_number } = req.body;

  if (!first_name || !last_name || !email || !mobile_number) {
    return res.status(400).json({ error: 'Missing required contact fields' });
  }

  const data = {
    contact: {
      first_name,
      last_name,
      email,
      mobile_number,
    },
  };

  try {
    if (data_store === 'CRM') {
      response = await createContactInCRM(data);
      return res.status(201).json(response.data);
    } else if (data_store === 'database') {
      response = await createContactInDB(data.contact);
      return res.status(201).json(response);
    } else {
      return res.status(400).json({ error: 'Invalid data_store value' });
    }
  } catch (error) {
    handleError(res, error);
  }
}

// Error handling function
function handleError(res, error) {
  if (error.response) {
    console.error('Error:', error.response.data);
    res.status(error.response.status).json({ error: error.response.data });
  } else if (error.request) {
    console.error('No response received:', error.request);
    res.status(500).json({ error: 'No response from API' });
  } else {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
}


// Update Contact in CRM
async function updateContactInCRM(contactId, data) {
    const axiosConfig = {
      headers: {
        Authorization: `Token token=${API_KEY}`,
        'Content-Type': 'application/json',
      },
    };
    return await axios.put(`${BASE_URL}/api/contacts/${contactId}`, data, axiosConfig);
  }
  
  // Update Contact in MongoDB
  async function updateContactInDB(contactId, updateData) {
    return await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
  }
  
  // Update Contact
  async function updateContact(req, res) {
    let response = null;
    const { data_store, id, email, mobile_number } = req.body;
  
    if (!id || !email || !mobile_number) {
      return res.status(400).json({ error: 'Missing required contact fields' });
    }
  
    const data = {
      contact: {
        email,
        mobile_number,
      },
    };
  
    try {
      if (data_store === 'CRM') {
        response = await updateContactInCRM(id, data);
        return res.status(200).json(response.data);
      } else if (data_store === 'database') {
        response = await updateContactInDB(id, data.contact);
        return res.status(200).json(response);
      } else {
        return res.status(400).json({ error: 'Invalid data_store value' });
      }
    } catch (error) {
      handleError(res, error);
    }
  }
// Get Contact from CRM
async function getContactFromCRM(contactId) {
    const axiosConfig = {
      headers: {
        Authorization: `Token token=${API_KEY}`,
        'Content-Type': 'application/json',
      },
    };
    return await axios.get(`${BASE_URL}/api/contacts/${contactId}`, axiosConfig);
  }
  
  // Get Contact from MongoDB
  async function getContactFromDB(contactId) {
    return await Contact.findById(contactId);
  }
  
  // Get Contact
  async function getContact(req, res) {
    const { data_store } = req.query;
    const contactId = req.params.id;
  
    try {
      if (data_store === 'CRM') {
        const response = await getContactFromCRM(contactId);
        return res.status(200).json(response.data);
      } else if (data_store === 'database') {
        const response = await getContactFromDB(contactId);
        return res.status(200).json(response);
      } else {
        return res.status(400).json({ error: 'Invalid data_store value' });
      }
    } catch (error) {
      handleError(res, error);
    }
  }
  
  // Delete Contact in CRM
  async function deleteContactInCRM(contactId) {
    const axiosConfig = {
      headers: {
        Authorization: `Token token=${API_KEY}`,
        'Content-Type': 'application/json',
      },
    };
    return await axios.delete(`${BASE_URL}/api/contacts/${contactId}`, axiosConfig);
  }
  
  // Delete Contact in MongoDB
  async function deleteContactInDB(contactId) {
    return await Contact.findByIdAndDelete(contactId);
  }
  
  // Delete Contact
  async function deleteContact(req, res) {
    const { data_store } = req.query;
    const contactId = req.params.id;
  
    try {
      if (data_store === 'CRM') {
        const response = await deleteContactInCRM(contactId);
        return res.status(200).json(response.data);
      } else if (data_store === 'database') {
        const response = await deleteContactInDB(contactId);
        return res.status(200).json(response);
      } else {
        return res.status(400).json({ error: 'Invalid data_store value' });
      }
    } catch (error) {
      handleError(res, error);
    }
  }
  
  // Error handling function
  function handleError(res, error) {
    if (error.response) {
      console.error('Error:', error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      console.error('No response received:', error.request);
      res.status(500).json({ error: 'No response from API' });
    } else {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
  
// Export controller functions
module.exports = {
  createContact,
  updateContact,
  getContact,
  deleteContact,
};
