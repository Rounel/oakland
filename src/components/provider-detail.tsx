"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "motion/react"
import { Star, MapPin, Phone, Mail, Globe, Facebook, Instagram, Twitter, Check, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/contexts/authContext"
import { BASE_API_URL, getCurrentUser, MEDIA_API_URL } from "@/services/services"
import ScheduleForm from "./schedule-form"
import { ProviderDetailProps, ProvidersProps } from "@/types/datatypes"
import { profileSchema, ProfileFormValues } from "@/schemas/profile"
import { ContactFormValues, contactSchema } from "@/schemas/contact"
import { SocialFormValues, socialSchema } from "@/schemas/social"
import { ServiceFormValues, serviceSchema } from "@/schemas/service"
import { PricingFormValues, pricingSchema } from "@/schemas/pricing"
import { GalleryFormValues, gallerySchema } from "@/schemas/gallery"
import { ScheduleFormValues, scheduleSchema } from "@/schemas/schedule"


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

export default function ProviderDetail({ provider: initialProvider, reviews: initialReviews }: ProviderDetailProps) {
  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [provider, setProvider] = useState(initialProvider)
  const [reviews, setReviews] = useState(initialReviews)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  // Formulaires avec valeurs par défaut robustes
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: provider ? `${getUserInfo(provider).first_name} ${getUserInfo(provider).last_name}` : "",
      profession: getProviderInfo(provider!)?.company_name ?? "",
      description: getProviderInfo(provider!)?.description ?? "",
    },
  })
  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      address: getProviderInfo(provider!)?.address || "",
      city: getProviderInfo(provider!)?.city || "",
      postal_code: getProviderInfo(provider!)?.postal_code || "",
      phone: getUserInfo(provider!).phone || "",
      email: getUserInfo(provider!).email || "",
      website: getProviderInfo(provider!)?.website || "",
    },
  })
  const socialForm = useForm<SocialFormValues>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      facebook: provider?.social_media?.facebook || "",
      instagram: provider?.social_media?.instagram || "",
      twitter: provider?.social_media?.twitter || "",
    },
  })
  const serviceForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      duration: "",
    },
  })
  const pricingForm = useForm<PricingFormValues>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      standardPrice: provider?.services.find(s => s.name === "Service standard")?.price?.toString() || "",
      premiumPrice: provider?.services.find(s => s.name === "Service premium")?.price?.toString() || "",
      dayPrice: provider?.services.find(s => s.name === "Forfait journée")?.price?.toString() || "",
    },
  })
  const galleryForm = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      images: [],
    },
  })
  const scheduleForm = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      schedules: provider?.schedules?.map(s => ({ ...s, provider: provider.id })) || [],
    },
  })

  // Soumission profil
  const onProfileSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true)
      const nameParts = data.name.split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''
      const response = await apiCall(`/providers/${provider?.provider_info.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          provider_info: {
            company_name: data.profession,
            description: data.description
          }
        })
      })
      setProvider({ ...provider!, first_name: firstName, last_name: lastName, provider_info: { ...getProviderInfo(provider!), company_name: data.profession, description: data.description } })
      setIsEditing(false)
      setActiveSection(null)
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil")
    } finally {
      setIsLoading(false)
    }
  }

  // Soumission contact
  const onContactSubmit = async (data: ContactFormValues) => {
    try {
      setIsLoading(true)
      const response = await apiCall(`/providers/${provider?.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({
          phone: data.phone || '',
          email: data.email || '',
          provider_info: {
            address: (data.address ?? '').toString(),
            city: (data.city ?? '').toString(),
            postal_code: (data.postal_code ?? '').toString(),
            website: (data.website ?? '').toString()
          }
        })
      })
      setProvider({ ...provider!, phone: data.phone, email: data.email, provider_info: { ...getProviderInfo(provider!), address: (data.address ?? '').toString(), city: (data.city ?? '').toString(), postal_code: (data.postal_code ?? '').toString(), website: (data.website ?? '').toString() } })
      setIsEditing(false)
      setActiveSection(null)
    } catch (err) {
      setError("Erreur lors de la mise à jour des coordonnées")
    } finally {
      setIsLoading(false)
    }
  }

  // Soumission réseaux sociaux
  const onSocialSubmit = async (data: SocialFormValues) => {
    try {
      setIsLoading(true)
      const response = await apiCall(`/social-media/${provider?.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ ...data, provider: provider?.id })
      })
      setProvider({ ...provider!, social_media: response })
      setIsEditing(false)
      setActiveSection(null)
    } catch (err) {
      setError("Erreur lors de la mise à jour des réseaux sociaux")
    } finally {
      setIsLoading(false)
    }
  }

  // Soumission service
  const onServiceSubmit = async (data: ServiceFormValues) => {
    try {
      setIsLoading(true)
      const response = await apiCall('/services/', {
        method: 'POST',
        body: JSON.stringify({ ...data, provider: provider?.id })
      })
      setProvider({ ...provider!, services: [...(provider?.services || []), response] })
      setIsEditing(false)
      setActiveSection(null)
    } catch (err) {
      setError("Erreur lors de l'ajout du service")
    } finally {
      setIsLoading(false)
    }
  }

  // Soumission tarifs
  const onPricingSubmit = async (data: PricingFormValues) => {
    try {
      setIsLoading(true)
      // On met à jour les trois services principaux
      const services = [
        { name: "Service standard", price: parseFloat(data.standardPrice), duration: "1h", provider: provider?.id },
        { name: "Service premium", price: parseFloat(data.premiumPrice), duration: "1h", provider: provider?.id },
        { name: "Forfait journée", price: parseFloat(data.dayPrice), duration: "8h", provider: provider?.id },
      ]
      // Ici, on pourrait faire un appel PATCH sur chaque service ou un endpoint dédié si disponible
      // Pour l'exemple, on fait PATCH sur le provider
      const response = await apiCall(`/providers/${provider?.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ services })
      })
      setProvider({ ...provider!, services: response.services })
      setIsEditing(false)
      setActiveSection(null)
    } catch (err) {
      setError("Erreur lors de la mise à jour des tarifs")
    } finally {
      setIsLoading(false)
    }
  }

  // Soumission galerie
  const onGallerySubmit = async (data: GalleryFormValues) => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      data.images.forEach((image: File) => {
        formData.append('image', image)
      })
      formData.append('provider', provider?.id.toString() || '')
      const response = await fetch(`${BASE_API_URL}/gallery/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: formData,
      })
      if (!response.ok) throw new Error('Upload failed')
      const responseData = await response.json()
      setProvider({ ...provider!, gallery: [...(provider?.gallery || []), responseData] })
      setIsEditing(false)
      setActiveSection(null)
    } catch (err) {
      setError("Erreur lors de l'ajout des images")
    } finally {
      setIsLoading(false)
    }
  }

  // Soumission horaires
  const onScheduleSubmit = async (data: ScheduleFormValues) => {
    try {
      setIsLoading(true)
      const schedulePromises = data.schedules.map(schedule =>
        apiCall(`/schedules/${schedule.id}/`, {
          method: 'PUT',
          body: JSON.stringify({ ...schedule, provider: provider?.id })
        })
      )
      const responses = await Promise.all(schedulePromises)
      setProvider({ ...provider!, schedules: responses })
      setIsEditing(false)
      setActiveSection(null)
    } catch (err) {
      setError("Erreur lors de la mise à jour des horaires")
    } finally {
      setIsLoading(false)
    }
  }

  const onAddReview = async (data: { rating: number; comment: string }) => {
    try {
      setIsLoading(true)
      const response = await apiCall(`/providers/${provider?.id}/add_review/`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      setReviews(prev => [...(prev || []), response])
      if (provider) {
        const updatedProvider = {
          ...provider,
          provider_info: {
            ...getProviderInfo(provider),
            rating: response.provider_rating
          }
        }
        setProvider(updatedProvider)
      }
    } catch (err) {
      setError("Erreur lors de l'ajout de l'avis")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    if (pathname.includes('/me') && !user) {
      router.push('/auth/login/')
    }
  }, [pathname, user, router])

  const getProfilePhotoUrl = (photo: string | undefined) => {
    if (!photo) return "/placeholder.svg"
    return MEDIA_API_URL ? `${MEDIA_API_URL}${photo}` : "/placeholder.svg"
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

  const EditButton = ({ section }: { section: string }) => {
    if (provider?.id !== user?.id) return null

    return (
      <Dialog open={isEditing && activeSection === section} onOpenChange={(open) => {
        setIsEditing(open)
        setActiveSection(open ? section : null)
      }}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-fit">
          <DialogHeader>
            <DialogTitle>
              {section === "profile" && "Modifier le profil"}
              {section === "contact" && "Modifier les coordonnées"}
              {section === "social" && "Modifier les réseaux sociaux"}
              {section === "services" && "Modifier les services"}
              {section === "pricing" && "Modifier les tarifs"}
              {section === "gallery" && "Modifier la galerie"}
              {section === "schedule" && "Modifier les horaires"}
            </DialogTitle>
          </DialogHeader>
          {section === "profile" && (
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label>Nom</label>
                <Input {...profileForm.register("name")} />
                {profileForm.formState.errors.name && (
                  <p className="text-sm text-red-500">{profileForm.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Profession</label>
                <Input {...profileForm.register("profession")} />
                {profileForm.formState.errors.profession && (
                  <p className="text-sm text-red-500">{profileForm.formState.errors.profession.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Description</label>
                <Textarea {...profileForm.register("description")} />
                {profileForm.formState.errors.description && (
                  <p className="text-sm text-red-500">{profileForm.formState.errors.description.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          )}
          {section === "contact" && (
            <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label>Adresse</label>
                <Input {...contactForm.register("address")} />
                {contactForm.formState.errors.address && (
                  <p className="text-sm text-red-500">{contactForm.formState.errors.address.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Ville</label>
                <Input {...contactForm.register("city")} />
                {contactForm.formState.errors.city && (
                  <p className="text-sm text-red-500">{contactForm.formState.errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Code postal</label>
                <Input {...contactForm.register("postal_code")} />
                {contactForm.formState.errors.postal_code && (
                  <p className="text-sm text-red-500">{contactForm.formState.errors.postal_code.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Téléphone</label>
                <Input {...contactForm.register("phone")} />
                {contactForm.formState.errors.phone && (
                  <p className="text-sm text-red-500">{contactForm.formState.errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Email</label>
                <Input {...contactForm.register("email")} />
                {contactForm.formState.errors.email && (
                  <p className="text-sm text-red-500">{contactForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Site web</label>
                <Input {...contactForm.register("website")} />
                {contactForm.formState.errors.website && (
                  <p className="text-sm text-red-500">{contactForm.formState.errors.website.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          )}
          {section === "social" && (
            <form onSubmit={socialForm.handleSubmit(onSocialSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label>Facebook</label>
                <Input {...socialForm.register("facebook")} />
                {socialForm.formState.errors.facebook && (
                  <p className="text-sm text-red-500">{socialForm.formState.errors.facebook.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Instagram</label>
                <Input {...socialForm.register("instagram")} />
                {socialForm.formState.errors.instagram && (
                  <p className="text-sm text-red-500">{socialForm.formState.errors.instagram.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Twitter</label>
                <Input {...socialForm.register("twitter")} />
                {socialForm.formState.errors.twitter && (
                  <p className="text-sm text-red-500">{socialForm.formState.errors.twitter.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          )}
          {section === "services" && (
            <form onSubmit={serviceForm.handleSubmit(onServiceSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label>Nom du service</label>
                <Input {...serviceForm.register("name")} />
                {serviceForm.formState.errors.name && (
                  <p className="text-sm text-red-500">{serviceForm.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Description</label>
                <Textarea {...serviceForm.register("description")} />
                {serviceForm.formState.errors.description && (
                  <p className="text-sm text-red-500">{serviceForm.formState.errors.description.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Prix</label>
                <Input type="number" {...serviceForm.register("price")} />
                {serviceForm.formState.errors.price && (
                  <p className="text-sm text-red-500">{serviceForm.formState.errors.price.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Durée</label>
                <Input {...serviceForm.register("duration")} placeholder="ex: 1h30" />
                {serviceForm.formState.errors.duration && (
                  <p className="text-sm text-red-500">{serviceForm.formState.errors.duration.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          )}
          {section === "pricing" && (
            <form onSubmit={pricingForm.handleSubmit(onPricingSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label>Service standard (€/heure)</label>
                <Input type="number" {...pricingForm.register("standardPrice")} />
                {pricingForm.formState.errors.standardPrice && (
                  <p className="text-sm text-red-500">{pricingForm.formState.errors.standardPrice.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Service premium (€/heure)</label>
                <Input type="number" {...pricingForm.register("premiumPrice")} />
                {pricingForm.formState.errors.premiumPrice && (
                  <p className="text-sm text-red-500">{pricingForm.formState.errors.premiumPrice.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Forfait journée (€)</label>
                <Input type="number" {...pricingForm.register("dayPrice")} />
                {pricingForm.formState.errors.dayPrice && (
                  <p className="text-sm text-red-500">{pricingForm.formState.errors.dayPrice.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          )}
          {section === "gallery" && (
            <form onSubmit={galleryForm.handleSubmit(onGallerySubmit)} className="space-y-4">
              <div className="space-y-2">
                <label>Images</label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    galleryForm.setValue("images", files)
                  }}
                />
                {galleryForm.formState.errors.images && (
                  <p className="text-sm text-red-500">{galleryForm.formState.errors.images.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          )}
          {section === "schedule" && (
            <form onSubmit={scheduleForm.handleSubmit(onScheduleSubmit)} className="space-y-4">
              <ScheduleForm 
                onSchedulesChange={(schedules) => {
                  scheduleForm.setValue("schedules", schedules)
                }}
                initialSchedules={provider?.schedules.map(schedule => ({
                  provider: provider?.id,
                  id: schedule.id,
                  day: schedule.day,
                  opening_time: schedule.opening_time,
                  closing_time: schedule.closing_time,
                  is_closed: schedule.is_closed
                }))}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
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
                <EditButton section="profile" />
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
                </TabsList>

                <TabsContent value="presentation" className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">À propos</h2>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {getProviderInfo(provider).description || "Aucune description disponible."}
                    </p>
                    <EditButton section="profile" />
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Galerie</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {provider.gallery.map((image) => (
                        <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={image.image}
                            alt={`Galerie ${image.id}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                    <EditButton section="gallery" />
                  </div>
                </TabsContent>

                <TabsContent value="services" className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Services proposés</h2>
                    <ul className="space-y-3">
                      {provider.services.map((service) => (
                        <li key={service.id} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{service.name}</span>
                        </li>
                      ))}
                    </ul>
                    <EditButton section="services" />
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
                    <EditButton section="pricing" />
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

                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <a
                      href={getProviderInfo(provider).website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {getProviderInfo(provider).website}
                    </a>
                  </div>
                </div>
                <EditButton section="contact" />
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Réseaux sociaux</h2>

                <div className="flex space-x-4">
                {
                  provider.social_media ? (
                  <>
                    <a
                      href={provider.social_media.facebook}
                      className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook size={20} />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href={provider.social_media.instagram}
                      className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram size={20} />
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a
                      href={provider.social_media.twitter}
                      className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter size={20} />
                      <span className="sr-only">Twitter</span>
                    </a>
                  </>
                  ) : (
                  <p>Pas de réseaux sociaux</p>
                  )
                }
                </div>
                <EditButton section="social" />
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Horaires</h2>

                <div className="space-y-2">
                  {provider.schedules.map((schedule) => (
                    <div key={schedule.id} className="flex justify-between">
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
                <EditButton section="schedule" />
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
