"use client"

import { categories, CategoriesProps } from '@/constants/categories';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroInfiniteScroll({
    wGradient=true
}: {
    wGradient?: boolean
}) {
  const [isHovering, setIsHovering] = useState(null);
  const carouselRef = useRef(null);

  const [location, setLocation] = useState("")


  const allCategories = [...categories.filter(item => item.img), ...categories.filter(item => item.img), ...categories.filter(item => item.img), ...categories.filter(item => item.img), ...categories.filter(item => item.img), ...categories.filter(item => item.img)];
  const [allCategories2, setAllCategories2] = useState<CategoriesProps[]>([]);
  const [allCategories3, setAllCategories3] = useState<CategoriesProps[]>([]);
  const [allCategories4, setAllCategories4] = useState<CategoriesProps[]>([]);
  
  useEffect(() => {
    setAllCategories2(shuffleArray(allCategories));
    setAllCategories3(shuffleArray(allCategories));
    setAllCategories4(shuffleArray(allCategories));
  }, []);

  

  useEffect(() => {
    startScrollAnimation();
    
    // Handle resize events for responsive behavior
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    // Adjust carousel position on resize if needed
    if (carouselRef.current) {
      // Reset animation
      stopScrollAnimation();
      startScrollAnimation();
    }
  };


  const stopScrollAnimation = () => {
    if (carouselRef.current) {
      (carouselRef.current as HTMLElement).style.animationPlayState = 'paused';
    }
  };

  const startScrollAnimation = () => {
    if (carouselRef.current) {
      (carouselRef.current as HTMLElement).style.animationPlayState = 'running';
    }
  };
  
  function shuffleArray(array: CategoriesProps[]) {
    const result = array.slice(); // pour ne pas modifier l'original
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]]; // échange
    }
    return result;
  }

  return (
    <div className=" min-h-[100dvh] w-full overflow-hidden items-center bg-white relative">
      {/* Infinite Scroll Carousel */}
      <div className="">
        {
          [
            allCategories,
            allCategories2,
            allCategories3,
            allCategories4
          ].map((t, index) => (
            <div key={`carou${index}`} className="w-full overflow-hidden h-full relative">
              {/* Gradient overlays for fade effect */}
              {
                wGradient && (
                    <>
                        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
                        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
                    </>
                )
              }
              
              {/* Carousel container */}
              <style>
                {`
                  @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                `}
              </style>
              
              <div 
                ref={carouselRef}
                className="flex h-full"
                // onMouseEnter={stopScrollAnimation}
                // onMouseLeave={startScrollAnimation}
                style={{
                  animation: 'scroll 90s linear infinite',
                  width: `${allCategories.length * 16}rem` // Each card is 16rem wide
                }}
              >
                {t.map((category, index) => (
                  <div 
                    key={`${category.name}${index}`} 
                    className="flex-shrink-0 w-72 transition-all duration-300"
                  >
                    <div className={`overflow-hidden shadow-md transition-all duration-300 ${isHovering === `${category.name}${index}` ? 'transform scale-105 shadow-xl' : ''}`}>
                      <div className="relative h-60 overflow-hidden">
                        {category.img && <Image 
                          src={category.img} 
                          alt={category.name} 
                          fill
                          className={`w-full h-full object-cover transition-transform duration-700 ${isHovering === `${category.name}${index}` ? 'scale-110' : ''}`} 
                        />}
                        {isHovering === `${category.name}${index}` && (
                          <div className="absolute inset-0 bg-black/45 flex items-center justify-center transition-opacity duration-300">
                            <span className="px-4 py-2 bg-white bg-opacity-90 rounded-full text-sm font-medium">View category</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}