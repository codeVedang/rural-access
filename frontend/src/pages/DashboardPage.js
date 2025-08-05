// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BookingList from '../components/BookingList';
import ProfileEditForm from '../components/ProfileEditForm';

const DashboardPage = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const [view, setView] = useState('bookings');
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, loading, navigate]);

    if (loading || !user) {
        return <div className="text-center py-20">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-4">Welcome, {user.name}!</h1>
            <p className="text-lg text-gray-600 mb-8">This is your personal dashboard. Manage your bookings and profile information here.</p>

            <div className="flex border-b mb-8">
                <button onClick={() => setView('bookings')} className={`py-2 px-4 font-semibold ${view === 'bookings' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}>My Bookings</button>
                <button onClick={() => setView('profile')} className={`py-2 px-4 font-semibold ${view === 'profile' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}>Edit Profile</button>
            </div>

            <div>
                {view === 'bookings' && <BookingList />}
                {view === 'profile' && <ProfileEditForm />}
            </div>
        </div>
    );
};
export default DashboardPage;