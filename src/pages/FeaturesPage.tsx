import React from 'react';
import { Header } from '../components/Layout/Header';
import { Mail, Sparkles, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <Mail className="w-12 h-12 text-blue-500" />,
      title: 'AI-Powered Email Generation',
      description: 'Effortlessly create personalized, professional emails with cutting-edge AI.',
    },
    {
      icon: <Sparkles className="w-12 h-12 text-purple-500" />,
      title: 'Stunning Templates',
      description: 'Choose from a diverse selection of sleek and customizable email templates.',
    },
    {
      icon: <Shield className="w-12 h-12 text-green-500" />,
      title: 'Privacy You Can Trust',
      description: 'We prioritize your privacy with secure, enterprise-grade protection.',
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: 'Lightning-Fast Results',
      description: 'Generate and customize emails instantly, saving time and boosting productivity.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <section className="text-center mb-16 p-20">
          <h1 className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            Welcome to QuickMail
          </h1>
          <p className="text-lg text-gray-400 mt-4 mb-8">
            Revolutionizing email creation with AI-powered technology for faster, smarter communication.
          </p>
          <Link
            to="/generate"
            className="inline-flex items-center px-8 py-4 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition-all"
          >
            Get Started
          </Link>
        </section>

        <section className="mb-16 p-10">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose QuickMail?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
                <p className="text-center text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Emails?</h2>
          <p className="text-lg text-gray-400 mb-8">
            Join thousands of professionals using QuickMail to save time and enhance productivity.
          </p>
          <Link
            to="/generate"
            className="inline-flex items-center px-8 py-4 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition-all"
          >
            Start Your Free Trial
          </Link>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="mb-4">© 2023 QuickMail. All rights reserved.</p>
          <div className="space-x-6">
            <Link to="/about" className="hover:text-white">
              About Us
            </Link>
            <Link to="/pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link to="/features" className="hover:text-white">
              Features
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
