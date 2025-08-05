import React, { useState, useEffect } from 'react';
import api from '../api';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await api.get('/bookings');
                setBookings(res.data);
            } catch (err) {
                console.error("Failed to fetch bookings", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <p>Loading your bookings...</p>;
    if (bookings.length === 0) return <p>You have not made any bookings yet.</p>;

    return (
        <div className="space-y-6">
            {bookings.map(booking => (
                <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold">Booking ID: #{booking._id.slice(-6)}</h3>
                            <p className="text-sm text-gray-500">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-lg font-semibold">Total: ₹{booking.totalAmount}</p>
                             <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                 booking.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                             }`}>{booking.status}</span>
                        </div>
                    </div>
                    <hr className="my-4"/>
                    <h4 className="font-semibold mb-2">Items:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                        {booking.products.map(item => (
                            <li key={item.product || item._id}>
                                {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default BookingList;

