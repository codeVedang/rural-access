// src/pages/SignupPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    try {
      await signup(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-semibold">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border rounded-lg"/>
          </div>
          <div>
            <label className="font-semibold">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border rounded-lg"/>
          </div>
          <div>
            <label className="font-semibold">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border rounded-lg"/>
          </div>
          <button type="submit" className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">Sign Up</button>
        </form>
        <p className="text-center">Already have an account? <Link to="/login" className="text-green-600 hover:underline">Login</Link></p>
      </div>
    </div>
  );
};
export default SignupPage;