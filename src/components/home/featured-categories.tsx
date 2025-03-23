"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, PenTool, BarChart3, FileText, Video } from "lucide-react"
import Link from "next/link"

export function FeaturedCategories() {
  const { t } = useLanguage()

  const categories = [
    {
      key: "category.tech",
      icon: Code,
      href: "/categories/tech",
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-500 dark:text-blue-300",
    },
    {
      key: "category.design",
      icon: PenTool,
      href: "/categories/design",
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-500 dark:text-purple-300",
    },
    {
      key: "category.marketing",
      icon: BarChart3,
      href: "/categories/marketing",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-500 dark:text-green-300",
    },
    {
      key: "category.writing",
      icon: FileText,
      href: "/categories/writing",
      color: "bg-amber-100 dark:bg-amber-900",
      iconColor: "text-amber-500 dark:text-amber-300",
    },
    {
      key: "category.audio",
      icon: Video,
      href: "/categories/audio",
      color: "bg-red-100 dark:bg-red-900",
      iconColor: "text-red-500 dark:text-red-300",
    },
  ]

  return (
    <section className="container px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Top Categories</h2>
          <p className="mt-2 text-muted-foreground">Explore our most popular freelancing categories</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.key} href={category.href}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}>
                      <Icon className={`h-6 w-6 ${category.iconColor}`} />
                    </div>
                    <CardTitle className="text-lg">{t(category.key)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Find top professionals in {t(category.key).toLowerCase()}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

