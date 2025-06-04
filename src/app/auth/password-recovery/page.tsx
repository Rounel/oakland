"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { requestPasswordReset } from "@/services/services"

// Form schema
const formSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
})

type FormValues = z.infer<typeof formSchema>

export default function PasswordRecoveryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await requestPasswordReset(data.email)
      
      if (response.error) {
        setError(response.error.message || "Une erreur est survenue lors de la demande de réinitialisation")
        return
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error("Password recovery error:", err)
      setError("Une erreur inattendue est survenue. Veuillez réessayer plus tard.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Mot de passe oublié</CardTitle>
                <CardDescription className="text-center">
                  Saisissez votre adresse email pour recevoir un lien de réinitialisation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-6"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full dark:bg-green-900">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Email envoyé !</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation dans
                      quelques minutes.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      N'oubliez pas de vérifier vos spams si vous ne trouvez pas l'email.
                    </p>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse email</FormLabel>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                              </div>
                              <FormControl>
                                <Input placeholder="votre.email@exemple.com" className="pl-10" {...field} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" disabled={isSubmitting || !form.formState.isValid}>
                        {isSubmitting ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <Button variant="link" asChild>
                  <Link href="/admin" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la connexion
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
