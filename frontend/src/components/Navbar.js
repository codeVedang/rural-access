import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleScroll = (id) => {
    navigate('/');
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">RuralConnect</Link>
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => handleScroll('services')} className="text-gray-600 hover:text-green-600">Services</button>
          <button onClick={() => handleScroll('products')} className="text-gray-600 hover:text-green-600">Products</button>
          <button onClick={() => handleScroll('contact')} className="text-gray-600 hover:text-green-600">Contact</button>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="px-4 py-2 text-green-600 font-semibold rounded-lg hover:bg-green-50">Dashboard</Link>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-green-600 font-semibold rounded-lg hover:bg-green-50">Login</Link>
              <Link to="/signup" className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;