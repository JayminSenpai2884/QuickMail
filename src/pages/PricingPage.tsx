import React from 'react';
import { Header } from '../components/Layout/Header';
import { Link } from 'react-router-dom';

export const PricingPage: React.FC = () => {
  const pricingPlans = [
    { name: 'Basic', price: '$9/month', features: ['1 User', 'Basic Email Templates', 'Email Support'] },
    { name: 'Pro', price: '$19/month', features: ['Up to 5 Users', 'Advanced Email Templates', 'Priority Support'] },
    { name: 'Enterprise', price: 'Contact Us', features: ['Unlimited Users', 'Custom Email Templates', 'Dedicated Support'] },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-4">Pricing Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-2xl font-bold">{plan.price}</p>
              <ul className="list-disc list-inside mb-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <Link to="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">Choose Plan</Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}; 