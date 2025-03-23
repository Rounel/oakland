"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="container px-4 py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          {t("hero.title")}
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">{t("hero.subtitle")}</p>

        {/* Search Bar */}
        <div className="relative mt-6 w-full max-w-2xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="text" placeholder={t("hero.search.placeholder")} className="w-full pl-10 pr-4" />
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/explore">{t("hero.cta.find")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/post-project">{t("hero.cta.post")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

