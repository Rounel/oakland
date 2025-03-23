import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"

interface FeaturedFreelancersProps {
  name: string
  title: string
  rating: number
  reviews: number
  hourlyRate: string
  imageSrc: string
  isFeatured?: boolean
}

export function FeaturedFreelancers({
  name,
  title,
  rating,
  reviews,
  hourlyRate,
  imageSrc,
  isFeatured = false,
}: FeaturedFreelancersProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative">
        {isFeatured && (
          <Badge className="absolute left-3 top-3 z-10 bg-primary text-primary-foreground">Recommandé</Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 z-10 h-8 w-8 rounded-full bg-white/80 text-muted-foreground hover:bg-white hover:text-red-500"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Ajouter aux favoris</span>
        </Button>
        <Link href={`/freelancers/${name.toLowerCase().replace(/\s+/g, "-")}`}>
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      <CardContent className="p-4">
        <Link href={`/freelancers/${name.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
          <h3 className="font-medium">{name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="mt-2 flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews} avis)</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div>
          <p className="text-sm font-bold">{hourlyRate}</p>
          <p className="text-xs text-muted-foreground">par heure</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/freelancers/${name.toLowerCase().replace(/\s+/g, "-")}`}>Voir profil</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

