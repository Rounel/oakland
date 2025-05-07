"use client"

import { useState, useEffect, useRef } from "react"

interface GeolocationState {
  loading: boolean
  error: string | null
  position: {
    latitude: number | null
    longitude: number | null
  }
  address: string
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    position: {
      latitude: null,
      longitude: null,
    },
    address: "",
  })

  const [permissionState, setPermissionState] = useState<string | null>(null)
  const hasAttemptedGeolocation = useRef(false)
  const isReverseGeocodingInProgress = useRef(false)

  // Function to get current position
  const getCurrentPosition = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "La géolocalisation n'est pas prise en charge par votre navigateur",
      }))
      return
    }

    // Éviter les appels multiples
    if (state.loading || hasAttemptedGeolocation.current) {
      return
    }

    setState((prev) => ({ ...prev, loading: true }))
    hasAttemptedGeolocation.current = true

    navigator.geolocation.getCurrentPosition(
      // Success callback
      async (position) => {
        const { latitude, longitude } = position.coords

        // Éviter les appels multiples à l'API de géocodage inverse
        if (isReverseGeocodingInProgress.current) {
          return
        }

        isReverseGeocodingInProgress.current = true

        try {
          // Try to get address from coordinates
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
          )
          const data = await response.json()

          // Format address
          let address = ""
          if (data && data.address) {
            const { city, town, village, suburb, county, state, country } = data.address
            address = city || town || village || suburb || county || ""
            if (state && state !== address) {
              address += address ? `, ${state}` : state
            }
            if (country && !address.includes(country)) {
              address += address ? `, ${country}` : country
            }
          }

          setState({
            loading: false,
            error: null,
            position: { latitude, longitude },
            address: address || `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
          })
        } catch (error) {
          // If reverse geocoding fails, just use coordinates
          setState({
            loading: false,
            error: null,
            position: { latitude, longitude },
            address: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
          })
        } finally {
          isReverseGeocodingInProgress.current = false
        }
      },
      // Error callback
      (error) => {
        let errorMessage = "Une erreur est survenue lors de la géolocalisation"

        if (error.code === 1) {
          errorMessage = "L'accès à la géolocalisation a été refusé"
          setPermissionState("denied")
        } else if (error.code === 2) {
          errorMessage = "Les informations de localisation ne sont pas disponibles"
        } else if (error.code === 3) {
          errorMessage = "La demande de localisation a expiré"
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }))
      },
      // Options
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  // Check permission on mount - mais une seule fois
  useEffect(() => {
    let isMounted = true

    if (typeof navigator !== "undefined" && navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" as PermissionName })
        .then((permissionStatus) => {
          if (!isMounted) return

          setPermissionState(permissionStatus.state)

          // Listen for permission changes
          permissionStatus.onchange = () => {
            if (!isMounted) return
            setPermissionState(permissionStatus.state)
          }
        })
        .catch((error) => {
          console.error("Error checking geolocation permission:", error)
        })
    }

    return () => {
      isMounted = false
    }
  }, [])

  return {
    ...state,
    permissionState,
    getCurrentPosition,
    isGeolocationAvailable: typeof navigator !== "undefined" && !!navigator.geolocation,
  }
}
