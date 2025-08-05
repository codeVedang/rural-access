import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const ProfileEditForm = () => {
    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({ name: user.name, phone: user.phone || '' });
    const [message, setMessage] = useState('');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await api.put('/users/me', formData);
            setUser(res.data);
            setMessage('Profile updated successfully!');
        } catch (err) {
            setMessage('Failed to update profile.');
        }
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6">Edit Your Profile</h3>
            {message && <p className={`text-center mb-4 ${message.includes('successfully') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="font-semibold">Email</label>
                    <input type="email" value={user.email} disabled className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-100 cursor-not-allowed"/>
                </div>
                <div>
                    <label className="font-semibold">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 mt-1 border rounded-lg"/>
                </div>
                <div>
                    <label className="font-semibold">Phone Number</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 mt-1 border rounded-lg"/>
                </div>
                <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save Changes</button>
            </form>
        </div>
    );
};
export default ProfileEditForm;
