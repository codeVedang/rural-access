import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const ProductsSection = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
                setFilteredProducts(res.data);
            } catch (err) { console.error("Failed to fetch products", err); }
        };
        fetchProducts();
    }, []);
    
    useEffect(() => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    const addToCart = (product) => {
        if (!isAuthenticated) {
            alert("Please log in to add items to your cart.");
            return;
        }
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === product._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { productId: product._id, name: product.name, quantity: 1, price: product.price }];
        });
    };
    
    const handleBooking = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        try {
            await api.post('/bookings', { cartItems: cart });
            alert("Booking successful! Check your dashboard for details.");
            setCart([]);
            navigate('/dashboard');
        } catch (err) {
            console.error("Booking failed", err);
            alert("Booking failed. Please try again.");
        }
    };

    return (
        <section id="products" className="bg-gray-100 py-20 px-4">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">Available Products</h2>
                <div className="max-w-md mx-auto mb-12">
                     <input 
                        type="text" 
                        placeholder="Search for products..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x200?text=Image+Not+Found'; }}/>
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-2xl font-bold text-green-600 mb-4 flex-grow">₹{product.price}</p>
                                <button onClick={() => addToCart(product)} className="mt-auto w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {isAuthenticated && (
                    <div className="mt-12 p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto">
                        <h3 className="text-2xl font-bold text-center mb-4">Your Cart</h3>
                        {cart.length === 0 ? (
                            <p className="text-center text-gray-500">Your cart is empty.</p>
                        ) : (
                            <>
                                <ul className="space-y-2 mb-4">
                                    {cart.map(item => (
                                        <li key={item.productId} className="flex justify-between items-center">
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>₹{item.price * item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                                <hr/>
                                <div className="flex justify-between font-bold text-lg my-2">
                                    <span>Total</span>
                                    <span>₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                                </div>
                                <button onClick={handleBooking} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                                    Place Booking
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
export default ProductsSection;
