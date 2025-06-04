"use client"

import { categories } from '@/constants/categories';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search, Target } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import StatisticsBar from './stats-section';
import Image from 'next/image';
import { motion } from "framer-motion"
import { useGeolocation } from "@/hooks/use-geolocation"

export default function HomeHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const carouselRef = useRef(null);
  const router = useRouter();
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)

  const [profession, setProfession] = useState("")
  const [location, setLocation] = useState("")


  const allCategories = [...categories.filter(item => item.img), ...categories.filter(item => item.img), ...categories.filter(item => item.img), ...categories.filter(item => item.img), ...categories.filter(item => item.img), ...categories.filter(item => item.img)];
  const [allCategories2, setAllCategories2] = useState([]);
  const [allCategories3, setAllCategories3] = useState([]);
  
  useEffect(() => {
    setAllCategories2(shuffleArray(allCategories));
    setAllCategories3(shuffleArray(allCategories));
  }, []);

  const {
    loading: locationLoading,
    error: locationError,
    address,
    permissionState,
    getCurrentPosition,
  } = useGeolocation()

  
  // Check if we should show the permission dialog
  useEffect(() => {
    if (permissionState === "prompt") {
      setShowPermissionDialog(true)
    } else if (permissionState === "granted") {
      getCurrentPosition()
    }
  }, [permissionState, getCurrentPosition])

  // Update location field when address is available
  useEffect(() => {
    if (address && !location) {
      setLocation(address)
    }
  }, [address, location])
  

  useEffect(() => {
    setIsVisible(true);
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
  
  const handleSearch = (e) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()

    if (profession) {
      searchParams.append("profession", profession)
    }

    if (location) {
      searchParams.append("location", location)
    }

    const queryString = searchParams.toString()
    const url = `/recherche${queryString ? `?${queryString}` : ""}`

    router.push(url)
  }

  const goToExplore = (path) => {
    router.push(path)
  };

  const stopScrollAnimation = () => {
    if (carouselRef.current) {
      carouselRef.current.style.animationPlayState = 'paused';
    }
  };

  const startScrollAnimation = () => {
    if (carouselRef.current) {
      carouselRef.current.style.animationPlayState = 'running';
    }
  };
  
  function shuffleArray(array) {
    const result = array.slice(); // pour ne pas modifier l'original
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]]; // échange
    }
    return result;
  }

  return (
    <div className=" min-h-[100dvh] w-full overflow-hidden items-center bg-white relative">
      {/* Hero Content */}
      <div className=" absolute w-full md:w-auto rounded-md z-10 top-1/3 md:top-[42.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl to-90%  flex flex-col items-center justify-center text-center px-4 py-6 lg:px-28">
        <motion.h1
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="bg-purple-100 text-purple-800 text-sm px-4 py-1 rounded-full mb-6 animate-pulse gap-2 flex items-center">
              <Target />
              Plus de 32 professionels trouvés autour de vous!
            </div>
          </div>
          
          {/* Headline with staggered animation */}
          <div className={`transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 max-w-3xl mb-4">
              Trouvez le professionel 
              <br />
              le plus proche de vous
            </h1>
          </div>
        </motion.h1>
        
        {/* Subheadline */}
        <div className={`transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-600 max-w-xl">
          Connectez-vous avec des milliers de professionels dans le bâtiment, l'artisanat, l'automobile et plus encore.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Quel service recherchez-vous ?"
                className="pl-10"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder={locationLoading ? "Détection de votre position..." : "Où ? (ville, code postal)"}
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {locationLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
            <Button type="submit" className="md:w-auto">
              Rechercher
            </Button>
          </form>
        </motion.div>
      </div>
      
      {/* Infinite Scroll Carousel */}
      <div className="mb-4">
        {
          [
            allCategories,
            allCategories2,
            allCategories3
          ].map((t, index) => (
            <div key={`carou${index}`} className="w-full overflow-hidden h-full relative">
              {/* Gradient overlays for fade effect */}
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
              
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
                    // onMouseEnter={() => setIsHovering(`${category.name}${index}`)}
                    // onMouseLeave={() => setIsHovering(null)}
                    onClick={() => goToExplore(category.path)}
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
                      {/* <div className="p-3 absolute bottom-2">
                        <h3 className="font-medium text-white text-shadow-lg">{category.name}</h3>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{(index+1*(Math.random()*100)).toFixed()} professionels</span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
      
      {/* How it works section */}
      <StatisticsBar />
      
      {/* {showPermissionDialog && (
        <LocationPermissionDialog onAllow={handleLocationPermissionAllow} onDeny={handleLocationPermissionDeny} />
      )} */}
    </div>
  );
}