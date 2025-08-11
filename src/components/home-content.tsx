"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import HomeHeroSection from "@/components/home-hero-section"
import HowItWorksSection from "@/components/how-it-works"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { FeaturedFreelancers } from "./home/featured-freelancers"
import { searchProviders } from "@/services/services"
import { ProvidersProps } from "@/types/datatypes"
import PricingSection from "./pricing-section"
import PopularCategoriesSection from "./popular-categories"
import WhyUseItSection from "./why-use-it"
import StatisticsBar from "./stats-section"
import FaqSection from "./faq"

export default function HomeContent() {
  const router = useRouter()
  const [providers, setProviders] = useState<ProvidersProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await searchProviders({})
        setProviders(response.results || [])
      } catch (err) {
        setError("Erreur lors du chargement des prestataires")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProviders()
  }, [])

  const getProvidersByCategory = (category: string) => {
    if (!providers) return []
    if (category === 'all') return providers
    return providers.filter(provider => provider.category?.toLowerCase() === category.toLowerCase())
  }

  const getAveragePrice = (provider: ProvidersProps) => {
    if (!provider.services || provider.services.length === 0) return 0
    const total = provider.services.reduce((sum, service) => sum + service.price, 0)
    return Math.round(total / provider.services.length)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HomeHeroSection />
      
      {/* Statistics Bar */}
      <StatisticsBar />

      {/* Featured Deals Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              Professionels trouvés autour de vous
            </h2>
            <Link 
              href="/search" 
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Explorer tous les professionels <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 overflow-x-auto">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-3 sm:px-4 py-2 text-sm sm:text-base whitespace-nowrap data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Tous
              </TabsTrigger>
              <TabsTrigger
                value="maçon"
                className="rounded-none border-b-2 border-transparent px-3 sm:px-4 py-2 text-sm sm:text-base whitespace-nowrap data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Maçon
              </TabsTrigger>
              <TabsTrigger
                value="mecano"
                className="rounded-none border-b-2 border-transparent px-3 sm:px-4 py-2 text-sm sm:text-base whitespace-nowrap data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Mecanicien
              </TabsTrigger>
              <TabsTrigger
                value="menuisier"
                className="rounded-none border-b-2 border-transparent px-3 sm:px-4 py-2 text-sm sm:text-base whitespace-nowrap data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Menuisier
              </TabsTrigger>
              <TabsTrigger
                value="electricien"
                className="rounded-none border-b-2 border-transparent px-3 sm:px-4 py-2 text-sm sm:text-base whitespace-nowrap data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Electricien
              </TabsTrigger>
            </TabsList>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : providers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">Aucun prestataire trouvé</div>
            ) : (
              <>
                <TabsContent value="all" className="mt-4 sm:mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {getProvidersByCategory('all').map((provider) => (
                      <FeaturedFreelancers
                        key={provider.id}
                        name={`${provider.first_name} ${provider.last_name}`}
                        title={provider.category || ''}
                        rating={provider.rating || 0}
                        reviews={provider.reviews?.length || 0}
                        hourlyRate={`${getAveragePrice(provider)} FCFA`}
                        imageSrc={provider.profile_photo || "/ap.png"}
                        isFeatured={provider.is_validated}
                      />
                    ))}
                  </div>
                </TabsContent>

                {['maçon', 'mecano', 'menuisier', 'electricien'].map((category) => (
                  <TabsContent key={category} value={category} className="mt-4 sm:mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                      {getProvidersByCategory(category).map((provider) => (
                        <FeaturedFreelancers
                          key={provider.id}
                          name={`${provider.first_name} ${provider.last_name}`}
                          title={provider.category || ''}
                          rating={provider.rating || 0}
                          reviews={provider.reviews?.length || 0}
                          hourlyRate={`${getAveragePrice(provider)} FCFA`}
                          imageSrc={provider.profile_photo || "/ap.png"}
                          isFeatured={provider.is_validated}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </>
            )}
          </Tabs>
        </div>
      </section>

      <WhyUseItSection />

      {/* How it works section */}
      <HowItWorksSection />

      <PricingSection />

      <section id="faq" className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mx-auto text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              {"Foire aux questions"}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {"Besoin d'aide ? Voici les réponses aux questions les plus courantes."}
            </p>
          </div>
          <div className="mt-8 sm:mt-10">
            <FaqSection />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-white px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 mx-auto bg-[url('/loginbg.jpg')] bg-cover bg-no-repeat bg-bottom rounded-2xl overflow-hidden relative">
          <div className="bg-black/70 size-full absolute top-0 left-0"></div>
          <div className="max-w-3xl mx-auto text-center relative z-20 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Vous êtes un prestataire de services ?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/90">
              Rejoignez notre plateforme et développez votre activité en touchant de nouveaux clients.
            </p>
            <Button 
              variant="secondary" 
              className="bg-flax text-white hover:bg-flax/90" 
              size="lg" 
              onClick={() => router.push("/auth/register")}
            >
              Je m'inscris
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
