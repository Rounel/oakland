"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { BadgeDollarSign, BarChart3, Clock3, Images, MapPin, Megaphone, MessageCircle, Rocket, ShieldCheck, Star, Trophy, Wrench } from "lucide-react"
import { useLanguage } from "./language-provider"

type CardAdvantageProps = {
    icon?: React.ReactNode
    title?: string
    text?: string
}
  
function CardAdvantage({
    icon = <div className="h-6 w-6 rounded bg-muted" />,
    title = "Titre",
    text = "Texte descriptif de l'avantage.",
}: CardAdvantageProps) {
    return (
        <div className="h-full">
          <div className="flex mb-3 h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-mist">{icon}</div>
          <div className="flex flex-row items-center gap-3 space-y-0">
              <p className="text-sm sm:text-base font-medium">{title}</p>
          </div>
          <div className="pt-0">
              <p className="text-xs sm:text-sm text-zinc-400">{text}</p>
          </div>
        </div>
    )
}

export default function WhyUseItSection() {
  const { t } = useLanguage()

  return (
    <div className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-background2 flex justify-center flex-col items-center gap-8 sm:gap-10 lg:gap-16 xl:gap-20 px-4 sm:px-6 lg:px-8">
      {/* title */}
      <div className="space-y-3 text-center text-mist max-w-4xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
          {t("why.use.title")}
        </h2>
        <p className="text-flax text-base sm:text-lg lg:text-xl">
          {t("why.use.subtitle")}
        </p>
      </div>

      {/* as user */}
      <div className=" max-w-[90rem]">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:gap-12 xl:gap-16 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-7 space-y-6 text-white flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-mist">
                {t("why.use.as.user.title")}
              </h2>
              <p className="text-flax text-base sm:text-lg lg:text-xl">
                {t("why.use.as.user.subtitle")}
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
              <CardAdvantage
                  icon={<Clock3 className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title={t("why.use.user.speed.title")}
                  text={t("why.use.user.speed.text")}
              />
              <CardAdvantage
                  icon={<MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title={t("why.use.user.geolocation.title")}
                  text={t("why.use.user.geolocation.text")}
              />
              <CardAdvantage
                  icon={<Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title={t("why.use.user.choice.title")}
                  text={t("why.use.user.choice.text")}
              />
              <CardAdvantage
                  icon={<Star className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title={t("why.use.user.reviews.title")}
                  text={t("why.use.user.reviews.text")}
              />
              <CardAdvantage
                  icon={<MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title={t("why.use.user.contact.title")}
                  text={t("why.use.user.contact.text")}
              />
              <CardAdvantage
                  icon={<BadgeDollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title={t("why.use.user.quotes.title")}
                  text={t("why.use.user.quotes.text")}
              />
            </div>

            {/* CTA banner */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3">
                <Button size="lg" className="w-full sm:w-auto bg-mist text-background2 hover:bg-mist/50">
                {t("why.use.user.cta")}
                </Button>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 row-start-1 lg:row-start-auto md:col-start-1">
            <div className="relative aspect-[4/3] md:aspect-auto md:w-full md:h-[300px] w-full overflow-hidden rounded-xl border bg-muted">
              <Image
                src="/1.jpg"
                alt="Illustration des métiers ou carte géographique des professionnels"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* as pro */}
      <div className=" max-w-[90rem]">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:gap-12 xl:gap-16 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] md:aspect-auto md:w-full md:h-[300px] w-full overflow-hidden rounded-xl border bg-muted">
              <Image
                src="/2.jpg"
                alt="Illustration des métiers ou carte géographique des professionnels"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7 space-y-6 text-white flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-mist">
                {t("why.use.as.pro.title")}
              </h2>
              <p className="text-flax text-base sm:text-lg lg:text-xl">
                {t("why.use.as.pro.subtitle")}
              </p>
            </div>

            
            <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
                <CardAdvantage
                icon={<Megaphone className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title={t("why.use.pro.visibility.title")}
                text={t("why.use.pro.visibility.text")}
                />
                <CardAdvantage
                icon={<Images className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title={t("why.use.pro.profile.title")}
                text={t("why.use.pro.profile.text")}
                />
                <CardAdvantage
                icon={<Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title={t("why.use.pro.reputation.title")}
                text={t("why.use.pro.reputation.text")}
                />
                <CardAdvantage
                icon={<BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title={t("why.use.pro.tools.title")}
                text={t("why.use.pro.tools.text")}
                />
                <CardAdvantage
                icon={<Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title={t("why.use.pro.opportunities.title")}
                text={t("why.use.pro.opportunities.text")}
                />
                <CardAdvantage
                icon={<ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title={t("why.use.pro.security.title")}
                text={t("why.use.pro.security.text")}
                />
            </div>

            {/* CTA banner for pros (optional micro-copy) */}
            <div className="mt-8 sm:mt-10 gap-3 sm:gap-4 flex flex-col sm:flex-row items-center">
                <Button size="lg" className="w-full sm:w-auto bg-mist text-background2 hover:bg-mist/50">
                {t("why.use.pro.cta.primary")}
                </Button>
                <Button size="lg" variant="ghost" className="w-full sm:w-auto bg-white text-primary hover:bg-white/70">
                {t("why.use.pro.cta.secondary")}
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







