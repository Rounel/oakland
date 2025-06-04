import { useEffect, useState } from 'react'

export function useGeolocationWithRadius(defaultRadius = 50) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [radius, setRadius] = useState(defaultRadius)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n’est pas supportée.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      (err) => {
        setError('Position introuvable. Activez votre GPS.')
        console.error(err)
      }
    )
  }, [])

  return { location, radius, setRadius, error }
}