"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Github, Loader2 } from "lucide-react"
import { login } from "@/services/services"
import { useAuth } from "@/contexts/authContext"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const {setUser, user} = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await login( email, password )
      console.log("RESPONSE", response)
      
      if (response.error) {
        setError(response.error.message || "Une erreur est survenue lors de la connexion")
        return
      }

      // Redirection basée sur le type d'utilisateur
      if (response.user) {
        console.log("USER", response.user)
        setUser(response.user)
        router.push(`/provider/me`)
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Une erreur inattendue est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      router.push('/provider/me')
    }
  }, [user, router])

  return (
    <div className="w-full flex justify-center items-center bg-amber-70">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full flex items-center justify-center z-40">
        <Card className=" shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center flex flex-col gap-5">
              <Link href={"/"} className="text-5xl font-bold bg-linear-to-b/hsl from-purple-600 to-purple-900 rounded-2xl py-8 text-white">
                Okland
              </Link>
              <Separator />
              Connexion
            </CardTitle>
            <CardDescription className="text-center">
              Entrez votre email et mot de passe pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                {error && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                    {error}
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link
                      href="/auth/password-recovery"
                      className="text-sm text-primary underline-offset-4 hover:underline"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Se souvenir de moi pendant 30 jours
                  </Label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connexion en cours...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm text-muted-foreground mt-2">
              Vous n'avez pas de compte ?{" "}
              <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline">
                S'inscrire
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
      <Image
        src={"/loginbg.jpg"}
        alt="illus"
        fill
        className="object-cover"
      />
    </div>
  )
}
