"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ChevronRight, ChevronLeft, Upload, Check, Globe, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { categories } from "@/constants/categories"
import { countryCodes } from "@/components/ui/country-codes"
import { registerProvider, uploadImage } from "@/services/services"
import { useAuth } from "@/contexts/authContext"
import Image from "next/image"
import { PasswordStrength } from "@/components/ui/password-strength"
import HeroInfiniteScroll from "./hero-infinite-scroll"
import Link from "next/link"

interface Category {
  id: string
  name: string
  slug: string
}

// Form schema
const formSchema = z.object({
  // Step 1: Personal Information
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une lettre majuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Le mot de passe doit contenir au moins un symbole (!@#$%^&*(),.?\":{}|<>) " }),
  confirmPassword: z.string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une lettre majuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Le mot de passe doit contenir au moins un symbole (!@#$%^&*(),.?\":{}|<>) " }),
  countryCode: z.string().default("+225"),
  phone: z.string().min(6, { message: "Numéro de téléphone invalide" }),

  // Photo de profil dans l'étape 1
  profilePhoto: z.any().optional(),

  // Step 2: Professional Information
  companyName: z.string().min(2, { message: "Le nom commercial doit contenir au moins 2 caractères" }),
  description: z.string().min(50, { message: "La description doit contenir au moins 50 caractères" }),
  category: z.string().min(1, { message: "Veuillez sélectionner une catégorie" }),
  address: z.string().min(5, { message: "L'adresse doit contenir au moins 5 caractères" }),
  city: z.string().min(2, { message: "La ville doit contenir au moins 2 caractères" }),
  postalCode: z.string().min(5, { message: "Code postal invalide" }),

  // Step 5: Terms
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les conditions générales" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>

export default function ProviderRegistrationForm() {
  const {user, setUser} = useAuth()
  const input_file = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      countryCode: "+225",
      phone: "",
      companyName: "",
      description: "",
      category: "",
      profilePhoto: "",
      address: "",
      city: "",
      postalCode: "",
      termsAccepted: true,
    },
    mode: "onChange",
  })

  const nextStep = async () => {
    let fieldsToValidate: string[] = []

    switch (step) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "email", "password", "phone"]
        break
      case 2:
        fieldsToValidate = ["companyName", "description", "category", "address", "city", "postalCode"]
        break
      case 3:
        // No validation for file uploads
        setStep(step + 1)
        return
      case 4:
        // No validation for social media
        setStep(step + 1)
        return
      default:
        break
    }

    const result = await form.trigger(fieldsToValidate as any)
    if (result) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setError(null)
    console.log("Form submitted 0:", data)

    const toSend = {
      "email": data.email,
      "username": data.firstName.toLowerCase().replace("'", "") + '-' + data.lastName.toLowerCase().replace("'", ""),
      "first_name": data.firstName,
      "last_name": data.lastName,
      "password": data.password,
      "confirm_password": data.confirmPassword,
      "phone": `${data.countryCode}${data.phone}`,
      "profile_photo": data.profilePhoto,
      "provider_application": {
        "company_name": data.companyName,
        "description": data.description,
        "category": data.category,
        "address": data.address,
        "city": data.city,
        "postal_code": data.postalCode.replace(/\s/g, ''),
      }
    }
    console.log("Form submitted 1:", toSend)

    try {
      if (data.profilePhoto) {
        const res_upload = await uploadImage(data.profilePhoto)
        console.log("Upload response:", res_upload)
        toSend.profile_photo = res_upload.path
      }
    } catch (err_up) {
      console.error("Error during upload:", err_up)
      setError("Une erreur inattendue est survenue. Veuillez réessayer. (upload)")
      setIsSubmitting(false)
      return
    }
    console.log("Form submitted 2:", toSend)

    try {
      const response = await registerProvider(toSend)
      console.log("Registration response:", response)
      setUser(response)
      setIsSubmitted(true)
      setIsSubmitting(false)

      // Redirect to email confirmation page
      setTimeout(() => {
        router.push(`/confirm-email/${response.id}`)
      }, 1000)
    } catch (err) {
      console.error("Error during registration:", err)
      setError("Une erreur inattendue est survenue. Veuillez réessayer.")
      setIsSubmitting(false)
    }
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i === step
                    ? "bg-zinc-400 text-primary"
                    : i < step
                      ? "bg-green-500 text-black"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {i < step ? <Check size={16} /> : i}
              </div>
              {i < 4 && (
                <div className={`w-12 h-1 ${i < step ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    if (isSubmitted) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full dark:bg-green-900">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-black">Demande envoyée avec succès !</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Votre demande d'inscription a été envoyée et sera examinée dans les 48h. Vous recevrez un email de
            confirmation dès que votre profil sera validé.
          </p>
          <Button asChild>
            <a href="/">Retour à l'accueil</a>
          </Button>
        </motion.div>
      )
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold mb-6 text-black">Informations personnelles</h2>

              <FormField
                control={form.control}
                name="profilePhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-zinc-700">Photo de profil</FormLabel>
                    <div className="border-2 border-dashed flex items-center border-gray-700 dark:border-gray-700 rounded-lg p-1 text-center gap-4">
                      <Button variant="outline" type="button" className="hover:bg-white/80" onClick={(e) => {
                        e.preventDefault()
                        if (input_file.current) {
                          input_file?.current.click()
                        }
                      }}>
                        Parcourir
                      </Button>
                      <p className="text-sm text-zinc-700 dark:text-gray-400">
                        Téléchargez une photo de profil professionnelle
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        ref={input_file}
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          field.onChange(file)
                          if (file) {
                            const url = URL.createObjectURL(file)
                            setPreviewUrl(url)
                          } else {
                            setPreviewUrl(null)
                          }
                        }}
                      />
                    </div>
                    {previewUrl && (
                      <div className="mt-4 relative w-32 h-32 mx-auto overflow-hidden rounded-full border">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-zinc-700">Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre prénom"
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-700">Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom"
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Email</FormLabel>
                    <FormControl>
                      <Input type="email"
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700" placeholder="votre.email@exemple.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <PasswordStrength password={field.value} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Téléphone</FormLabel>
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field: ccField }) => (
                          <Select onValueChange={ccField.onChange} value={ccField.value} defaultValue={ccField.value}>
                            <FormControl>
                              <SelectTrigger 
                      className=" w-28 bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countryCodes.map((c) => (
                                <SelectItem key={`ccf${c.code}`} value={c.code}>{c.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FormControl>
                        <Input placeholder="6 12 34 56 78" {...field} 
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700 flex-1" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6 text-black">Informations professionnelles</h2>

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Nom commercial</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de votre entreprise"
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Description de votre activité</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre activité, vos services, votre expérience..."
                        
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700 min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Minimum 50 caractères</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Catégorie principale</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700">
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={String(category.id)}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Adresse</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Rue de Paris"
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-700">Ville</FormLabel>
                      <FormControl>
                        <Input placeholder="Paris"
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-700">Code postal</FormLabel>
                      <FormControl>
                        <Input placeholder="75001"
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6  text-black">Conditions générales</h2>
              <p className=" text-zinc-700 mb-6">
                Veuillez lire et accepter les conditions générales d'utilisation.
              </p>

              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-white data-[state=checked]:bg-purple-400"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-black">
                        J'accepte les conditions générales d'utilisation
                      </FormLabel>
                      <FormDescription className=" text-zinc-700">
                        En cochant cette case, vous acceptez nos conditions générales d'utilisation.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6 text-black">Validation</h2>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 dark:text-yellow-200">
                  Votre demande d'inscription sera examinée par notre équipe dans un délai de 48h. Vous recevrez un
                  email de confirmation dès que votre profil sera validé.
                </p>
              </div>

              <Button type="submit" className="w-full bg-white text-primary hover:bg-white/80" disabled={isSubmitting || !form.formState.isValid}>
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
              </Button>
            </motion.div>
          )}

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <Button type="button" variant="outline" className="bg-black text-white hover:bg-black/80" onClick={prevStep} disabled={isSubmitting}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>
            )}

            {step < 4 && (
              <Button type="button" onClick={nextStep} className="ml-auto bg-black text-white hover:bg-black/80">
                Suivant
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </Form>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      <section className="flex-1 flex items-center justify-center  relative">
        <div className="w-full absolute top-5 left-5 ">
          <Link href={"/"} className="text-2xl font-bold text-black">
            MonPresta
          </Link>
        </div>
        <div className="max-h-[90dvh] overflow-y-auto mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className=" text-black tracking-tighter text-4xl md:text-5xl font-semibold leading-tight">Inscription Prestataire</h1>
            <p className=" text-zinc-700 dark:text-gray-400 mb-12">
              Rejoignez notre plateforme et développez votre activité en touchant de nouveaux clients.
            </p>

            {renderStepIndicator()}

            <div className="">
              {renderStepContent()}
            </div>
          </div>
        </div>
      </section>

      <section className="hidden lg:block flex-1 h-full relative">
        <div className="animate-slide-right animate-delay-300 absolute inset-0 rounded-3xl m-4 overflow-hidden">
          <HeroInfiniteScroll wGradient={false} />
        </div>
      </section>
    </div>
  )
}
