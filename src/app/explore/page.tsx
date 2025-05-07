'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon, MapPin, Clock, Search, Menu, X, ChevronDown, Home, Locate, Map, Pin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Link from "next/link"

export default function ExplorePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [location, setLocation] = useState("")
  const [minRating, setMinRating] = useState(0)
  const [availability, setAvailability] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  
  // Sample freelancer data
  const providers = [
    {
      id: 1,
      name: "Angelle R.",
      title: "I write for any brand in any tone, but unlike anyone",
      avatar: "/fake pp/pp3.jpeg",
      initials: "AR",
      rating: 5.0,
      reviews: 965,
      location: "Abidjan",
      hourlyRate: false,
      projectRate: "75",
      skills: ["SEO Writing", "Website content writing", "Blog writing", "Professional writing", "Social media copy"],
      isVetted: true,
      offersConsultation: true,
      isAvailable: true,
    },
    {
      id: 2,
      name: "Mike",
      title: "Creating online experiences that work as hard as you do",
      avatar: "/fake pp/pp2.avif",
      initials: "M",
      rating: 5.0,
      reviews: 623,
      location: "Yamoussoukro",
      hourlyRate: true,
      projectRate: "35",
      skills: ["SEO Writing", "Blog writing", "Writing", "Content writing", "Book & eBook writing"],
      isVetted: true,
      offersHourly: true,
      isAvailable: true,
    },
  ]

  const locations = [
    "Abidjan",
    "Yamoussoukro",
    "Bouaké",
    "San-Pédro",
    "Korhogo",
    "Daloa",
    "Man",
    "Gagnoa",
    "Abengourou",
    "Divo",
    "Anyama",
    "Bingerville",
    "Grand-Bassam",
    "Toutes"
  ]

  const categories = [
    { id: 1, nom: "Maçon", categorie: "Bâtiment", path: "/search" },
    { id: 2, nom: "Plombier", categorie: "Bâtiment", path: "/search" },
    { id: 3, nom: "Électricien", categorie: "Bâtiment", path: "/search" },
    { id: 4, nom: "Peintre en bâtiment", categorie: "Bâtiment", path: "/search" },
    { id: 5, nom: "Carreleur", categorie: "Bâtiment", path: "/search" },
    { id: 6, nom: "Couvreur", categorie: "Bâtiment", path: "/search" },
    { id: 7, nom: "Menuisier", categorie: "Artisanat", path: "/search" },
    { id: 8, nom: "Serrurier", categorie: "Artisanat", path: "/search" },
    { id: 9, nom: "Plaquiste", categorie: "Bâtiment", path: "/search" },
    { id: 10, nom: "Charpentier", categorie: "Bâtiment", path: "/search" },
    { id: 11, nom: "Vitrier", categorie: "Bâtiment", path: "/search" },
    { id: 12, nom: "Façadier", categorie: "Bâtiment", path: "/search" },
    { id: 13, nom: "Chauffagiste", categorie: "Bâtiment", path: "/search" },
    { id: 14, nom: "Technicien en climatisation", categorie: "Bâtiment", path: "/search" },
    { id: 15, nom: "Parqueteur", categorie: "Bâtiment", path: "/search" },
    { id: 16, nom: "Installateur de panneaux solaires", categorie: "Énergie", path: "/search" },
    { id: 17, nom: "Ébéniste", categorie: "Artisanat", path: "/search" },
    { id: 18, nom: "Sculpteur sur bois", categorie: "Artisanat", path: "/search" },
    { id: 19, nom: "Tourneur sur bois", categorie: "Artisanat", path: "/search" },
    { id: 20, nom: "Restaurateur de meubles", categorie: "Artisanat", path: "/search" },
    { id: 21, nom: "Luthier", categorie: "Artisanat", path: "/search" },
    { id: 22, nom: "Marqueteur", categorie: "Artisanat", path: "/search" },
    { id: 23, nom: "Tapissier", categorie: "Artisanat", path: "/search" },
    { id: 24, nom: "Mécanicien auto/moto", categorie: "Automobile", path: "/search" },
    { id: 25, nom: "Soudeur", categorie: "Métallurgie", path: "/search" },
    { id: 26, nom: "Ferronnier", categorie: "Métallurgie", path: "/search" },
    { id: 27, nom: "Forgeron", categorie: "Métallurgie", path: "/search" },
    { id: 28, nom: "Métallier", categorie: "Métallurgie", path: "/search" },
    { id: 29, nom: "Chaudronnier", categorie: "Métallurgie", path: "/search" },
    { id: 30, nom: "Technicien de maintenance", categorie: "Technique", path: "/search" },
    { id: 31, nom: "Femme/Homme de ménage", categorie: "Services à domicile", path: "/search" },
    { id: 32, nom: "Jardinier/Paysagiste", categorie: "Services extérieurs", path: "/search" },
    { id: 33, nom: "Agent de sécurité", categorie: "Sécurité", path: "/search" },
    { id: 34, nom: "Garde d’enfant", categorie: "Services à domicile", path: "/search" },
    { id: 35, nom: "Cuisinier à domicile", categorie: "Services à domicile", path: "/search" },
    { id: 36, nom: "Repassage / Blanchisserie", categorie: "Services à domicile", path: "/search" },
    { id: 37, nom: "Déménageur", categorie: "Logistique", path: "/search" },
    { id: 38, nom: "Concierge", categorie: "Services", path: "/search" },
    { id: 39, nom: "Conducteur d’engins", categorie: "Transport / BTP", path: "/search" },
    { id: 40, nom: "Ouvrier polyvalent", categorie: "Bâtiment", path: "/search" },
    { id: 41, nom: "Terrassier", categorie: "Bâtiment", path: "/search" },
    { id: 42, nom: "Manutentionnaire", categorie: "Logistique", path: "/search" },
    { id: 43, nom: "Monteur échafaudages", categorie: "BTP", path: "/search" },
    { id: 44, nom: "Décorateur d’intérieur", categorie: "Design / Art", path: "/search" },
    { id: 45, nom: "Staffeur ornemaniste", categorie: "Artisanat", path: "/search" },
    { id: 46, nom: "Peintre décorateur", categorie: "Artisanat", path: "/search" },
    { id: 47, nom: "Poseur de papier peint", categorie: "Artisanat", path: "/search" },
    { id: 48, nom: "Miroitier", categorie: "Artisanat", path: "/search" }
  ];

  const availabilityOptions = [
    "Disponible maintenant",
    "Disponible dans 1 semaine",
    "Disponible dans 2 semaines",
    "Toutes"
  ]

  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      {/* Location Filter */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Localisation</Label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une ville" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                type="text"
                placeholder="Rechercher une ville..."
                className="mb-2"
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase()
                  // Filter locations based on search term
                }}
              />
            </div>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rating Filter */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Note minimum</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[minRating]}
            onValueChange={(value) => setMinRating(value[0])}
            max={5}
            step={0.1}
            className="flex-1"
          />
          <span className="w-12 text-right text-sm">{minRating.toFixed(1)}</span>
        </div>
      </div>

      {/* Availability Filter */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Disponibilité</Label>
        <Select value={availability} onValueChange={setAvailability}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner la disponibilité" />
          </SelectTrigger>
          <SelectContent>
            {availabilityOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories Filter */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Catégories de métiers</Label>
        <div className="max-h-[200px] space-y-2 overflow-y-auto pr-2">
          {categories.map((category) => (
            <div key={category.nom} className="flex items-center space-x-2">
              <Checkbox
                id={category.nom}
                checked={selectedCategories.includes(category.nom)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category.nom])
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== category.nom))
                  }
                }}
              />
              <Label htmlFor={category.nom} className="text-sm">
                {category.nom}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Online Status */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">En ligne uniquement</Label>
        <Switch />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <Link href="/" className="hidden md:block">
              <h1 className="text-xl font-bold">Wilma Pro</h1>
            </Link>
          </div>
          <div className="flex-1 px-4 md:max-w-7xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                type="text"
                placeholder="Search for any service..."
                className="w-full pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Join</Button>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="container px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Home className="h-4 w-4" />
          <span>/</span>
          <span>Writing & Translation</span>
        </div>

        <div className="lg:flex lg:gap-8">
          {/* Filters - Mobile/Tablet Slide-in */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="mb-6 gap-2">
                  <span>Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md">
                <SheetHeader>
                  <div className="flex items-center justify-between">
                    <SheetTitle>Filters</SheetTitle>
                    <Button variant="ghost" size="sm">Clear all</Button>
                  </div>
                </SheetHeader>
                <div className="mt-8">
                  <FilterContent />
                </div>
                <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
                  <Button className="w-full">Apply</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Filters - Desktop Sidebar */}
          <div className="hidden lg:block lg:w-96 lg:flex-shrink-0 bg-neutral-50">
            <div className="sticky top-4 rounded-lg border p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button className="cursor-pointer" variant="ghost" size="sm">Clear all</Button>
              </div>
              <FilterContent />
              <div className="mt-6">
                <Button className="w-full cursor-pointer">Apply</Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">2 Pro providers for All</p>
            </div>

            {/* Freelancers List */}
            <div className="space-y-4">
              {providers.map((freelancer) => (
                <Card key={freelancer.id} className="overflow-hidden p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                      <AvatarFallback>{freelancer.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Link href={"professionals/JohnDoe"}>
                            <h3 className="text-lg font-semibold">{freelancer.name}</h3>
                          </Link>
                          <p className="text-slate-300"> | </p>
                          {freelancer.isVetted && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              Pro
                            </Badge>
                          )}
                          {freelancer.isAvailable && (
                            <Badge className="absolute left-3 top-3 z-10 bg-emerald-700 text-primary-foreground">Disponible</Badge>
                          )}
                        </div>
                        <p className="text-slate-300"> | </p>
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{freelancer.rating}</span>
                          <span className="text-muted-foreground">({freelancer.reviews})</span>
                        </div>
                      </div>
                      <p className="mt-1 text-base">{freelancer.title}</p>
                      <div className="flex justify-between items-center w-full mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          <span className="font-medium ">{freelancer.location}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {freelancer.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="secondary" className="rounded-sm bg-gray-100">
                            {skill}
                          </Badge>
                        ))}
                        {freelancer.skills.length > 4 && (
                          <Badge variant="secondary" className="rounded-sm bg-gray-100">
                            +{freelancer.skills.length - 4}
                          </Badge>
                        )}
                      </div>

                      <p className="text-base font-bold ml-auto mt-2">
                        à partir de {' '}
                        <span className="">
                          5000 FCFA
                        </span>
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

