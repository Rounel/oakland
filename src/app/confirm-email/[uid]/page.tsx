"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { use } from "react"

export default function RequestEmailConfirmationPage({ 
  params 
}: { 
  params: Promise<{ uid: string }> 
}) {
  const router = useRouter()


return (
    <div className="container mx-auto px-4 py-20 text-center">
    <h1 className="text-2xl font-bold mb-4">Email de confirmation envoyé !</h1>
    <p className="mb-8">
        Un email de confirmation a été envoyé à votre adresse email.
        Veuillez vérifier votre boîte de réception et cliquer sur le lien de confirmation.
    </p>
    <Button onClick={() => router.push("/auth/login")}>Retour à la connexion</Button>
    </div>
)

  return null
} 