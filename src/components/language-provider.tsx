"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "en"

type Translations = {
  [key: string]: {
    en: string
    fr: string
  }
}

// Sample translations - in a real app, this would be more extensive
const translations: Translations = {
  "nav.home": {
    en: "Home",
    fr: "Accueil",
  },
  "nav.explore": {
    en: "Explore Freelancers",
    fr: "Explorer les Freelances",
  },
  "nav.post": {
    en: "Post a Project",
    fr: "Publier un Projet",
  },
  "nav.categories": {
    en: "Categories",
    fr: "Catégories",
  },
  "nav.about": {
    en: "About",
    fr: "À propos",
  },
  "nav.login": {
    en: "Login",
    fr: "Connexion",
  },
  "nav.signup": {
    en: "Sign Up",
    fr: "Inscription",
  },
  "category.tech": {
    en: "Tech & Development",
    fr: "Tech & Développement",
  },
  "category.design": {
    en: "Design & Graphics",
    fr: "Design & Graphisme",
  },
  "category.marketing": {
    en: "Marketing & Communication",
    fr: "Marketing & Communication",
  },
  "category.writing": {
    en: "Writing & Translation",
    fr: "Rédaction & Traduction",
  },
  "category.audio": {
    en: "Audio & Video",
    fr: "Audio & Vidéo",
  },
  "hero.title": {
    en: "Find the perfect freelancer for your project",
    fr: "Trouvez le freelance parfait pour votre projet",
  },
  "hero.subtitle": {
    en: "Connect with thousands of skilled professionals ready to help you succeed",
    fr: "Connectez-vous avec des milliers de professionnels qualifiés prêts à vous aider à réussir",
  },
  "hero.cta.find": {
    en: "Find a Freelancer",
    fr: "Trouver un Freelance",
  },
  "hero.cta.post": {
    en: "Post a Project",
    fr: "Publier un Projet",
  },
  "hero.search.placeholder": {
    en: "Search by skill or domain...",
    fr: "Rechercher par compétence ou domaine...",
  },
  "cta.signup": {
    en: "Sign up now to access thousands of talents",
    fr: "Inscrivez-vous dès maintenant pour accéder à des milliers de talents",
  },
  "footer.rights": {
    en: "All rights reserved",
    fr: "Tous droits réservés",
  },
  "footer.newsletter": {
    en: "Subscribe to our newsletter",
    fr: "Abonnez-vous à notre newsletter",
  },
  "footer.newsletter.placeholder": {
    en: "Your email address",
    fr: "Votre adresse email",
  },
  "footer.newsletter.button": {
    en: "Subscribe",
    fr: "S'abonner",
  },
  "why.title": {
    en: "Why Choose Us",
    fr: "Pourquoi Nous Choisir",
  },
  "testimonials.title": {
    en: "What Our Users Say",
    fr: "Ce Que Disent Nos Utilisateurs",
  },
  "blog.title": {
    en: "Latest from Our Blog",
    fr: "Derniers Articles de Notre Blog",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    console.warn(`Translation missing for key: ${key}`)
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

