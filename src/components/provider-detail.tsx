"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, MapPin, Phone, Mail, Globe, Facebook, Instagram, Twitter, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Provider, Review } from "@/services/supabase-service"

interface ProviderDetailProps {
  provider: Provider | null
  reviews: Review[]
}

export default function ProviderDetail({ provider, reviews }: ProviderDetailProps) {
  const router = useRouter()

  if (!provider) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Prestataire non trouvé</h1>
        <p className="mb-8">Le prestataire que vous recherchez n'existe pas ou a été supprimé.</p>
        <Button onClick={() => router.push("/recherche")}>Retour à la recherche</Button>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg"
            >
              <Image src={provider.image || "/placeholder.svg"} alt={provider.name} fill className="object-cover" />
            </motion.div>

            <div className="text-center md:text-left">
              <motion.h1
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {provider.name}
              </motion.h1>

              <motion.p
                className="text-xl text-gray-700 dark:text-gray-300 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {provider.profession}
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center md:justify-start gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="font-medium">{provider.rating.toFixed(1)}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">({reviews.length} avis)</span>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-gray-700 dark:text-gray-300">{provider.location}</span>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center md:justify-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button>Contacter</Button>
                <Button variant="outline">Demander un devis</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="presentation">
              <TabsList className="mb-6">
                <TabsTrigger value="presentation">Présentation</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="avis">Avis</TabsTrigger>
              </TabsList>

              <TabsContent value="presentation" className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">À propos</h2>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {provider.description || "Aucune description disponible."}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Galerie</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={`/placeholder.svg?key=c1avh&key=zpdum&height=300&width=300&query=service provider work sample ${item}`}
                          alt={`Galerie ${item}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Services proposés</h2>
                  <ul className="space-y-3">
                    {["Service 1", "Service 2", "Service 3", "Service 4", "Service 5"].map((service, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tarifs</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">Service standard</span>
                      <span className="font-medium text-gray-900 dark:text-white">50€ / heure</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">Service premium</span>
                      <span className="font-medium text-gray-900 dark:text-white">75€ / heure</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">Forfait journée</span>
                      <span className="font-medium text-gray-900 dark:text-white">350€</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    * Les tarifs sont donnés à titre indicatif et peuvent varier selon les spécificités de votre projet.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="avis" className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Avis clients</h2>

                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <div
                          key={review.id}
                          className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{review.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(review.date).toLocaleDateString("fr-FR")}
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-gray-600"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        Aucun avis pour le moment. Soyez le premier à donner votre avis !
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Coordonnées</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">{provider.address || "Adresse non renseignée"}</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {provider.city && provider.postal_code
                        ? `${provider.postal_code} ${provider.city}, France`
                        : provider.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <a href="tel:+33123456789" className="text-primary hover:underline">
                    +33 1 23 45 67 89
                  </a>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <a href="mailto:contact@example.com" className="text-primary hover:underline">
                    contact@example.com
                  </a>
                </div>

                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <a
                    href="https://www.example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.example.com
                  </a>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                >
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                >
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                >
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Horaires</h2>

              <div className="space-y-2">
                {[
                  { day: "Lundi", hours: "9h00 - 18h00" },
                  { day: "Mardi", hours: "9h00 - 18h00" },
                  { day: "Mercredi", hours: "9h00 - 18h00" },
                  { day: "Jeudi", hours: "9h00 - 18h00" },
                  { day: "Vendredi", hours: "9h00 - 17h00" },
                  { day: "Samedi", hours: "Fermé" },
                  { day: "Dimanche", hours: "Fermé" },
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{schedule.day}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Localisation</h2>

              <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                {provider.latitude && provider.longitude ? (
                  <div className="w-full h-full">
                    {/* Ici, vous pourriez intégrer une carte Google Maps ou OpenStreetMap */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center px-4">
                        Carte interactive disponible dans la version complète.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center px-4">
                      Localisation précise non disponible.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
