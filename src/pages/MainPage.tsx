import React, { useEffect, useRef, useState } from 'react';
import { Header } from '../components/Layout/Header';
import { TiptapEditor } from '../components/Editor/TiptapEditor';

import { EmailConfig } from '../components/Generator/EmailConfig';
import { useStore } from '../store/useStore';

export const MainPage: React.FC = () => {
  const { themeMode, trialCount, incrementTrial, hasWatchedAd } = useStore();
  const adContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAdVisible, setIsAdVisible] = useState(false);

  useEffect(() => {
    if (trialCount < 10 && !hasWatchedAd) {
      incrementTrial();
    } else if (trialCount >= 10 && !hasWatchedAd) {
      showAd();
    }
  }, [trialCount, hasWatchedAd, incrementTrial]);

  const showAd = () => {
    if (adContainerRef.current) {
      // Check if the ad container already has an ad
      if (adContainerRef.current.children.length === 0) {
        const ad = document.createElement('ins');
        ad.className = 'adsbygoogle';
        ad.style.display = 'block';
        ad.setAttribute('data-ad-client', 'ca-app-pub-3227521894174552'); // Your AdSense Client ID
        ad.setAttribute('data-ad-slot', 'YOUR_AD_SLOT_ID'); // Your Ad Unit ID
        ad.setAttribute('data-ad-format', 'auto');
        adContainerRef.current.appendChild(ad);
        (window.adsbygoogle = window.adsbygoogle || []).push(ad);
        
        // Set ad visibility to true
        setIsAdVisible(true);
      }
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeMode === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800'}`}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <EmailConfig />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Editor
              </h2>
            </div>
            <TiptapEditor />
          </div>
        </div>
      </main>
      {/* Conditionally render the ad container with updated styling */}
      {isAdVisible && (
        <div ref={adContainerRef} className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 shadow-lg rounded-t-lg transition-transform transform translate-y-0">
          {/* Ad will be inserted here */}
        </div>
      )}
    </div>
  );
};