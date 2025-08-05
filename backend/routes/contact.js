const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
const { name, message } = req.body;
try {
const newContact = new Contact({ name, message });
await newContact.save();
res.json({ msg: 'Your message has been received.' });
} catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;