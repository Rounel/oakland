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
import { Facebook, Github, Loader2, Eye, EyeOff } from "lucide-react"
import { login } from "@/services/services"
import { useAuth } from "@/contexts/authContext"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import HeroInfiniteScroll from "@/components/hero-infinite-scroll"

export default function LoginPage() {
  const {setUser, user} = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="min-h-screen w-full flex flex-col lg:flex-row ">
      <section className="flex-1 flex items-center justify-center pt-8 pr-8 pb-8 pl-8 relative">
        <div className="w-full absolute top-5 left-5 ">
          <Link href={"/"} className="text-2xl font-bold text-black">
            MonPresta
          </Link>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full flex items-center justify-center z-40">
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="gap-6">
              <CardTitle className="flex flex-col gap-5 text-black tracking-tighter text-4xl md:text-5xl font-semibold leading-tight">
                {/* <Link href={"/"} className="text-5xl font-bold bg-linear-to-b/hsl from-purple-600 to-purple-900 rounded-2xl py-8 text-black">
                  MonPresta
                </Link>
                <Separator /> */}
                Welcome
              </CardTitle>
              <CardDescription className=" text-zinc-700 text-lg">
                Entrez votre email et mot de passe pour accéder à votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="my-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  {error && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                      {error}
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="  font-medium text-zinc-700 text-lg">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-lg font-medium text-zinc-700">Mot de passe</Label>
                      <Link
                        href="/auth/password-recovery"
                        className="text-sm  font-medium text-purple-400 underline-offset-4 hover:underline"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent h-10 text-black placeholder:text-zinc-700 border-gray-700"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-zinc-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="bg-white data-[state=checked]:bg-purple-400" />
                    <Label htmlFor="remember" className="text-sm  font-medium text-zinc-700">
                      Se souvenir de moi pendant 30 jours
                    </Label>
                  </div>
                  <Button type="submit" className="w-full bg-primary text-white text-lg" disabled={isLoading}>
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
                <Link href="/auth/register" className=" text-purple-400 underline-offset-4 hover:underline">
                  S'inscrire
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </section>

      <section className="hidden lg:block flex-1 h-full relative">
        <div className="animate-slide-right animate-delay-300 absolute inset-0 rounded-3xl m-4 overflow-hidden">
          <HeroInfiniteScroll wGradient={false} />
        </div>
      </section>
    </div>
  )
}
