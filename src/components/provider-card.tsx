"use client"

import { motion } from "motion/react"
import Link from "next/link"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProvidersProps } from "@/types/datatypes"
import { MEDIA_API_URL } from "@/services/services"
import { categories } from "@/constants/categories"

interface ProviderCardProps {
  provider: ProvidersProps
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 max-w-xs "
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48">
        <Image src={provider?.user.profile_photo ? (MEDIA_API_URL + provider?.user.profile_photo) : "/placeholder.svg"} alt={provider ? (provider?.user.first_name + " " + provider?.user.last_name) : "profile picture"} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{provider?.user.first_name + " " + provider?.user.last_name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
            {/* <span className="text-sm font-medium">{provider.rating.toFixed(1)}</span> */}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{categories.filter(item => item.id === Number(provider?.category))[0].name}</p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{provider?.address}, {provider?.city}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-2">{provider?.description || "Aucune description disponible."}</p>
        <Button asChild className="w-full">
          <Link href={`/provider/${provider?.id}`}>Voir le profil</Link>
        </Button>
      </div>
    </motion.div>
  )
}
