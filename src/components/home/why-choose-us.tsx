"use client"

import { useLanguage } from "@/components/language-provider"
import { Shield, Users, Zap, Award } from "lucide-react"

export function WhyChooseUs() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Users,
      title: "Talented Community",
      description: "Access thousands of pre-vetted professionals across various domains.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your transactions are protected with our secure payment system.",
    },
    {
      icon: Zap,
      title: "Fast Matching",
      description: "Our smart algorithm helps you find the perfect match quickly.",
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "We ensure high-quality work with our satisfaction guarantee.",
    },
  ]

  return (
    <section className="container px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t("why.title")}</h2>
          <p className="mt-2 text-muted-foreground">The benefits of using our freelancing platform</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

