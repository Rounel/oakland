"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "motion/react"
import { Star, MapPin, Phone, Mail, Globe, Check, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/authContext"
import { BASE_API_URL, getCurrentUser, MEDIA_API_URL } from "@/services/services"
import { contactService } from "@/services/api"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ProviderDetailProps, ProvidersProps } from "@/types/datatypes"


// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${BASE_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}` || '',
      ...options.headers,
    },
  })
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }
  return response.json()
}

const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
})

const quoteFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  service_type: z.string().min(1, "Veuillez sélectionner un service"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  preferred_date: z.string().optional(),
  budget: z.string().optional(),
})

export default function ProviderDetail({ provider: initialProvider, reviews: initialReviews }: ProviderDetailProps) {
  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [provider, setProvider] = useState(initialProvider)
  const [reviews, setReviews] = useState(initialReviews)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [canViewContact, setCanViewContact] = useState(false)
  const [isContactDisabled, setIsContactDisabled] = useState(false)

  const [contactError, setContactError] = useState("")

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const quoteForm = useForm<z.infer<typeof quoteFormSchema>>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service_type: "",
      description: "",
      preferred_date: "",
      budget: "",
    },
  })

  // Helper function to get provider info
  const getProviderInfo = (provider: ProvidersProps) => {
    if (initialProvider === null) {
      return provider.provider_info
    }
    return provider.user.provider_info
  }

  // Helper function to get user info
  const getUserInfo = (provider: ProvidersProps) => {
    if (initialProvider === null) {
      return {
        first_name: provider.first_name,
        last_name: provider.last_name,
        email: provider.email,
        phone: provider.phone,
        profile_photo: provider.profile_photo
      }
    }
    return {
      first_name: provider.user.first_name,
      last_name: provider.user.last_name,
      email: provider.user.email,
      phone: provider.user.phone,
      profile_photo: provider.user.profile_photo
    }
  }

  // Fetch provider data if not provided
  useEffect(() => {
    const fetchProviderData = async () => {
      if (!initialProvider && pathname.includes('/me')) {
        try {
          setIsLoading(true)
          const data = await getCurrentUser()
          setProvider(data)
        } catch (err) {
          setError("Erreur lors du chargement du profil")
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchProviderData()
  }, [initialProvider, pathname])

  
  useEffect(() => {
    if (pathname.includes('/me') && !user) {
      router.push('/auth/login/')
    }
  }, [pathname, user, router])

  useEffect(() => {
    if (provider) {
      // Vérifier si le contact est déjà enregistré dans le localStorage
      const contactKey = `contact_${provider.user.provider_info.id}`
      const hasContact = localStorage.getItem(contactKey)
      setIsContactDisabled(!!hasContact)

      // Vérifier le statut du contact si il existe
      if (hasContact) {
        checkContactStatus(provider.user.provider_info.id)
      }
    }
  }, [provider])

  const checkContactStatus = async (providerId: number) => {
    try {
      const data = await contactService.checkStatus(providerId)
      setCanViewContact(data.can_view_contact)
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error)
    }
  }

  const getProfilePhotoUrl = (photo: string | undefined) => {
    if (!photo) return "/ap.png"
    return MEDIA_API_URL ? `${MEDIA_API_URL}${photo}` : "/ap.png"
  }

  const handleContact = async (data: z.infer<typeof contactFormSchema>) => {
    if (!provider) {
      toast.error("Prestataire non trouvé")
      return
    }

    try {
      const res = await contactService.sendMessage(provider.user.provider_info.id, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      })

      if (res.error) {
        setContactError(res.error)
      } else {
  
        // Enregistrer le contact dans le localStorage
        const contactKey = `contact_${provider.user.provider_info.id}`
        localStorage.setItem(contactKey, 'pending')
        setIsContactDisabled(true)
  
        toast.success("Message envoyé avec succès")
        console.log("Message envoyé avec succès")
        setIsContactOpen(false)
        setContactError('')
        contactForm.reset()

      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message")
      console.log("Erreur lors de l'envoi du message")
    }
  }

  const handleQuote = async (data: z.infer<typeof quoteFormSchema>) => {
    if (!provider) {
      toast.error("Prestataire non trouvé")
      return
    }

    try {
      await contactService.requestQuote(provider.user.provider_info.id, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service_type: data.service_type,
        description: data.description,
        preferred_date: data.preferred_date,
        budget: data.budget ? parseFloat(data.budget) : undefined,
      })
      toast.success("Demande de devis envoyée avec succès")
      setIsQuoteOpen(false)
      quoteForm.reset()
    } catch (error) {
      toast.error("Erreur lors de la demande de devis")
    }
  }

  if (!provider && !user && !pathname.includes('/me')) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Prestataire non trouvé</h1>
        <p className="mb-8">Le prestataire que vous recherchez n'existe pas ou a été supprimé.</p>
        <Button onClick={() => router.push("/recherche")}>Retour à la recherche</Button>
      </div>
    )
  } 

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Chargement...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Erreur</h1>
        <p className="mb-8">{error}</p>
        <Button onClick={() => setError(null)}>Réessayer</Button>
      </div>
    )
  }


  return (
    <>
      {
        provider && 
        <div className="pt-10 w-full">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg group"
                >
                  <Image 
                    src={getProfilePhotoUrl(getUserInfo(provider).profile_photo)} 
                    alt={provider ? `${getUserInfo(provider).first_name} ${getUserInfo(provider).last_name}` : "profile picture"} 
                    fill 
                    className="object-cover" 
                  />
                </motion.div>

                <div className="text-center md:text-left relative group">
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {`${getUserInfo(provider).first_name} ${getUserInfo(provider).last_name}`}
                  </motion.h1>

                  <motion.p
                    className="text-xl text-gray-700 dark:text-gray-300 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {getProviderInfo(provider).company_name}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap justify-center md:justify-start gap-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="text-gray-500 dark:text-gray-400 ml-1">({reviews?.length} avis)</span>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                      <span className="text-gray-700 dark:text-gray-300">{getProviderInfo(provider).address}, {getProviderInfo(provider).city}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex flex-wrap justify-center md:justify-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setIsContactOpen(true)}
                          disabled={isContactDisabled}
                        >
                          {isContactDisabled ? "Demande en cours" : "Contacter"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contacter {getUserInfo(provider).first_name}</DialogTitle>
                          <DialogDescription>
                            Envoyez un message au prestataire. Il vous répondra dans les plus brefs délais.
                            <br />
                            <span className="text-red-500 italic">
                              {contactError}
                            </span>
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...contactForm}>
                          <form onSubmit={contactForm.handleSubmit(handleContact)} className="space-y-4">
                            <FormField
                              control={contactForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nom complet</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Votre nom..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={contactForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="votre@email.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={contactForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Téléphone</FormLabel>
                                  <FormControl>
                                    <Input type="tel" placeholder="06 12 34 56 78" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={contactForm.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Message</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Votre message..."
                                      className="resize-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <DialogFooter>
                              <Button type="submit">Envoyer</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">Demander un devis</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Demande de devis</DialogTitle>
                          <DialogDescription>
                            Remplissez le formulaire pour demander un devis personnalisé.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...quoteForm}>
                          <form onSubmit={quoteForm.handleSubmit(handleQuote)} className="space-y-4">
                            <FormField
                              control={quoteForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nom complet</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Votre nom..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={quoteForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="votre@email.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={quoteForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Téléphone</FormLabel>
                                  <FormControl>
                                    <Input type="tel" placeholder="06 12 34 56 78" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={quoteForm.control}
                              name="service_type"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Type de service</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un service" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {provider.services.map((service) => (
                                        <SelectItem key={`kujgh${service.id}`} value={service.name}>
                                          {service.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={quoteForm.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description du projet</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Décrivez votre projet..."
                                      className="resize-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={quoteForm.control}
                                name="preferred_date"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Date souhaitée</FormLabel>
                                    <FormControl>
                                      <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={quoteForm.control}
                                name="budget"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Budget estimé (FCFA)</FormLabel>
                                    <FormControl>
                                      <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <DialogFooter>
                              <Button type="submit">Envoyer la demande</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
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
                  </TabsList>

                  <TabsContent value="presentation" className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">À propos</h2>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {getProviderInfo(provider).description || "Aucune description disponible."}
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Galerie</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {provider.gallery.map((image) => (
                          <div key={`azqdsh${image.id}`} className="relative aspect-square rounded-lg overflow-hidden">
                            <Image
                              src={image.image}
                              alt={`Galerie ${image.id}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="services" className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Services proposés</h2>
                      <ul className="space-y-3">
                        {provider.services.map((service) => (
                          <li key={`kdrtwgh${service.id}`} className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{service.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tarifs</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-700 dark:text-gray-300">Service standard</span>
                          <span className="font-medium text-gray-900 dark:text-white">{(provider.services.find(s => s.name === "Service standard")?.price || 0).toFixed(2)}€ / heure</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-700 dark:text-gray-300">Service premium</span>
                          <span className="font-medium text-gray-900 dark:text-white">{(provider.services.find(s => s.name === "Service premium")?.price || 0).toFixed(2)}€ / heure</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-700 dark:text-gray-300">Forfait journée</span>
                          <span className="font-medium text-gray-900 dark:text-white">{(provider.services.find(s => s.name === "Forfait journée")?.price || 0).toFixed(2)}€</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        * Les tarifs sont donnés à titre indicatif et peuvent varier selon les spécificités de votre projet.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Coordonnées</h2>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">{getProviderInfo(provider).address || "Adresse non renseignée"}</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {getProviderInfo(provider).city && getProviderInfo(provider).postal_code
                            ? `${getProviderInfo(provider).postal_code} ${getProviderInfo(provider).city}, France`
                            : getProviderInfo(provider).address}
                        </p>
                      </div>
                    </div>

                    {canViewContact ? (
                      <>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                          <a href={`tel:${getUserInfo(provider).phone}`} className="text-primary hover:underline">
                            {getUserInfo(provider).phone}
                          </a>
                        </div>

                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                          <a href={`mailto:${getUserInfo(provider).email}`} className="text-primary hover:underline">
                            {getUserInfo(provider).email}
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          Pour voir les coordonnées du prestataire, veuillez le contacter.
                        </p>
                        <Button
                          onClick={() => setIsContactOpen(true)}
                          disabled={isContactDisabled}
                        >
                          {isContactDisabled ? "Demande en cours" : "Contacter"}
                        </Button>
                      </div>
                    )}

                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Horaires</h2>

                  <div className="space-y-2">
                    {provider.schedules.map((schedule, index) => (
                      <div key={`ikhl${schedule.id}${index}`} className="flex justify-between">
                        {
                          !schedule.is_closed ? (
                            <>
                              <span className="text-gray-700 dark:text-gray-300">{schedule.day}</span>
                              <span className="font-medium text-gray-900 dark:text-white">{schedule.opening_time} - {schedule.closing_time}</span>
                            </>
                          ) : (
                            <>
                              <span className="text-gray-700 dark:text-gray-300">{schedule.day}</span>
                              <span className="font-medium text-red-700 dark:text-red-200">Closed</span>
                            </>
                          )
                        }
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Localisation</h2>

                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                    {getProviderInfo(provider).latitude && getProviderInfo(provider).longitude ? (
                      <div className="w-full h-full">
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
      }
    </>
  )
}
