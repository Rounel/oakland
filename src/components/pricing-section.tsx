"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState("monthly")

  // Définition des prix selon la période
  const getPrice = (plan: string) => {
    if (plan === "STANDARD") {
      return billingPeriod === "monthly" ? "3 000 FCFA" : "30 000 FCFA"
    }
    if (plan === "PRO") {
      return billingPeriod === "monthly" ? "7 500 FCFA" : "75 000 FCFA"
    }
    if (plan === "ENTREPRISE") {
      return billingPeriod === "monthly" ? "25 000 FCFA" : "250 000 FCFA"
    }
    return ""
  }

  const getPeriod = (plan: string) => {
    if (billingPeriod === "monthly") {
      return "/mois"
    } else {
      if (plan === "STANDARD") return "/an (2 mois offerts)"
      if (plan === "PRO") return "/an (2,5 mois offerts)"
      if (plan === "ENTREPRISE") return "/an (2 mois offerts)"
      return "/an"
    }
  }

  const plans = [
    {
      name: "STANDARD",
      price: getPrice("STANDARD"),
      period: getPeriod("STANDARD"),
      description: "Profil visible, jusqu’à 10 contacts/mois, support email.",
      features: [
        "Profil visible",
        "Jusqu’à 10 contacts/mois",
        "Position dans les résultats standard",
        "Support par email",
      ],
      buttonText: "Choisir STANDARD",
      buttonVariant: "default" as const,
      popular: false,
    },
    {
      name: "PRO",
      price: getPrice("PRO"),
      period: getPeriod("PRO"),
      description: "Visibilité renforcée, badge PRO, avis client, statistiques, réponses auto, suivi perf.",
      features: [
        "Tout dans STANDARD",
        "Visibilité renforcée (profil prioritaire dans la zone)",
        "Badge PRO vérifié",
        "Avis client activé",
        "Statistiques de consultation",
        "Réponses automatiques configurables",
        "Suivi des performances mensuelles",
      ],
      buttonText: "Choisir PRO",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "ENTREPRISE",
      price: getPrice("ENTREPRISE"),
      period: getPeriod("ENTREPRISE"),
      description: "Gestion multi-profils, badge ENTREPRISE, support prioritaire, dashboard entreprise.",
      features: [
        "Tout dans PRO",
        "Gestion multi-profils : 4 prestataires inclus (chacun avec un compte PRO)",
        "Possibilité d’ajouter d'autres prestataires (option payante)",
        "Badge ENTREPRISE",
        "Support prioritaire",
        "Affichage préférentiel dans les résultats de recherche",
        "Accès à un dashboard entreprise avec :",
        "• Vue sur les activités des prestataires liés à l'entreprise",
        "• Suivi des demandes clients par zone géographique",
        "• Statistiques consolidées sur la performance globale",
      ],
      buttonText: "Choisir ENTREPRISE",
      buttonVariant: "default" as const,
      popular: false,
    },
  ]

  return (
      <main id="pricing" className="container bg-amber-300 rounded-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
            We've got a plan
            <br />
            that's perfect for you
          </h1>

          {/* Billing Toggle */}
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === "monthly" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === "annual" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annual billing
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "ring-2 ring-purple-500 bg-gray-900 text-white" : "bg-white"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500 text-white px-3 py-1 text-sm font-medium">Popular</Badge>
                </div>
              )}

              <CardHeader className="pb-8">
                <h3 className={`text-xl font-semibold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className={`text-5xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-2 ${plan.popular ? "text-gray-300" : "text-gray-600"}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mt-4 text-sm ${plan.popular ? "text-gray-300" : "text-gray-600"}`}>{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-purple-500 hover:bg-purple-600 text-white"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                  {/* <Button
                    variant="ghost"
                    className={`w-full ${
                      plan.popular ? "text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Chat to sales
                  </Button> */}
                </div>

                <div>
                  <h4 className={`text-sm font-semibold mb-4 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    FEATURES
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            plan.popular ? "text-purple-400" : "text-purple-500"
                          }`}
                        />
                        <span className={`text-sm ${plan.popular ? "text-gray-300" : "text-gray-600"}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
  )
}
