const express = require('express');
const router = express.Router();
const News = require('../models/News');

router.get('/', async (req, res) =>{
try {
const dummyNews = [
{ headline: 'New government scheme announced for local farmers.' },
{ headline: 'Mobile health clinic to visit the village next week.' },
{ headline: 'Internet connectivity in the region gets a major boost.' }
];
const count = await News.countDocuments();
if (count === 0) await News.insertMany(dummyNews);
const news = await News.find().sort({ date: -1 }).limit(3);
res.json(news);
} catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;