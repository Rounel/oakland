import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, MapPin } from "lucide-react"

interface FeaturedFreelancersProps {
  name: string
  title: string
  rating: number
  reviews: number
  hourlyRate: string
  location?: string
  imageSrc: string
  isFeatured?: boolean
}

export function FeaturedFreelancers({
  name,
  title,
  rating,
  reviews,
  hourlyRate,
  location,
  imageSrc,
  isFeatured = false,
}: FeaturedFreelancersProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative">
        {isFeatured && (
          <Badge className="absolute left-2 sm:left-3 top-2 sm:top-3 z-10 bg-emerald-700 text-primary-foreground text-xs">
            Disponible
          </Badge>
        )}
        {/* <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 z-10 h-8 w-8 rounded-full bg-white/80 text-muted-foreground hover:bg-white hover:text-red-500"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Ajouter aux favoris</span>
        </Button> */}
        <Link href={`/providers/${name.toLowerCase().replace(/\s+/g, "-")}`}>
          <Image
            src={imageSrc || "/ap.png"}
            alt={name}
            width={300}
            height={300}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      <CardContent className="p-3 sm:p-4 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <Link href={`/providers/${name.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
            <h3 className="font-medium text-sm sm:text-base">{name}</h3>
          </Link>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
            <span className="text-xs sm:text-sm font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviews} avis)</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-muted-foreground">{title}</p>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="size-3 sm:size-4"/>
            Cocody Danga
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t p-3 sm:p-4 gap-2 sm:gap-0">
        <div>
          <p className="text-xs sm:text-sm font-bold">{hourlyRate}</p>
          <p className="text-xs text-muted-foreground">à partir de</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          asChild 
          className="bg-purple-950 text-white hover:bg-purple-800 hover:text-white text-xs sm:text-sm w-full sm:w-auto"
        >
          <Link href={`/providers/${name.toLowerCase().replace(/\s+/g, "-")}`}>
            Voir profil
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

