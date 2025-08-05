const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
try {
const dummyServices = [
{ name: 'Grocery Delivery', icon: 'fa-shopping-cart' },
{ name: 'Medicine Delivery', icon: 'fa-pills' },
{ name: 'Farm Supplies', icon: 'fa-tractor' },
{ name: 'Local Artisan Goods', icon: 'fa-palette' },
{ name: 'Bill Payments', icon: 'fa-file-invoice-dollar' }
];
const count = await Service.countDocuments();
if (count === 0) await Service.insertMany(dummyServices);
const services = await Service.find();
res.json(services);
} catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;