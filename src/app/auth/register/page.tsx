// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { ChevronRight, ChevronLeft, Upload, Check, Facebook, Instagram, Globe } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { categories } from "@/lib/data"

// // Form schema
// const formSchema = z.object({
//   // Step 1: Personal Information
//   firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
//   lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
//   email: z.string().email({ message: "Adresse email invalide" }),
//   phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),

//   // Step 2: Professional Information
//   companyName: z.string().min(2, { message: "Le nom commercial doit contenir au moins 2 caractères" }),
//   description: z.string().min(50, { message: "La description doit contenir au moins 50 caractères" }),
//   category: z.string().min(1, { message: "Veuillez sélectionner une catégorie" }),
//   address: z.string().min(5, { message: "L'adresse doit contenir au moins 5 caractères" }),
//   city: z.string().min(2, { message: "La ville doit contenir au moins 2 caractères" }),
//   postalCode: z.string().min(5, { message: "Code postal invalide" }),

//   // Step 3: Documents
//   idCard: z.any().optional(),
//   businessProof: z.any().optional(),
//   portfolioImages: z.any().optional(),

//   // Step 4: Social Media
//   website: z.string().url({ message: "URL invalide" }).optional().or(z.literal("")),
//   facebook: z.string().url({ message: "URL invalide" }).optional().or(z.literal("")),
//   instagram: z.string().url({ message: "URL invalide" }).optional().or(z.literal("")),

//   // Step 5: Terms
//   termsAccepted: z.literal(true, {
//     errorMap: () => ({ message: "Vous devez accepter les conditions générales" }),
//   }),
// })

// type FormValues = z.infer<typeof formSchema>

// export default function ProviderRegistrationPage() {
//   const [step, setStep] = useState(1)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       companyName: "",
//       description: "",
//       category: "",
//       address: "",
//       city: "",
//       postalCode: "",
//       website: "",
//       facebook: "",
//       instagram: "",
//       termsAccepted: false,
//     },
//     mode: "onChange",
//   })

//   const nextStep = async () => {
//     let fieldsToValidate: string[] = []

//     switch (step) {
//       case 1:
//         fieldsToValidate = ["firstName", "lastName", "email", "phone"]
//         break
//       case 2:
//         fieldsToValidate = ["companyName", "description", "category", "address", "city", "postalCode"]
//         break
//       case 3:
//         // No validation for file uploads
//         setStep(step + 1)
//         return
//       case 4:
//         // No validation for social media
//         setStep(step + 1)
//         return
//       default:
//         break
//     }

//     const result = await form.trigger(fieldsToValidate as any)
//     if (result) {
//       setStep(step + 1)
//     }
//   }

//   const prevStep = () => {
//     setStep(step - 1)
//   }

//   const onSubmit = async (data: FormValues) => {
//     setIsSubmitting(true)

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     console.log("Form submitted:", data)
//     setIsSubmitting(false)
//     setIsSubmitted(true)
//   }

//   const renderStepIndicator = () => {
//     return (
//       <div className="flex justify-center mb-8">
//         <div className="flex items-center">
//           {[1, 2, 3, 4, 5].map((i) => (
//             <div key={i} className="flex items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                   i === step
//                     ? "bg-primary text-white"
//                     : i < step
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
//                 }`}
//               >
//                 {i < step ? <Check size={16} /> : i}
//               </div>
//               {i < 5 && (
//                 <div className={`w-12 h-1 ${i < step ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`}></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   const renderStepContent = () => {
//     if (isSubmitted) {
//       return (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center py-12"
//         >
//           <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full dark:bg-green-900">
//             <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
//           </div>
//           <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Demande envoyée avec succès !</h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-6">
//             Votre demande d'inscription a été envoyée et sera examinée dans les 48h. Vous recevrez un email de
//             confirmation dès que votre profil sera validé.
//           </p>
//           <Button asChild>
//             <a href="/">Retour à l'accueil</a>
//           </Button>
//         </motion.div>
//       )
//     }

