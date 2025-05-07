"use client"

import { useState, useEffect } from 'react';

export default function StatisticsBar() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation for counting up numbers
  const [counts, setCounts] = useState({
    percentage: 0,
    years: 0,
    millions: 0,
    users: 0
  });
  
  useEffect(() => {
    // Set visibility for fade-in animation
    setIsVisible(true);
    
    // Animate the statistics counting up
    const duration = 2000; // 2 seconds animation
    const steps = 60;
    const interval = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep += 1;
      const progress = Math.min(currentStep / steps, 1);
      
      setCounts({
        percentage: Math.floor(progress * 95),
        years: Math.floor(progress * 10),
        millions: Math.floor(progress * 10),
        users: Math.floor(progress * 50)
      });
      
      if (progress >= 1) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  const stats = [
    {
      value: `${counts.percentage}%`,
      label: "Customer satisfaction rate, reflecting our dedication"
    },
    {
      value: `${counts.years}+`,
      label: "Innovation and insight to users' financial journeys"
    },
    {
      value: `$${counts.millions}m`,
      label: "Platform has ensuring secure and efficient financial"
    },
    {
      value: `${counts.users}m`,
      label: "Users worldwide, providing them with financial solutions"
    }
  ];

  return (
    <div className={`w-full max-w-6xl mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white rounded-2xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
                {stat.value}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}