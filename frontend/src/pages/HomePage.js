// src/pages/HomePage.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ProductsSection from '../components/ProductsSection';
import NewsSection from '../components/NewsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};
export default HomePage;