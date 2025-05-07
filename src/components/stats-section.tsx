"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface StatItemProps {
  value: string
  label: string
  delay?: number
  delay2?: number
  isVisible?: boolean
}

function StatItem({ value, label, delay = 0, delay2 = 0, isVisible = true }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
    <div  
      className={`text-center transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      style={{ transitionDelay: `${200 + delay2 * 100}ms` }}
    >
      <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
        {value}
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">
        {label}
      </p>
    </div>
    </motion.div>
  )
}

export default function StatsShowcase() {const [isVisible, setIsVisible] = useState(false);
  
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
        years: Math.floor(progress * 1200),
        millions: Math.floor(progress * 15),
        users: Math.floor(progress * 50)
      });
      
      if (progress >= 1) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white rounded-2xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatItem
                value={`${counts.percentage}%`}
                label="Taux de satisfaction client, reflétant notre engagement qualité"
                delay={0.1}
                delay2={0}
                isVisible={isVisible}
              />
              <StatItem
                value={`${counts.years}+`}
                label="Prestataires vérifiés dans toutes les catégories de services"
                delay={0.2}
                delay2={1}
                isVisible={isVisible}
              />
              <StatItem 
                value={`${counts.millions}K+`}
                label="Mises en relation réussies entre clients et prestataires" 
                delay={0.3} 
                delay2={3}
                isVisible={isVisible} 
              />
              <StatItem
                value={`${counts.users}+`}
                label="Villes couvertes à travers la France pour des services de proximité"
                delay={0.4}
                delay2={4}
                isVisible={isVisible}
              />
        </div>
      </div>
    </div>
  )
}
