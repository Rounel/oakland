"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "motion/react"
import { Star, MapPin, Phone, Mail, Globe, Check, Edit2, Loader2, MessageSquare } from "lucide-react"
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
import { ProviderProps } from "@/types/datatypes"
import { profileSchema, ProfileFormValues } from "@/schemas/profile"
import { ContactFormValues, contactSchema } from "@/schemas/contact"
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
      'Authorization': `Bearer ${localStorage.getItem('token')}` || '',
      ...options.headers,
    },
  })
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }
  return response.json()
}

export default function MeDetail() {
  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [provider, setProvider] = useState<ProviderProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contacts, setContacts] = useState<any[]>([])
  const [isLoadingContacts, setIsLoadingContacts] = useState(false)
  const [showContacts, setShowContacts] = useState(false)

  // Fetch provider data
  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        setIsLoading(true)
        const data = await getCurrentUser()
        console.log("DATA FROM USER AUTH/ME", data)
        setProvider(data)
      } catch (err) {
        setError("Erreur lors du chargement du profil")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProviderData()
  }, [])

  // Formulaires avec valeurs par défaut
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: provider ? `${provider.first_name} ${provider.last_name}` : "",
      profession: provider?.provider_info?.company_name ?? "",
      description: provider?.provider_info?.description ?? "",
    },
  })

  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone: provider?.phone || "",
      email: provider?.email || "",
      address: provider?.provider_info?.address || "",
      city: provider?.provider_info?.city || "",
      postal_code: provider?.provider_info?.postal_code || "",
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

  // Synchroniser les formulaires avec les données du provider
  useEffect(() => {
    if (provider) {
      profileForm.reset({
        name: `${provider.first_name} ${provider.last_name}`,
        profession: provider?.provider_info?.company_name ?? "",
        description: provider?.provider_info?.description ?? "",
      });
      contactForm.reset({
        phone: provider?.phone || "",
        email: provider?.email || "",
        address: provider?.provider_info?.address || "",
        city: provider?.provider_info?.city || "",
        postal_code: provider?.provider_info?.postal_code || "",
      });
      pricingForm.reset({
        standardPrice: provider?.services.find(s => s.name === "Service standard")?.price?.toString() || "",
        premiumPrice: provider?.services.find(s => s.name === "Service premium")?.price?.toString() || "",
        dayPrice: provider?.services.find(s => s.name === "Forfait journée")?.price?.toString() || "",
      });
      scheduleForm.reset({
        schedules: provider?.schedules?.map(s => ({ ...s, provider: provider.id })) || [],
      });
      // Pas besoin de reset pour galleryForm sauf si on veut pré-remplir les images
    }
  }, [provider]);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      setIsLoadingContacts(true)
      const response = await apiCall('/visitor-contacts/')
      setContacts(response)
    } catch (err) {
      setError("Erreur lors du chargement des contacts")
    } finally {
      setIsLoadingContacts(false)
    }
  }

  // Handle contact status update
  const handleContactStatus = async (contactId: number, status: 'accepted' | 'rejected') => {
    try {
      setIsLoading(true)
      await apiCall(`/visitor-contacts/${contactId}/${status}/`, {
        method: 'POST'
      })
      await fetchContacts() // Refresh contacts after update
    } catch (err) {
      setError(`Erreur lors de la mise à jour du statut du contact`)
    } finally {
      setIsLoading(false)
    }
  }

  // Soumission profil
  const onProfileSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true)
      const nameParts = data.name.split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''
      await apiCall(`/providers/${provider?.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          company_name: data.profession,
          description: data.description,
        })
      })
      setProvider({ ...provider!, first_name: firstName, last_name: lastName, provider_info: { ...provider!.provider_info, company_name: data.profession, description: data.description } })
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
      await apiCall(`/providers/${provider?.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({
          phone: data.phone || '',
          email: data.email || '',
          address: (data.address ?? '').toString(),
          city: (data.city ?? '').toString(),
          postal_code: (data.postal_code ?? '').toString(),
        })
      })
      setProvider({ ...provider!, phone: data.phone, email: data.email, provider_info: { ...provider!.provider_info, address: (data.address ?? '').toString(), city: (data.city ?? '').toString(), postal_code: (data.postal_code ?? '').toString() } })
      setIsEditing(false)
      setActiveSection(null)
    } catch (err) {
      setError("Erreur lors de la mise à jour des coordonnées")
    } finally {
      setIsLoading(false)
    }
  }

  // Soumission service
  const onServiceSubmit = async (data: ServiceFormValues) => {
    try {
      setIsLoading(true)
      await apiCall('/services/', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          price: data.price,
          duration: data.duration,
        })
      })
      // Optionnel : recharger les services du provider ici
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
      const services = [
        { name: "Service standard", price: parseFloat(data.standardPrice), duration: "1h" },
        { name: "Service premium", price: parseFloat(data.premiumPrice), duration: "1h" },
        { name: "Forfait journée", price: parseFloat(data.dayPrice), duration: "8h" },
      ]
      await apiCall(`/providers/${provider?.id}/update_services/`, {
        method: 'PATCH',
        body: JSON.stringify({ services })
      })
      // Optionnel : recharger les services du provider ici
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
      data.images.forEach((image) => {
        formData.append('image', image)
      })
      // Si tu veux ajouter une description globale, décommente la ligne suivante :
      // if (data.description) formData.append('description', data.description)
      await fetch(`${BASE_API_URL}/gallery/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      })
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
      const promises = data.schedules.map(schedule =>
        apiCall(`/schedules/${schedule.id}/`, {
          method: 'PUT',
          body: JSON.stringify({
            day: schedule.day,
            opening_time: schedule.opening_time,
            closing_time: schedule.closing_time,
            is_closed: schedule.is_closed,
          })
        })
      )
      await Promise.all(promises)
      setIsEditing(false)
      setActiveSection(null)
    } catch (err) {
      setError("Erreur lors de la mise à jour des horaires")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!user) {
      router.push('/auth/login/')
    }
  }, [user, router])

  const getProfilePhotoUrl = (photo: string | undefined) => {
    if (!photo) return "/ap.png"
    return MEDIA_API_URL ? `${MEDIA_API_URL}${photo}` : "/ap.png"
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Chargement...</p>
      </div>
    )
  }
  
  if (provider && provider.provider_info.status !== "approved") {
    return (
      <div className="container mx-auto px-4 py-20 text-center h-screen flex justify-center items-center flex-col">
        <h1 className={`text-3xl font-bold mb-4 ${provider.provider_info.status === "rejected" ? "text-red-400" : ""}`}>
          {
            provider.provider_info.status === "pending" && "Compte pas encore approuvé"
          }
          {
            provider.provider_info.status === "rejected" && "Compte rejeté"
          }
        </h1>

        <p className={`mb-8 max-w-sm text-xl ${provider.provider_info.status === "rejected" ? "text-red-400" : ""}`}>
          {
            provider.provider_info.status === "pending" && "Votre compte n'a pas encore été approuvé par un admin. Veuillez patienter s'il vous plaît."
          }
          {
            provider.provider_info.status === "rejected" && "Votre compte a été rejeté par un admin."
          }
        </p>

        {/* <Button onClick={() => router.push("/recherche")}>
          En attente
        </Button> */}
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

  const EditButton = ({ section }: { section: string }) => (
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
              <Input className="min-w-xs" {...profileForm.register("name")} />
              {profileForm.formState.errors.name && (
                <p className="text-sm text-red-500">{profileForm.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label>Profession</label>
              <Input className="min-w-xs" {...profileForm.register("profession")} />
              {profileForm.formState.errors.profession && (
                <p className="text-sm text-red-500">{profileForm.formState.errors.profession.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label>Description</label>
              <Textarea className="min-w-xs" {...profileForm.register("description")} />
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

  if (!provider) {
    return null
  }

  return (
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
                src={MEDIA_API_URL ? (MEDIA_API_URL + provider?.profile_photo) : "ap.png"} 
                alt={`${provider.first_name} ${provider.last_name}`}
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
                {`${provider.first_name} ${provider.last_name}`}
              </motion.h1>

              <motion.p
                className="text-xl text-gray-700 dark:text-gray-300 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {provider.provider_info.company_name}
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center md:justify-start gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="text-gray-500 dark:text-gray-400 ml-1">({provider.reviews?.length || 0} avis)</span>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-gray-700 dark:text-gray-300">{provider.provider_info.address}, {provider.provider_info.city}</span>
                </div>

                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setShowContacts(true)
                    fetchContacts()
                  }}
                >
                  <MessageSquare className="h-4 w-4" />
                  Contacts
                </Button>
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
                    {provider.provider_info.description || "Aucune description disponible."}
                  </p>
                  <EditButton section="profile" />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Galerie</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {provider.gallery.map((image) => (
                      <div key={`gik${image.id}`} className="relative aspect-square rounded-lg overflow-hidden">
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
                      <li key={`ssk${service.id}`} className="flex items-start">
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
                    <p className="text-gray-700 dark:text-gray-300">{provider.provider_info.address || "Adresse non renseignée"}</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {provider.provider_info.city && provider.provider_info.postal_code
                        ? `${provider.provider_info.postal_code} ${provider.provider_info.city}, France`
                        : provider.provider_info.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <a href={`tel:${provider.phone}`} className="text-primary hover:underline">
                    {provider.phone}
                  </a>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <a href={`mailto:${provider.email}`} className="text-primary hover:underline">
                    {provider.email}
                  </a>
                </div>
              </div>
              <EditButton section="contact" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Horaires</h2>

              <div className="space-y-2">
                {provider.schedules.map((schedule, index) => (
                  <div key={`ssck${schedule.id}${index}`} className="flex justify-between">
                    {!schedule.is_closed ? (
                      <>
                        <span className="text-gray-700 dark:text-gray-300">{schedule.day}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{schedule.opening_time} - {schedule.closing_time}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-700 dark:text-gray-300">{schedule.day}</span>
                        <span className="font-medium text-red-700 dark:text-red-200">Closed</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <EditButton section="schedule" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Localisation</h2>

              <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                {provider.provider_info.latitude && provider.provider_info.longitude ? (
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

      {/* Contacts Modal */}
      <Dialog open={showContacts} onOpenChange={setShowContacts}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Demandes de contact</DialogTitle>
          </DialogHeader>
          
          {isLoadingContacts ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : contacts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucune demande de contact</p>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      {contact.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleContactStatus(contact.id, 'accepted')}
                            disabled={isLoading}
                          >
                            Accepter
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleContactStatus(contact.id, 'rejected')}
                            disabled={isLoading}
                          >
                            Refuser
                          </Button>
                        </>
                      )}
                      {contact.status === 'accepted' && (
                        <span className="text-green-500 text-sm">Accepté</span>
                      )}
                      {contact.status === 'rejected' && (
                        <span className="text-red-500 text-sm">Refusé</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{contact.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Reçu le {new Date(contact.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
