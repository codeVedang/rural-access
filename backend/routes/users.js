const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

router.get('/me', auth, async (req, res) => {
try {
const user = await User.findById(req.user.id).select('-password');
res.json(user);
} catch (err) { res.status(500).send('Server Error'); }
});

router.put('/me', auth, async (req, res) => {
const { name, phone } = req.body;
const profileFields = {};
if (name) profileFields.name = name;
if (phone) profileFields.phone = phone;
try {
let user = await User.findByIdAndUpdate(req.user.id, { $set: profileFields }, { new: true }).select('-password');
res.json(user);
} catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;