import React from 'react';
const HeroSection = () => (
    <section className="bg-green-100 py-20 px-4">
        <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Essentials, Delivered to Your Doorstep</h1>
            <p className="text-lg text-gray-600 mb-8">Connecting rural communities with vital products and services.</p>
            <button 
                onClick={() => {
                    const element = document.getElementById('products');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }} 
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition duration-300"
            >
                Explore Products
            </button>
        </div>
    </section>
);
export default HeroSection;