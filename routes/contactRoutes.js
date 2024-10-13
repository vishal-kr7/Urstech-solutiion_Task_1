const express = require('express');
const router = express.Router();
const {
  createContact,
  updateContact,
  getContact,
  deleteContact,
} = require('../controllers/contactController');

// Define the routes
router.post('/createContact', createContact);
router.put('/updateContact', updateContact);
router.get('/getContact/:id', getContact);
router.delete('/deleteContact/:id', deleteContact);

module.exports = router;
