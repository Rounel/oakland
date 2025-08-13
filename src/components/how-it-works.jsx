"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLanguage } from './language-provider';

export default function HowItWorksSection() {
  const { t } = useLanguage()
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate through steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  const steps = [
    {
      id: 1,
      title: t("hiw.step1.title"),
      description: t("hiw.step1.description"),
      img: "/zoom.png",
      icon: () => (<svg className="w-full h-full" viewBox="0 0 200 200" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="95" fill="#f5f5f5"/>
      
        <circle cx="100" cy="100" r="20" fill="none" stroke="#6e11b0" strokeWidth="1"/>
        <circle cx="100" cy="100" r="40" fill="none" stroke="#6e11b0" strokeWidth="1" strokeDasharray="5,5"/>
        <circle cx="100" cy="100" r="60" fill="none" stroke="#6e11b0" strokeWidth="1" strokeDasharray="5,5"/>
        <circle cx="100" cy="100" r="80" fill="none" stroke="#6e11b0" strokeWidth="1" strokeDasharray="5,5"/>
      
        <g>
          <line x1="100" y1="100" x2="100" y2="10" stroke="#6e11b0" strokeWidth="2">
            <animateTransform 
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="4s"
              repeatCount="indefinite" />
          </line>
          <path d="M100,100 L100,0 A100,100 0 0,1 200,100 Z" fill="#6e11b0" opacity="0.1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="4s"
              repeatCount="indefinite" />
          </path>
        </g>
      
        <circle cx="130" cy="50" r="4" fill="#6e11b0">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="40" r="4" fill="#6e11b0">
          <animate attributeName="r" values="3;5;3" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="90" r="4" fill="#6e11b0">
          <animate attributeName="r" values="3;5;3" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="120" r="4" fill="#6e11b0">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="110" cy="160" r="4" fill="#6e11b0">
          <animate attributeName="r" values="3;5;3" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="160" cy="120" r="4" fill="#6e11b0">
          <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>
      )
    },
    {
      id: 2,
      title: t("hiw.step2.title"),
      description: t("hiw.step2.description"),
      img: "/candidate.png",
      icon: () => (
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="160" height="160" rx="8" fill="#f3f4f6" />
          
          {/* Search bar */}
          <rect x="30" y="30" width="140" height="20" rx="4" fill="white" stroke="#d1d5db" strokeWidth="1" />
          <circle cx="40" cy="40" r="5" fill="#6e11b0" />
          
          {/* Result cards */}
          <rect x="30" y="60" width="140" height="30" rx="4" fill="white" stroke="#d1d5db" strokeWidth="1" />
          <circle cx="45" cy="75" r="8" fill="#6e11b0" />
          <rect x="60" y="70" width="70" height="5" rx="2" fill="#6e11b0" opacity="0.7" />
          <rect x="60" y="80" width="40" height="3" rx="1" fill="#9ca3af" />
          <rect x="140" y="70" width="20" height="10" rx="5" fill="#10b981" />
          
          <rect x="30" y="100" width="140" height="30" rx="4" fill="white" stroke="#d1d5db" strokeWidth="1" />
          <circle cx="45" cy="115" r="8" fill="#6e11b0" />
          <rect x="60" y="110" width="60" height="5" rx="2" fill="#6e11b0" opacity="0.7" />
          <rect x="60" y="120" width="35" height="3" rx="1" fill="#9ca3af" />
          <rect x="140" y="110" width="20" height="10" rx="5" fill="#10b981" />
          
          <rect x="30" y="140" width="140" height="30" rx="4" fill="white" stroke="#d1d5db" strokeWidth="1" />
          <circle cx="45" cy="155" r="8" fill="#6e11b0" />
          <rect x="60" y="150" width="80" height="5" rx="2" fill="#6e11b0" opacity="0.7" />
          <rect x="60" y="160" width="45" height="3" rx="1" fill="#9ca3af" />
          <rect x="140" y="150" width="20" height="10" rx="5" fill="#10b981" />
          
          {/* Hover effect on middle card */}
          <rect x="28" y="98" width="144" height="34" rx="5" stroke="#4f46e5" strokeWidth="2" strokeDasharray="3 2" fill="none">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
          </rect>
        </svg>
      )
    },
    {
      id: 3,
      title: t("hiw.step3.title"),
      description: t("hiw.step3.description"),
      img: "/contact.png",
      icon: () => (<svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fond cercle */}
        <circle cx="100" cy="100" r="90" className="fill-gray-100 dark:fill-gray-800" />

        {/* Personnage */}
        <circle cx="80" cy="70" r="20" className="fill-purple-500" />
        <rect x="55" y="90" width="50" height="60" rx="12" className="fill-purple-500" />

        {/* Téléphone */}
        <g transform="rotate(0 130 120)">
          <rect
            x="110"
            y="90"
            width="40"
            height="60"
            rx="8"
            className="fill-purple-500 stroke-white"
            strokeWidth="2"
          />
          <rect x="120" y="100" width="20" height="35" rx="4" className="fill-white" />
          <circle cx="130" cy="140" r="3" className="fill-white" />
          
          {/* Animation de vibration */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-1;1;-1"
            dur="0.8s"
            repeatCount="indefinite"
            additive="sum"
            origin="130 120"
          />
        </g>

        {/* Ondes animées */}
        <g>
          {/* Animations de pulsation */}
          <animate
            xlinkHref="#wave1"
            attributeName="d"
            values="
              M160 90 Q165 85 170 90;
              M160 90 Q165 80 170 90;
              M160 90 Q165 85 170 90
            "
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            xlinkHref="#wave2"
            attributeName="d"
            values="
              M155 85 Q165 75 175 85;
              M155 85 Q165 70 175 85;
              M155 85 Q165 75 175 85
            "
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            xlinkHref="#wave3"
            attributeName="d"
            values="
              M150 80 Q165 65 180 80;
              M150 80 Q165 60 180 80;
              M150 80 Q165 65 180 80
            "
            dur="3s"
            repeatCount="indefinite"
          />
        </g>
      </svg>
      )
    }
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-background2/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-storm mb-3 sm:mb-4">
            {t("hiw.title")}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-storm max-w-2xl mx-auto">
            {t("hiw.subtitle")}
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`rounded-xl p-4 sm:p-6 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
              onMouseEnter={() => setActiveStep(index)}
            >
              <div 
                className={`relative mb-4 sm:mb-6 rounded-lg overflow-hidden transition-all duration-300 ${activeStep === index ? 'scale-105' : ''}`}
              >
                <div className="">
                  <Image
                    src={step.img}
                    alt='step'
                    width={48}
                    height={48}
                    className='object-cover mx-auto w-12 h-12 sm:w-16 sm:h-16'
                  />
                </div>
              </div>
              
              <div className="flex items-start mb-2 sm:mb-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-flax text-storm font-bold mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base">
                  {step.id}
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 leading-tight">
                  {step.title}
                </h3>
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 pl-8 sm:pl-11 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}