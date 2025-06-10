"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "motion/react"
import { Search, MapPin, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import ProviderCard from "@/components/provider-card"
import Map from "@/components/map"
import { useGeolocation } from "@/hooks/use-geolocation"
import LocationPermissionDialog from "@/components/location-permission-dialog"
import { Label } from "./ui/label"
import { BASE_API_URL, searchProviders } from "@/services/services"
import { ProvidersProps } from "@/types/datatypes"
import { categories } from "@/constants/categories"

const cities = [
  "Abidjan",
  "Bouaké",
  "Daloa",
  "Korhogo",
  "San Pedro",
  "Yamoussoukro",
  "Man",
  "Gagnoa",
  "Abengourou",
  "Divo"
]

export default function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [profession, setProfession] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  useEffect(() => {
    const prof = searchParams.get("profession")
    if (prof) setProfession(prof)
  
    const loc = searchParams.get("location")
    if (loc) setLocation(loc)
  
    const cat = searchParams.get("categorie")
    if (cat) setCategory(cat)
  }, [searchParams])

  const [showMap, setShowMap] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [providers, setProviders] = useState<ProvidersProps[]>([])
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    loading: locationLoading,
    error: locationError,
    address,
    permissionState,
    getCurrentPosition,
  } = useGeolocation()

  // Load providers when filters change
  useEffect(() => {
    const loadProviders = async () => {
      setIsLoading(true)
      if (!profession && !location && (!category || category === "all") && (!selectedCity || selectedCity === "all")) {
        fetch(`${BASE_API_URL}/providers/search/`)
          .then(res => res.json())
          .then(data => {console.log(data);setProviders(data || [])})
      } else {
        try {
          const params = {
            profession,
            location: selectedCity === "all" ? location : selectedCity || location,
            category: category === "all" ? "" : category,
          }
          const data = await searchProviders(params)
          setProviders(data || [])
        } catch (error) {
          console.error("Error loading providers:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    loadProviders()
  }, [profession, location, selectedCity, category])

  // Show permission dialog if needed
  useEffect(() => {
    if (permissionState === "prompt" && !location) {
      setShowPermissionDialog(true)
    }
  }, [permissionState, location])

  // Update location field when address is available
  useEffect(() => {
    if (address && !location) {
      setLocation(address)
    }
  }, [address, location])

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    // Build the query string
    const params = new URLSearchParams()
    if (profession) params.set("profession", profession)
    if (selectedCity && selectedCity !== "all") params.set("location", selectedCity)
    else if (location) params.set("location", location)
    if (category && category !== "all") params.set("categorie", category)

    // Update the URL without reloading the page
    const url = `/explore?${params.toString()}`
    router.push(url)
  }

  const resetFilters = () => {
    setProfession("")
    setLocation("")
    setCategory("all")
    setSelectedCity("all")

    // Reset the URL
    router.push("/search")
  }

  const handleLocationPermissionAllow = () => {
    setShowPermissionDialog(false)
    getCurrentPosition()
  }

  const handleLocationPermissionDeny = () => {
    setShowPermissionDialog(false)
  }

  return (
    <div className=" w-full px-4 md:px-8 lg:px-16 min-h-screen">
      <div className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
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
            <Button type="submit">Rechercher</Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <Button variant="outline" onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2">
              <Filter size={18} />
              Filtres
            </Button>
            <Button variant="outline" onClick={() => setShowMap(!showMap)}>
              {showMap ? "Voir la liste" : "Voir la carte"}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <motion.div
            className={`lg:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${filtersOpen ? "block" : "hidden lg:block"}`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filtres</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-sm">
                Réinitialiser
              </Button>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Catégorie</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
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

              {/* City Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Ville</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les villes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Disponibilité</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="available-now" />
                    <label
                      htmlFor="available-now"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Disponible maintenant
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="available-weekend" />
                    <label
                      htmlFor="available-weekend"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Disponible le weekend
                    </label>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Note minimale</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les notes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les notes</SelectItem>
                    <SelectItem value="3">3+ étoiles</SelectItem>
                    <SelectItem value="4">4+ étoiles</SelectItem>
                    <SelectItem value="5">5 étoiles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {providers.length} prestataires trouvés
              </h2>
              <div className="hidden lg:block">
                <Button variant="outline" onClick={() => setShowMap(!showMap)}>
                  {showMap ? "Voir la liste" : "Voir la carte"}
                </Button>
              </div>
            </div>

            {/* Map or List View */}
            {showMap ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-[600px]">
                <Map providers={providers} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:flex md:flex-wrap gap-6">
                {providers.length > 0 ? (
                  providers.map((provider, index) => (
                    <motion.div
                      key={provider.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="w-xs"
                    >
                      <ProviderCard provider={provider} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">Aucun prestataire trouvé pour ces critères.</p>
                    <Button variant="outline" onClick={resetFilters} className="mt-4">
                      Réinitialiser les filtres
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showPermissionDialog && (
        <LocationPermissionDialog onAllow={handleLocationPermissionAllow} onDeny={handleLocationPermissionDeny} />
      )}
    </div>
  )
}
