"use client"

import { useEffect, useRef } from "react"

interface MapProps {
  providers: Array<{
    id: string
    name: string
    profession: string
    location: string
    coordinates?: {
      lat: number
      lng: number
    }
  }>
}

export default function Map({ providers }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])

  useEffect(() => {
    // This would be replaced with actual Google Maps integration
    // For demo purposes, we're showing a placeholder
    const initMap = () => {
      if (!mapRef.current) return

      // In a real implementation, you would:
      // 1. Load the Google Maps API
      // 2. Create a new map instance
      // 3. Add markers for each provider
      // 4. Add info windows for each marker

      // Simulate map loading
      const loadingElement = document.createElement("div")
      loadingElement.className = "flex items-center justify-center h-full"
      loadingElement.innerHTML = `
        <div class="text-center">
          <div class="inline-flex items-center justify-center mb-4">
            <svg class="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p class="text-gray-600 dark:text-gray-400">Chargement de la carte...</p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Dans une application réelle, une carte Google Maps serait affichée ici avec ${providers.length} marqueurs pour les prestataires.</p>
        </div>
      `
      mapRef.current.appendChild(loadingElement)
    }

    initMap()

    return () => {
      // Cleanup map instance and markers
      if (mapRef.current) {
        mapRef.current.innerHTML = ""
      }
    }
  }, [providers])

  return <div ref={mapRef} className="w-full h-full bg-gray-100 dark:bg-gray-700"></div>
}
