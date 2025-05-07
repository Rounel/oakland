"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import LocationPermissionDialog from "@/components/location-permission-dialog"
import type { Category, Provider } from "@/services/supabase-service"
import  HomeHeroSection  from "@/components/home-hero-section"
import  HowItWorksSection  from "@/components/how-it-works"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { FeaturedFreelancers } from "./home/featured-freelancers"

interface HomeContentProps {
  initialCategories: Category[]
  initialProviders: Provider[]
}

export default function HomeContent({ initialCategories, initialProviders }: HomeContentProps) {
  const router = useRouter()

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HomeHeroSection />

      {/* How it works section */}
      <HowItWorksSection />

      {/* Featured Deals Section */}
      <section className="bg-muted/50 py-12 flex justify-center px-2">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Professionels trouvés autour de vous</h2>
            <Link href="/search" className="flex items-center gap-1 text-sm font-medium text-primary">
              Explorer tous les professionels <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Tous
              </TabsTrigger>
              <TabsTrigger
                value="maçon"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Maçon
              </TabsTrigger>
              <TabsTrigger
                value="mecano"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Mecanicien
              </TabsTrigger>
              <TabsTrigger
                value="menuisier"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Menuisier
              </TabsTrigger>
              <TabsTrigger
                value="electricien"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Electricien
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <FeaturedFreelancers
                  name="Thomas Dubois"
                  title="Maçon"
                  rating={4.9}
                  reviews={124}
                  hourlyRate="4500 FCFA"
                  imageSrc="/fake pp/pp1.jpg"
                  isFeatured={true}
                />
                <FeaturedFreelancers
                  name="Sophie Martin"
                  title="Electricien"
                  rating={4.8}
                  reviews={87}
                  hourlyRate="5500 FCFA"
                  imageSrc="/fake pp/pp3.jpeg"
                />
                <FeaturedFreelancers
                  name="Marc Leroy"
                  title="Menuisier"
                  rating={4.7}
                  reviews={63}
                  hourlyRate="4000 FCFA"
                  imageSrc="/fake pp/pp2.avif"
                />
                <FeaturedFreelancers
                  name="Emma Rodriguez"
                  title="Electricien"
                  rating={4.9}
                  reviews={92}
                  hourlyRate="3500 FCFA"
                  imageSrc="/fake pp/pp4.jpg"
                />
              </div>
            </TabsContent>

            <TabsContent value="development" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <FeaturedFreelancers
                  name="Thomas Dubois"
                  title="Développeur Full Stack"
                  rating={4.9}
                  reviews={124}
                  hourlyRate="4500 FCFA"
                  imageSrc="/placeholder.svg?height=300&width=300"
                  isFeatured={true}
                />
                <FeaturedFreelancers
                  name="Julie Moreau"
                  title="Développeuse Mobile"
                  rating={4.8}
                  reviews={76}
                  hourlyRate="5000 FCFA"
                  imageSrc="/placeholder.svg?height=300&width=300"
                />
                <FeaturedFreelancers
                  name="Alexandre Petit"
                  title="Expert WordPress"
                  rating={4.6}
                  reviews={58}
                  hourlyRate="4000 FCFA"
                  imageSrc="/placeholder.svg?height=300&width=300"
                />
                <FeaturedFreelancers
                  name="Camille Durand"
                  title="Développeuse Frontend"
                  rating={4.7}
                  reviews={82}
                  hourlyRate="4500 FCFA"
                  imageSrc="/placeholder.svg?height=300&width=300"
                />
              </div>
            </TabsContent>

            {/* Other tabs would have similar content structure */}
            <TabsContent value="design" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <FeaturedFreelancers
                  name="Sophie Martin"
                  title="Designer UX/UI"
                  rating={4.8}
                  reviews={87}
                  hourlyRate="5500 FCFA"
                  imageSrc="/placeholder.svg?height=300&width=300"
                  isFeatured={true}
                />
                {/* More designers would be listed here */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Vous êtes un prestataire de services ?</h2>
            <p className="text-xl mb-8 text-white/90">
              Rejoignez notre plateforme et développez votre activité en touchant de nouveaux clients.
            </p>
            <Button variant="secondary" size="lg" onClick={() => router.push("/auth/register")}>
              Je m'inscris
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
