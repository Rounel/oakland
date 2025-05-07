"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Send, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
})

type FormValues = z.infer<typeof formSchema>

interface ContactFormProps {
  providerId: string
  providerName: string
  providerSlug: string
}

export default function ContactForm({ providerId, providerName, providerSlug }: ContactFormProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      phone: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Enregistrer la demande de contact dans Supabase
      const { error: supabaseError } = await supabase.from("contact_requests").insert({
        client_name: data.name,
        client_email: data.email,
        client_phone: data.phone || null,
        provider_id: providerId,
        provider_name: providerName,
        provider_slug: providerSlug,
        message: data.message,
        status: "pending",
      })

      if (supabaseError) {
        throw supabaseError
      }

      setIsSubmitted(true)
      form.reset()
    } catch (err) {
      console.error("Erreur lors de l'envoi de la demande de contact:", err)
      setError("Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contacter {providerName}</h3>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSubmitted ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
          <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
            <AlertTitle className="text-lg font-semibold mb-2">Demande envoyée avec succès !</AlertTitle>
            <AlertDescription>
              <p className="mb-4">
                Votre demande de contact a été envoyée. Le prestataire sera notifié et pourra accepter ou refuser votre
                demande.
              </p>
              <p>Vous serez informé par email dès que le prestataire aura répondu à votre demande.</p>
            </AlertDescription>
          </Alert>
          <Button className="mt-6" onClick={() => setIsSubmitted(false)}>
            Envoyer une autre demande
          </Button>
        </motion.div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre.email@exemple.com" {...field} />
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
                  <FormLabel>Téléphone (facultatif)</FormLabel>
                  <FormControl>
                    <Input placeholder="01 23 45 67 89" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez votre besoin en détail pour que le prestataire puisse évaluer votre demande..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande de contact"}
              </Button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              En envoyant cette demande, vous acceptez que vos coordonnées soient transmises au prestataire s'il accepte
              votre demande de contact.
            </p>
          </form>
        </Form>
      )}
    </div>
  )
}
