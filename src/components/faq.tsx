import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  return (
    <div className="mx-auto max-w-4xl">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="q1">
          <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
            {"Comment créer un compte utilisateur ?"}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base text-muted-foreground">
            {"Cliquez sur « Créer un compte » en haut à droite et suivez les étapes."}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
            {"Combien coûte l'utilisation de la plateforme ?"}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base text-muted-foreground">
            {"L'accès est gratuit pour les utilisateurs. Des abonnements sont disponibles pour les pros."}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
            {"Comment contacter un professionnel ?"}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base text-muted-foreground">
            {"Utilisez le bouton « Contacter » sur le profil du professionnel pour envoyer un message."}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
            {"Est-ce que les prestataires sont vérifiés ?"}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base text-muted-foreground">
            {"Oui, nous validons les profils et vérifions les avis pour garantir la qualité."}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q5">
          <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
            {"Puis-je modifier ou annuler une demande ?"}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base text-muted-foreground">
            {"Oui, depuis votre tableau de bord, vous pouvez gérer vos demandes en cours."}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground text-center">
        {"Vous ne trouvez pas votre réponse ? "}
        <a href="#footer" className="font-medium underline underline-offset-4 hover:text-primary">
          {"Contactez notre support"}
        </a>
        {"."}
      </p>
    </div>
  )
}
