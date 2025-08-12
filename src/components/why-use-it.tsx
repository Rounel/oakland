"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { BadgeDollarSign, BarChart3, Clock3, Images, MapPin, Megaphone, MessageCircle, Rocket, ShieldCheck, Star, Trophy, Wrench } from "lucide-react"

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

  return (
    <div className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-background2 flex justify-center flex-col items-center gap-8 sm:gap-10 lg:gap-16 xl:gap-20 px-4 sm:px-6 lg:px-8">
      {/* title */}
      <div className="space-y-3 text-center text-mist max-w-4xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
          {"Pourquoi utiliser notre plateforme ?"}
        </h2>
        <p className="text-flax text-base sm:text-lg lg:text-xl">
          {
            "Gagnez du temps, comparez en confiance, et trouvez le bon pro au bon prix."
          }
        </p>
      </div>

      {/* as user */}
      <div className=" max-w-[90rem]">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:gap-12 xl:gap-16 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-7 space-y-6 text-white flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-mist">
                {"En tant qu'utilisateur"}
              </h2>
              <p className="text-flax text-base sm:text-lg lg:text-xl">
                {
                  "Prêt à trouver le bon pro ?"
                }
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
              <CardAdvantage
                  icon={<Clock3 className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title="Rapidité"
                  text="Trouvez un professionnel en quelques clics."
              />
              <CardAdvantage
                  icon={<MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title="Géolocalisation"
                  text="Repérez les pros proches de chez vous."
              />
              <CardAdvantage
                  icon={<Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title="Large choix"
                  text="Accédez à des dizaines de métiers et services."
              />
              <CardAdvantage
                  icon={<Star className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title="Avis vérifiés"
                  text="Décidez en confiance grâce aux évaluations."
              />
              <CardAdvantage
                  icon={<MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title="Contact direct"
                  text="Échangez via la messagerie intégrée."
              />
              <CardAdvantage
                  icon={<BadgeDollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                  title="Devis express"
                  text="Recevez plusieurs propositions rapidement."
              />
            </div>

            {/* CTA banner */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3">
                <Button size="lg" className="w-full sm:w-auto bg-mist text-background2 hover:bg-mist/50">
                {"Lancer une recherche"}
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
                {"En tant que professionnel"}
              </h2>
              <p className="text-flax text-base sm:text-lg lg:text-xl">
                {
                  "Développez votre activité dès aujourd'hui."
                }
              </p>
            </div>

            
            <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
                <CardAdvantage
                icon={<Megaphone className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title="Visibilité accrue"
                text="Touchez des clients qualifiés près de vous."
                />
                <CardAdvantage
                icon={<Images className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title="Profil valorisé"
                text="Mettez en avant vos réalisations et expertises."
                />
                <CardAdvantage
                icon={<Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title="Réputation"
                text="Renforcez la confiance avec les avis clients."
                />
                <CardAdvantage
                icon={<BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title="Outils de gestion"
                text="Centralisez demandes, devis et rendez-vous."
                />
                <CardAdvantage
                icon={<Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title="Opportunités"
                text="Gagnez des contrats que vous auriez manqués."
                />
                <CardAdvantage
                icon={<ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />}
                title="Sécurité & conformité"
                text="Echanges et paiements sécurisés."
                />
            </div>

            {/* CTA banner for pros (optional micro-copy) */}
            <div className="mt-8 sm:mt-10 gap-3 sm:gap-4 flex flex-col sm:flex-row items-center">
                <Button size="lg" className="w-full sm:w-auto bg-mist text-background2 hover:bg-mist/50">
                {"Créer mon profil pro"}
                </Button>
                <Button size="lg" variant="ghost" className="w-full sm:w-auto bg-white text-primary hover:bg-white/70">
                {"Découvrir comment ça marche"}
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







