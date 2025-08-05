const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Booking = require('../models/Booking');
const Product = require('../models/Product');

router.post('/', auth, async (req, res) => {
const { cartItems } = req.body;
try {
if (!cartItems || cartItems.length === 0) return res.status(400).json({ msg: 'Cart is empty' });
let totalAmount = 0;
const productsForBooking = [];
for (const item of cartItems) {
const product = await Product.findById(item.productId);
if (product) {
totalAmount += product.price * item.quantity;
productsForBooking.push({
product: item.productId, name: product.name, price: product.price, quantity: item.quantity
});
}
}
const newBooking = new Booking({ user: req.user.id, products: productsForBooking, totalAmount });
const booking = await newBooking.save();
res.json(booking);
} catch (err) { res.status(500).send('Server Error'); }
});

router.get('/', auth, async (req, res) => {
try {
const bookings = await Booking.find({ user: req.user.id }).sort({ bookingDate: -1 });
res.json(bookings);
} catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;