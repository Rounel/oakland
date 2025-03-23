"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-primary/5">
      <div className="container px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t("cta.signup")}</h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of freelancers and businesses already using our platform to connect, collaborate, and
            succeed.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/signup">{t("nav.signup")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/explore">{t("hero.cta.find")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

