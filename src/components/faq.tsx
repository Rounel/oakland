import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "./language-provider"

export default function FaqSection() {
  const { t } = useLanguage()
  return (
    <div className="mx-auto max-w-4xl">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="q1">
          <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
            {t("faq.q1.question")}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base text-muted-foreground">
            {t("faq.q1.answer")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
            {t("faq.q2.question")}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base text-muted-foreground">
            {t("faq.q2.answer")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
            {t("faq.q3.question")}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base text-muted-foreground">
            {t("faq.q3.answer")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
            {t("faq.q4.question")}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base text-muted-foreground">
            {t("faq.q4.answer")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q5">
          <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
            {t("faq.q5.question")}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base text-muted-foreground">
            {t("faq.q5.answer")}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground text-center">
        {t("faq.contact.text")}
        <a href="#footer" className="font-medium underline underline-offset-4 hover:text-primary">
          {t("faq.contact.link")}
        </a>
        {t("faq.contact.suffix")}
      </p>
    </div>
  )
}
