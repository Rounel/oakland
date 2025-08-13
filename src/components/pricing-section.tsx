"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "./language-provider"

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState("monthly")
  const { t } = useLanguage()

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
      return t("period.month")
    } else {
      if (plan === "STANDARD") return t("period.year.standard")
      if (plan === "PRO") return t("period.year.pro")
      if (plan === "ENTREPRISE") return t("period.year.enterprise")
      return t("period.year")
    }
  }

  const getPlanFeatures = (plan: string) => {
    if (plan === "STANDARD") {
      return [
        t("plan.standard.feature1"),
        t("plan.standard.feature2"),
        t("plan.standard.feature3"),
        t("plan.standard.feature4"),
      ]
    }
    if (plan === "PRO") {
      return [
        t("plan.pro.feature1"),
        t("plan.pro.feature2"),
        t("plan.pro.feature3"),
        t("plan.pro.feature4"),
        t("plan.pro.feature5"),
        t("plan.pro.feature6"),
        t("plan.pro.feature7"),
      ]
    }
    if (plan === "ENTREPRISE") {
      return [
        t("plan.enterprise.feature1"),
        t("plan.enterprise.feature2"),
        t("plan.enterprise.feature3"),
        t("plan.enterprise.feature4"),
        t("plan.enterprise.feature5"),
        t("plan.enterprise.feature6"),
        t("plan.enterprise.feature7"),
        t("plan.enterprise.feature8"),
        t("plan.enterprise.feature9"),
        t("plan.enterprise.feature10"),
      ]
    }
    return []
  }

  const plans = [
    {
      name: t("plan.standard"),
      price: getPrice("STANDARD"),
      period: getPeriod("STANDARD"),
      description: t("plan.standard.description"),
      features: getPlanFeatures("STANDARD"),
      buttonText: `${t("pricing.choose")} ${t("plan.standard")}`,
      buttonVariant: "default" as const,
      popular: false,
    },
    {
      name: t("plan.pro"),
      price: getPrice("PRO"),
      period: getPeriod("PRO"),
      description: t("plan.pro.description"),
      features: getPlanFeatures("PRO"),
      buttonText: `${t("pricing.choose")} ${t("plan.pro")}`,
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: t("plan.enterprise"),
      price: getPrice("ENTREPRISE"),
      period: getPeriod("ENTREPRISE"),
      description: t("plan.enterprise.description"),
      features: getPlanFeatures("ENTREPRISE"),
      buttonText: `${t("pricing.choose")} ${t("plan.enterprise")}`,
      buttonVariant: "default" as const,
      popular: false,
    },
  ]

  return (
      <main id="pricing" className="container rounded-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            {t("pricing.title")}
          </h1>

          {/* Billing Toggle */}
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === "monthly" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("pricing.monthly")}
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === "annual" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("pricing.annual")}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mx-auto max-w-7xl">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "ring-2 ring-flax bg-background2 text-white" : "bg-white"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-mist text-storm px-3 py-1 text-sm font-medium">{t("pricing.popular")}</Badge>
                </div>
              )}

              <CardHeader className="pb-6 sm:pb-8">
                <h3 className={`text-lg sm:text-xl font-semibold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className="mt-3 sm:mt-4">
                  <span className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-xs sm:text-sm ml-2 ${plan.popular ? "text-gray-300" : "text-gray-600"}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mt-3 sm:mt-4 text-xs sm:text-sm ${plan.popular ? "text-gray-300" : "text-gray-600"}`}>
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-mist hover:bg-mist/90 text-storm"
                        : "bg-storm hover:bg-storm/90 text-white"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </div>

                <div>
                  <h4 className={`text-xs sm:text-sm font-semibold mb-3 sm:mb-4 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    {t("pricing.features")}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                        <Check
                          className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${
                            plan.popular ? "text-flax" : "text-storm"
                          }`}
                        />
                        <span className={`text-xs sm:text-sm ${plan.popular ? "text-gray-300" : "text-gray-600"}`}>
                          {feature}
                        </span>
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
