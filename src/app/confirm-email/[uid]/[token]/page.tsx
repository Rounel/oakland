"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { use } from "react"
import { BASE_API_URL } from "@/services/services"

export default function ConfirmEmailWithTokenPage({ 
  params 
}: { 
  params: Promise<{ uid: string; token: string }> 
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { uid, token } = use(params)

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/auth/confirm_email/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: uid,
            token: token,
          }),
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la confirmation de l\'email')
        }

        setIsLoading(false)
      } catch (err) {
        setError('Une erreur est survenue lors de la confirmation de votre email')
        setIsLoading(false)
      }
    }

    confirmEmail()
  }, [uid, token])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Confirmation de votre email en cours...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Erreur</h1>
        <p className="mb-8">{error}</p>
        <Button onClick={() => router.push("/auth/login")}>Retour à la connexion</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Email confirmé avec succès !</h1>
      <p className="mb-8">
        Votre email a été confirmé avec succès. Vous pouvez maintenant vous connecter à votre compte.
      </p>
      <Button onClick={() => router.push("/auth/login")}>Se connecter</Button>
    </div>
  )
} 