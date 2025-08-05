const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    bookingDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', BookingSchema);