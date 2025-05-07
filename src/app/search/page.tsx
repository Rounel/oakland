// "use client"

// import { useState, useEffect } from "react"
// import { useSearchParams } from "next/navigation"
// import { motion } from "framer-motion"
// import { Search, MapPin, Filter, ChevronDown } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Slider } from "@/components/ui/slider"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
// import ProviderCard from "@/components/provider-card"
// import Map from "@/components/map"
// import { categories } from "@/constants/categories"
// import { useGeolocation } from "@/hooks/use-geolocation"
// import LocationPermissionDialog from "@/components/location-permission-dialog"

// export default function SearchPage() {
//   const searchParams = useSearchParams()
//   const [profession, setProfession] = useState(searchParams.get("profession") || "")
//   const [location, setLocation] = useState(searchParams.get("location") || "")
//   const [category, setCategory] = useState(searchParams.get("categorie") || "")
//   const [distance, setDistance] = useState([20])
//   const [showMap, setShowMap] = useState(false)
//   const [filtersOpen, setFiltersOpen] = useState(false)
//   // const [filteredProviders, setFilteredProviders] = useState(allProviders)
//   const [showPermissionDialog, setShowPermissionDialog] = useState(false)

//   const {
//     loading: locationLoading,
//     error: locationError,
//     address,
//     permissionState,
//     getCurrentPosition,
//   } = useGeolocation()

//   // Show permission dialog if needed
//   useEffect(() => {
//     if (permissionState === "prompt" && !location) {
//       setShowPermissionDialog(true)
//     }
//   }, [permissionState, location])

//   // Update location field when address is available
//   useEffect(() => {
//     if (address && !location) {
//       setLocation(address)
//     }
//   }, [address, location])

//   const handleSearch = (e) => {
//     e.preventDefault()
//     // In a real app, we would update the URL and refetch data
//   }

//   const resetFilters = () => {
//     setProfession("")
//     setLocation("")
//     setCategory("")
//     setDistance([20])
//   }

//   const handleLocationPermissionAllow = () => {
//     setShowPermissionDialog(false)
//     getCurrentPosition()
//   }

//   const handleLocationPermissionDeny = () => {
//     setShowPermissionDialog(false)
//   }

//   return (
//     <div className="pt-16 w-full px-4 md:px-8 lg:px-16">
//       <div className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
//         <div className="container mx-auto px-4 py-6">
//           <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <Input
//                 type="text"
//                 placeholder="Quel service recherchez-vous ?"
//                 className="pl-10"
//                 value={profession}
//                 onChange={(e) => setProfession(e.target.value)}
//               />
//             </div>
//             <div className="flex-1 relative">
//               <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <Input
//                 type="text"
//                 placeholder={locationLoading ? "Détection de votre position..." : "Où ? (ville, code postal)"}
//                 className="pl-10"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               />
//               {locationLoading && (
//                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                   <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
//                 </div>
//               )}
//             </div>
//             <Button type="submit">Rechercher</Button>
//           </form>
//         </div>
//       </div>

//       <div className="mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filters - Mobile Toggle */}
//           <div className="lg:hidden flex justify-between items-center mb-4">
//             <Button variant="outline" onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2">
//               <Filter size={18} />
//               Filtres
//             </Button>
//             <Button variant="outline" onClick={() => setShowMap(!showMap)}>
//               {showMap ? "Voir la liste" : "Voir la carte"}
//             </Button>
//           </div>

//           {/* Filters Sidebar */}
//           <motion.aside
//             className={`lg:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${filtersOpen ? "block" : "hidden lg:block"}`}
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filtres</h2>
//               <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-sm">
//                 Réinitialiser
//               </Button>
//             </div>

//             <div className="space-y-6">
//               {/* Category Filter */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Catégorie</label>
//                 <div className="relative">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="outline" role="combobox" className="w-full justify-between">
//                         {category
//                           ? categories.find((cat) => cat.name === category)?.name || "Toutes les catégories"
//                           : "Toutes les catégories"}
//                         <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-full p-0">
//                       <Command>
//                         <CommandInput placeholder="Rechercher une catégorie..." className="h-9" />
//                         <CommandList>
//                           <CommandEmpty>Aucune catégorie trouvée.</CommandEmpty>
//                           <CommandGroup className="max-h-64 overflow-auto">
//                             <CommandItem value="all" onSelect={() => setCategory("")} className="cursor-pointer">
//                               Toutes les catégories
//                             </CommandItem>
//                             {categories.map((cat) => (
//                               <CommandItem
//                                 key={cat.id}
//                                 value={cat.name}
//                                 onSelect={() => setCategory(cat.name)}
//                                 className="cursor-pointer"
//                               >
//                                 {/* <cat.icon className="mr-2 h-4 w-4" /> */}
//                                 {cat.name}
//                               </CommandItem>
//                             ))}
//                           </CommandGroup>
//                         </CommandList>
//                       </Command>
//                     </PopoverContent>
//                   </Popover>
//                 </div>
//               </div>

//               {/* Distance Filter */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
//                   Distance maximale: {distance[0]} km
//                 </label>
//                 <Slider value={distance} onValueChange={setDistance} max={100} step={5} />
//               </div>

//               {/* Availability Filter */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Disponibilité</label>
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox id="available-now" />
//                     <label
//                       htmlFor="available-now"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       Disponible maintenant
//                     </label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Checkbox id="available-weekend" />
//                     <label
//                       htmlFor="available-weekend"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       Disponible le weekend
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Rating Filter */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Note minimale</label>
//                 <Select defaultValue="all">
//                   <SelectTrigger>
//                     <SelectValue placeholder="Toutes les notes" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">Toutes les notes</SelectItem>
//                     <SelectItem value="3">3+ étoiles</SelectItem>
//                     <SelectItem value="4">4+ étoiles</SelectItem>
//                     <SelectItem value="5">5 étoiles</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </motion.aside>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Results Count */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 {/* {filteredProviders.length} prestataires trouvés */}
//               </h2>
//               <div className="hidden lg:block">
//                 <Button variant="outline" onClick={() => setShowMap(!showMap)}>
//                   {showMap ? "Voir la liste" : "Voir la carte"}
//                 </Button>
//               </div>
//             </div>

//             {/* Map or List View */}
//             {showMap ? (
//               <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-[600px]">
//                 {/* <Map providers={filteredProviders} /> */}
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* {filteredProviders.map((provider, index) => (
//                   <motion.div
//                     key={provider.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.05 }}
//                   >
//                     <ProviderCard provider={provider} />
//                   </motion.div>
//                 ))} */}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {showPermissionDialog && (
//         <LocationPermissionDialog onAllow={handleLocationPermissionAllow} onDeny={handleLocationPermissionDeny} />
//       )}
//     </div>
//   )
// }

import { Suspense } from "react"
import SearchContent from "@/components/search-content"
import { getProviders, getCategories } from "@/services/supabase-service"

export default async function SearchPage({ searchParams }) {
  // Accéder directement aux propriétés de searchParams
  const categorySlug = searchParams?.categorie || ""
  const profession = searchParams?.profession || ""
  const location = searchParams?.location || ""

  // Fetch data in parallel
  const [categoriesPromise, providersPromise] = await Promise.all([
    getCategories(),
    getProviders({
      categorySlug: categorySlug || undefined,
      searchQuery: profession || undefined,
      location: location || undefined,
    }),
  ])

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SearchContent
        initialCategories={categoriesPromise}
        initialProviders={providersPromise}
        initialFilters={{
          categorySlug,
          profession,
          location,
        }}
      />
    </Suspense>
  )
}
