"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BASE_API_URL } from "@/services/services"

export default function ValidateProviderPage({
  params,
}: {
  params: { uid: string; token: string }
}) {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const validateProvider = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/auth/validate_provider/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: params.uid,
            token: params.token,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage("Votre compte a été validé avec succès ! Vous pouvez maintenant vous connecter.")
        } else {
          setStatus("error")
          setMessage(data.detail || "Une erreur est survenue lors de la validation de votre compte.")
        }
      } catch (error) {
        setStatus("error")
        setMessage("Une erreur est survenue lors de la validation de votre compte.")
      }
    }

    validateProvider()
  }, [params.uid, params.token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Validation du compte
          </h2>
          <div className="mt-4">
            {status === "loading" && (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-gray-600">Validation en cours...</p>
              </div>
            )}
            {status === "success" && (
              <div className="text-green-600">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="mt-4">{message}</p>
              </div>
            )}
            {status === "error" && (
              <div className="text-red-600">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <p className="mt-4">{message}</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8">
          <Button
            className="w-full"
            onClick={() => router.push("/auth/login")}
          >
            {status === "success" ? "Se connecter" : "Retour à la connexion"}
          </Button>
        </div>
      </div>
    </div>
  )
} 