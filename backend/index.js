const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully!');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};
connectDB();

app.get('/', (req, res) => res.send('Rural Access Platform API is running...'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/products', require('./routes/products'));
app.use('/api/news', require('./routes/news'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));