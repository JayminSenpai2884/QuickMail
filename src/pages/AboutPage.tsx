import React from 'react';
import { Header } from '../components/Layout/Header';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const features = [
    { title: 'AI-Powered Email Generation', description: 'Create professional emails instantly with our advanced AI technology.' },
    { title: 'Beautiful Templates', description: 'Choose from a variety of stunning email templates for any occasion.' },
    { title: 'Secure & Private', description: 'Your data is protected with enterprise-grade security measures.' },
    { title: 'Lightning Fast', description: 'Generate and customize emails in seconds, not minutes.' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-4">About Email Template Generator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">Try It Now</Link>
        </div>
      </main>
    </div>
  );
};