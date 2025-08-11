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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HomeHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const carouselRef = useRef(null);
  const router = useRouter();
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)

  const [profession, setProfession] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("all")

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

    if (category && category !== "all") {
      searchParams.append("category", category)
    }

    const queryString = searchParams.toString()
    const url = `/search${queryString ? `?${queryString}` : ""}`

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
    <div className="lg:min-h-[100dvh] max-h-[100dvh] w-[100dvw] max-w-[100dvw] overflow-hidden items-center bg-white relative mx-auto">
      {/* Hero Content */}
      <div className="w-full flex flex-col items-center justify-center text-center px-4 py-6 text-white bg-primary
      md:w-auto
      lg:rounded-md lg:bg-white lg:text-foreground z-10 lg:left-1/2 lg:-translate-x-1/2 lg:absolute lg:bottom-20 lg:px-16 
      xl:px-28">
        <motion.h1
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Headline with staggered animation */}
          <div className={`transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold  max-w-2xl sm:max-w-3xl mb-3 sm:mb-4 leading-tight">
              Trouvez le professionel 
              <br className="hidden sm:block" />
              le plus proche de vous
            </h1>
          </div>
        </motion.h1>
        
        {/* Subheadline */}
        <div className={`transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm sm:text-base max-w-lg sm:max-w-xl mb-4 sm:mb-6">
            Connectez-vous avec des milliers de professionels dans le bâtiment, l'artisanat, l'automobile et plus encore.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 md:p-6 w-full max-w-2xl"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className='text-foreground pl-9 sm:pl-10 text-sm sm:text-base'>
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={`cfs${cat.id}`} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} />
              <Input
                type="text"
                placeholder={locationLoading ? "Détection de votre position..." : "Où ? (ville, code postal)"}
                className="pl-9 sm:pl-10 text-sm sm:text-base"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {locationLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
            <Button type="submit" className="md:w-auto text-sm sm:text-base">
              Rechercher
            </Button>
          </form>
        </motion.div>
      </div>
      
      {/* Infinite Scroll Carousel */}
      <div className="mb-4 hidden lg:block">
        {
          [
            allCategories,
            allCategories2,
            allCategories3
          ].map((t, index) => (
            <div key={`carou${index}`} className="w-full overflow-hidden h-full relative">
              {/* Gradient overlays for fade effect */}
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-16 lg:w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-16 lg:w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
              
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
                style={{
                  animation: 'scroll 90s linear infinite',
                  width: `${allCategories.length * 16}rem` // Each card is 16rem wide
                }}
              >
                {t.map((category, index) => (
                  <div 
                    key={`${category.name}${index}`} 
                    className="flex-shrink-0 w-64 sm:w-72 transition-all duration-300"
                    onClick={() => goToExplore(category.path)}
                  >
                    <div className={`overflow-hidden shadow-md transition-all duration-300 ${isHovering === `${category.name}${index}` ? 'transform scale-105 shadow-xl' : ''}`}>
                      <div className="relative h-32 sm:h-40 xl:h-70 overflow-hidden">
                        {category.img && <Image 
                          src={category.img} 
                          alt={category.name} 
                          fill
                          className={`w-full h-full object-cover transition-transform duration-700 ${isHovering === `${category.name}${index}` ? 'scale-110' : ''}`} 
                        />}
                        {isHovering === `${category.name}${index}` && (
                          <div className="absolute inset-0 bg-black/45 flex items-center justify-center transition-opacity duration-300">
                            <span className="px-3 sm:px-4 py-2 bg-white bg-opacity-90 rounded-full text-xs sm:text-sm font-medium">View category</span>
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