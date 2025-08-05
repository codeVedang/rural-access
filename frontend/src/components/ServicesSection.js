import React, { useState, useEffect } from 'react';
import api from '../api';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        setServices(res.data);
      } catch (err) { console.error("Failed to fetch services", err); }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {services.map(service => (
            <div key={service._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <i className={`fas ${service.icon} text-4xl text-green-500 mb-4`}></i>
              <h3 className="text-lg font-semibold">{service.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServicesSection;
