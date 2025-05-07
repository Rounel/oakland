"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Form schema
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Veuillez sélectionner un objet" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter que vos données soient utilisées" }),
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      acceptTerms: false,
    },
    mode: "onChange",
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    form.reset()
  }

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-600/10 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Une question ? Une suggestion ? Nous sommes là pour vous aider.
          </motion.p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardContent className="p-6">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                        <MessageSquare className="h-5 w-5" />
                        <AlertTitle className="text-lg font-semibold mb-2">Message envoyé avec succès !</AlertTitle>
                        <AlertDescription>
                          Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                        </AlertDescription>
                      </Alert>
                      <div className="mt-6 text-center">
                        <Button onClick={() => setIsSubmitted(false)}>Envoyer un autre message</Button>
                      </div>
                    </motion.div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom complet *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Votre nom complet" {...field} />
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
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="votre.email@exemple.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Objet du message *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez un objet" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="information">Demande d'information</SelectItem>
                                    <SelectItem value="technical">Problème technique</SelectItem>
                                    <SelectItem value="suggestion">Suggestion</SelectItem>
                                    <SelectItem value="other">Autre</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Écrivez votre message ici..." className="min-h-32" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="acceptTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  J'accepte que mes données soient utilisées pour répondre à ma demande.
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Protection anti-robot (reCAPTCHA)
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            Ce site est protégé par reCAPTCHA et les{" "}
                            <a href="#" className="text-primary hover:underline">
                              règles de confidentialité
                            </a>{" "}
                            et les{" "}
                            <a href="#" className="text-primary hover:underline">
                              conditions d'utilisation
                            </a>{" "}
                            de Google s'appliquent.
                          </p>
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Informations de contact</h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
                        <a href="mailto:contact@okland.fr" className="text-primary hover:underline">
                          contact@okland.fr
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Téléphone</h3>
                        <a href="tel:+33123456789" className="text-primary hover:underline">
                          +33 1 23 45 67 89
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Adresse</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          123 Rue de Paris
                          <br />
                          75001 Paris, France
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Horaires</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Du lundi au vendredi
                          <br />
                          9h00 - 18h00
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-4">Suivez-nous</h3>
                      <div className="flex space-x-4">
                        <a
                          href="#"
                          className="bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 p-2 rounded-full transition-colors"
                        >
                          <Facebook className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <span className="sr-only">Facebook</span>
                        </a>
                        <a
                          href="#"
                          className="bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 p-2 rounded-full transition-colors"
                        >
                          <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <span className="sr-only">Instagram</span>
                        </a>
                        <a
                          href="#"
                          className="bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 p-2 rounded-full transition-colors"
                        >
                          <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Notre localisation</h2>
            <div className="aspect-[16/9] bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400 text-center px-4">
                  Carte interactive indisponible en mode démo.
                  <br />
                  Une carte Google Maps serait affichée ici.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
