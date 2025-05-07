"use client"


import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HowItWorksSection() {
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
      title: "Lancez une recherche d'un métier",
      description: "Définissez votre besoin et trouvez les meilleurs talents dans votre région en quelques clics.",
      img: "/1.jpg",
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
      title: "Choisissez le prestataire de votre choix",
      description: "Comparez les profils, évaluations et expertises pour trouver le professionnel idéal pour votre projet.",
      img: "/2.jpg",
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
      title: "Contactez le",
      description: "Établissez une connexion directe avec le prestataire pour discuter de votre projet et démarrer votre collaboration.",
      img: "/3.jpg",
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
          {/* <path
            id="wave1"
            d="M160 90 Q165 85 170 90"
            className="stroke-emerald-400"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            id="wave2"
            d="M155 85 Q165 75 175 85"
            className="stroke-emerald-400"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            id="wave3"
            d="M150 80 Q165 65 180 80"
            className="stroke-emerald-400"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          /> */}

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
    <div className="bg-white py-10 md:py-18">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Comment ça marche</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement le professionnel idéal pour votre projet en trois étapes simples
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`bg-white rounded-xl p-6 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
              onMouseEnter={() => setActiveStep(index)}
            >
              <div 
                className={`relative h-96 mb-6 rounded-lg overflow-hidden transition-all duration-300 ${activeStep === index ? 'scale-105 shadow-lg' : ''}`}
              >
                <div className="w-full h-full">
                  {/* {step.icon()} */}
                  <Image
                    src={step.img}
                    alt='step'
                    fill
                    className='object-cover'
                  />
                </div>
              </div>
              
              <div className="flex items-start mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold mr-3 flex-shrink-0">
                  {step.id}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              </div>
              
              <p className="text-gray-600 pl-11">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Progress indicators */}
        {/* <div className="flex justify-center mt-12 space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeStep === index ? 'bg-indigo-600 w-8' : 'bg-gray-300'}`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}