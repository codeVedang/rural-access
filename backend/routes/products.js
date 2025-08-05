const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        // Dummy data for products
        const dummyProducts = [
            { name: 'Fresh Milk', price: 50, image: 'https://placehold.co/300x200/e2e8f0/333?text=Milk' },
            { name: 'Brown Bread', price: 40, image: 'https://placehold.co/300x200/e2e8f0/333?text=Bread' },
            { name: 'Farm Eggs (Dozen)', price: 80, image: 'https://placehold.co/300x200/e2e8f0/333?text=Eggs' },
            { name: 'Organic Rice (1kg)', price: 120, image: 'https://placehold.co/300x200/e2e8f0/333?text=Rice' },
            { name: 'Mustard Oil (1L)', price: 150, image: 'https://placehold.co/300x200/e2e8f0/333?text=Oil' },
            { name: 'Paracetamol', price: 20, image: 'https://placehold.co/300x200/e2e8f0/333?text=Medicine' },
        ];
        
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(dummyProducts);
        }
        
        const { search } = req.query;
        let products;

        if (search) {
            // Case-insensitive search
            products = await Product.find({ name: { $regex: search, $options: 'i' } });
        } else {
            products = await Product.find();
        }
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// This line is VERY important. It must be at the end.
module.exports = router;