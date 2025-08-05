import React, { useState } from 'react';
import api from '../api';
const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await api.post('/contact', formData);
            setResponseMsg(res.data.msg);
            setFormData({ name: '', message: '' });
        } catch (err) { 
            setResponseMsg('Failed to send message. Please try again.'); 
        }
        setTimeout(() => setResponseMsg(''), 5000);
    };

    return (
        <section id="contact" className="bg-gray-100 py-20 px-4">
            <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                    <p className="text-gray-600 mb-4">Have questions? Get in touch with us!</p>
                    <div className="space-y-4">
                        <p><strong>Address:</strong> 123 Kisan Marg, Gram Vikas, Pradesh, India</p>
                        <p><strong>Helpline:</strong> +91-123-456-7890</p>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                            <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">Send Message</button>
                        {responseMsg && <p className="mt-4 text-center">{responseMsg}</p>}
                    </form>
                </div>
            </div>
        </section>
    );
};
export default ContactSection;