//     return (
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {step === 1 && (
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Informations personnelles</h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <FormField
//                   control={form.control}
//                   name="firstName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Prénom</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Votre prénom" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="lastName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Nom</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Votre nom" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input type="email" placeholder="votre.email@exemple.com" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="phone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Téléphone</FormLabel>
//                     <FormControl>
//                       <Input placeholder="01 23 45 67 89" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </motion.div>
//           )}

//           {step === 2 && (
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Informations professionnelles</h2>

//               <FormField
//                 control={form.control}
//                 name="companyName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Nom commercial</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Nom de votre entreprise" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Description de votre activité</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder="Décrivez votre activité, vos services, votre expérience..."
//                         className="min-h-32"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormDescription>Minimum 50 caractères</FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="category"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Catégorie principale</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Sélectionnez une catégorie" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {categories.map((category) => (
//                           <SelectItem key={category.id} value={category.id}>
//                             {category.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="address"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Adresse</FormLabel>
//                     <FormControl>
//                       <Input placeholder="123 Rue de Paris" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <FormField
//                   control={form.control}
//                   name="city"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Ville</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Paris" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="postalCode"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Code postal</FormLabel>
//                       <FormControl>
//                         <Input placeholder="75001" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </motion.div>
//           )}

//           {step === 3 && (
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Pièces justificatives</h2>

//               <div className="space-y-6">
//                 <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
//                   <div className="mb-4">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Carte d'identité</h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//                     Téléchargez une copie de votre carte d'identité (recto-verso)
//                   </p>
//                   <Button variant="outline" type="button">
//                     Parcourir
//                   </Button>
//                   <input type="file" className="hidden" />
//                 </div>

//                 <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
//                   <div className="mb-4">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Justificatif d'activité</h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//                     Téléchargez un justificatif d'activité (extrait Kbis, attestation URSSAF, etc.)
//                   </p>
//                   <Button variant="outline" type="button">
//                     Parcourir
//                   </Button>
//                   <input type="file" className="hidden" />
//                 </div>

//                 <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
//                   <div className="mb-4">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Photos de vos réalisations</h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//                     Téléchargez jusqu'à 3 photos de vos réalisations
//                   </p>
//                   <Button variant="outline" type="button">
//                     Parcourir
//                   </Button>
//                   <input type="file" multiple className="hidden" />
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {step === 4 && (
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Liens et réseaux sociaux</h2>
//               <p className="text-gray-600 dark:text-gray-400 mb-6">
//                 Ces informations sont facultatives mais permettent d'améliorer votre visibilité.
//               </p>

//               <FormField
//                 control={form.control}
//                 name="website"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Site web</FormLabel>
//                     <div className="flex">
//                       <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
//                         <Globe size={18} className="text-gray-500" />
//                       </div>
//                       <FormControl>
//                         <Input placeholder="https://www.votresite.com" className="rounded-l-none" {...field} />
//                       </FormControl>
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="facebook"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Facebook</FormLabel>
//                     <div className="flex">
//                       <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
//                         <Facebook size={18} className="text-gray-500" />
//                       </div>
//                       <FormControl>
//                         <Input placeholder="https://www.facebook.com/votrepage" className="rounded-l-none" {...field} />
//                       </FormControl>
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="instagram"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Instagram</FormLabel>
//                     <div className="flex">
//                       <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
//                         <Instagram size={18} className="text-gray-500" />
//                       </div>
//                       <FormControl>
//                         <Input
//                           placeholder="https://www.instagram.com/votrecompte"
//                           className="rounded-l-none"
//                           {...field}
//                         />
//                       </FormControl>
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </motion.div>
//           )}

//           {step === 5 && (
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Validation</h2>

//               <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
//                 <p className="text-yellow-800 dark:text-yellow-200">
//                   Votre demande d'inscription sera examinée par notre équipe dans un délai de 48h. Vous recevrez un
//                   email de confirmation dès que votre profil sera validé.
//                 </p>
//               </div>

//               <FormField
//                 control={form.control}
//                 name="termsAccepted"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                     <FormControl>
//                       <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                     </FormControl>
//                     <div className="space-y-1 leading-none">
//                       <FormLabel>
//                         J'accepte les{" "}
//                         <a href="/conditions-utilisation" className="text-primary hover:underline">
//                           conditions générales d'utilisation
//                         </a>{" "}
//                         et la{" "}
//                         <a href="/politique-confidentialite" className="text-primary hover:underline">
//                           politique de confidentialité
//                         </a>
//                       </FormLabel>
//                       <FormMessage />
//                     </div>
//                   </FormItem>
//                 )}
//               />

//               <Button type="submit" className="w-full" disabled={isSubmitting || !form.formState.isValid}>
//                 {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
//               </Button>
//             </motion.div>
//           )}

//           <div className="flex justify-between pt-6">
//             {step > 1 && (
//               <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
//                 <ChevronLeft className="mr-2 h-4 w-4" />
//                 Précédent
//               </Button>
//             )}

//             {step < 5 && (
//               <Button type="button" onClick={nextStep} className="ml-auto">
//                 Suivant
//                 <ChevronRight className="ml-2 h-4 w-4" />
//               </Button>
//             )}
//           </div>
//         </form>
//       </Form>
//     )
//   }

//   return (
//     <div className="pt-16">
//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Inscription Prestataire</h1>
//           <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
//             Rejoignez notre plateforme et développez votre activité en touchant de nouveaux clients.
//           </p>

//           {renderStepIndicator()}

//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
//             {renderStepContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import { Suspense } from "react"
import ProviderRegistrationForm from "@/components/provider-registration-form"
import { getCategories } from "@/services/supabase-service"

export default async function ProviderRegistrationPage() {
  const categories = await getCategories()

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ProviderRegistrationForm categories={categories} />
    </Suspense>
  )
}
