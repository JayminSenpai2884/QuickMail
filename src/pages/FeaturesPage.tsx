import React from 'react';
import { Header } from '../components/Layout/Header';
import { Mail, Shield, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';

export const FeaturesPage: React.FC = () => {
  const { themeMode } = useStore();

  const features = [
    {
      icon: <Mail className="w-12 h-12 text-blue-500" />,
      title: 'AI-Powered Email Generation',
      description: 'Effortlessly create personalized, professional emails with cutting-edge AI.',
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          section.classList.add('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${themeMode === 'light' ? 'bg-white text-gray-800' : 'bg-gray-900 text-white'}`}>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <section className="text-center mb-5 p-20 animate-welcome mt-10 relative z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text">
            Welcome to QuickMail
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-4 mb-8">
            Revolutionizing email creation with AI-powered technology for faster, smarter communication.
          </p>
          <Link
            to="/generate"
            className="inline-flex items-center px-6 py-3 text-lg rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium transition-all"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Get Started
          </Link>
        </section>

        <section className="mb-16 p-5 sm:p-10">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose QuickMail?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col items-center shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 ${themeMode === 'light' ? 'bg-white text-gray-800 border border-gray-300' : 'bg-gray-800 text-white'}`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                <p className="text-center text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Emails?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of professionals using QuickMail to save time and enhance productivity.
          </p>
          <Link
            to="/generate"
            className="inline-flex items-center px-6 py-3 text-lg rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium transition-all"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Start Now
          </Link>
        </section>

      </main>

      <footer className={`py-2 ${themeMode === 'light' ? 'bg-white text-gray-800' : 'bg-gray-900 text-white'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="mb-4">© 2024 QuickMail by Jaymin P. All rights reserved.</p>
        </div>
      </footer>
      
    </div>
  );
};
