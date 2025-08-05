import React, { useState, useEffect } from 'react';
import api from '../api';
const NewsSection = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try { 
          const res = await api.get('/news'); 
          setNews(res.data); 
      } catch (err) { 
          console.error("Failed to fetch news", err); 
      }
    };
    fetchNews();
  }, []);

  return (
    <section id="news" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">News & Updates</h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {news.map(item => (
            <div key={item._id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-700">{item.headline}</p>
              <p className="text-sm text-gray-500 mt-2">{new Date(item.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default NewsSection;