"use client"

import { useState, useEffect } from 'react';
import { useLanguage } from './language-provider';

export default function StatisticsBar() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation for counting up numbers
  const [counts, setCounts] = useState({
    pros: 0,
    contacts: 0,
    average: 0,
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
        pros: Math.floor(progress * 4),
        contacts: Math.floor(progress * 27),
        average: Math.floor(progress * 4.5),
      });
      
      if (progress >= 1) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  const stats = [
    {
      value: `${counts.pros}k`,
      label: t("stats.verified.pros")
    },
    {
      value: `${counts.contacts}k`,
      label: t("stats.connections")
    },
    {
      value: `${counts.average}/5`,
      label: t("stats.average.rating")
    },
  ];

  return (
    <div className={`bg-white pb-8 pt-8 lg:pt-0 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl sm:w-auto mx-auto">
        <div className="grid grid-cols-3 gap-2 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center flex flex-col justify-center items-center mx-auto max-w-[5rem] transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="text-3xl md:text-6xl font-bold text-gray-900 mb-3">
                {stat.value}
              </div>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}