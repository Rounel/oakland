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
    en: "Search",
    fr: "Chercher",
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
  "nav.pricing": {
    en: "Pricing",
    fr: "Tarifications",
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
  "footer.hiw": {
    en: "How it works",
    fr: "Comment ça fonctionne",
  },
  // Pricing section translations
  "pricing.title": {
    en: "We've got a plan that's perfect for you",
    fr: "Nous avons un plan parfait pour vous",
  },
  "pricing.monthly": {
    en: "Monthly billing",
    fr: "Facturation mensuelle",
  },
  "pricing.annual": {
    en: "Annual billing",
    fr: "Facturation annuelle",
  },
  "pricing.popular": {
    en: "Popular",
    fr: "Populaire",
  },
  "pricing.features": {
    en: "FEATURES",
    fr: "FONCTIONNALITÉS",
  },
  "pricing.choose": {
    en: "Choose",
    fr: "Choisir",
  },
  // Plan names
  "plan.standard": {
    en: "STANDARD",
    fr: "STANDARD",
  },
  "plan.pro": {
    en: "PRO",
    fr: "PRO",
  },
  "plan.enterprise": {
    en: "ENTERPRISE",
    fr: "ENTREPRISE",
  },
  // Plan descriptions
  "plan.standard.description": {
    en: "Visible profile, up to 10 contacts/month, email support.",
    fr: "Profil visible, jusqu'à 10 contacts/mois, support email.",
  },
  "plan.pro.description": {
    en: "Enhanced visibility, PRO badge, customer reviews, statistics, auto-replies, performance tracking.",
    fr: "Visibilité renforcée, badge PRO, avis client, statistiques, réponses auto, suivi perf.",
  },
  "plan.enterprise.description": {
    en: "Multi-profile management, ENTERPRISE badge, priority support, enterprise dashboard.",
    fr: "Gestion multi-profils, badge ENTREPRISE, support prioritaire, dashboard entreprise.",
  },
  // Plan features
  "plan.standard.feature1": {
    en: "Visible profile",
    fr: "Profil visible",
  },
  "plan.standard.feature2": {
    en: "Up to 10 contacts/month",
    fr: "Jusqu'à 10 contacts/mois",
  },
  "plan.standard.feature3": {
    en: "Standard position in results",
    fr: "Position dans les résultats standard",
  },
  "plan.standard.feature4": {
    en: "Email support",
    fr: "Support par email",
  },
  "plan.pro.feature1": {
    en: "Everything in STANDARD",
    fr: "Tout dans STANDARD",
  },
  "plan.pro.feature2": {
    en: "Enhanced visibility (priority profile in area)",
    fr: "Visibilité renforcée (profil prioritaire dans la zone)",
  },
  "plan.pro.feature3": {
    en: "Verified PRO badge",
    fr: "Badge PRO vérifié",
  },
  "plan.pro.feature4": {
    en: "Customer reviews enabled",
    fr: "Avis client activé",
  },
  "plan.pro.feature5": {
    en: "Consultation statistics",
    fr: "Statistiques de consultation",
  },
  "plan.pro.feature6": {
    en: "Configurable automatic replies",
    fr: "Réponses automatiques configurables",
  },
  "plan.pro.feature7": {
    en: "Monthly performance tracking",
    fr: "Suivi des performances mensuelles",
  },
  "plan.enterprise.feature1": {
    en: "Everything in PRO",
    fr: "Tout dans PRO",
  },
  "plan.enterprise.feature2": {
    en: "Multi-profile management: 4 providers included (each with a PRO account)",
    fr: "Gestion multi-profils : 4 prestataires inclus (chacun avec un compte PRO)",
  },
  "plan.enterprise.feature3": {
    en: "Possibility to add other providers (paid option)",
    fr: "Possibilité d'ajouter d'autres prestataires (option payante)",
  },
  "plan.enterprise.feature4": {
    en: "ENTERPRISE badge",
    fr: "Badge ENTREPRISE",
  },
  "plan.enterprise.feature5": {
    en: "Priority support",
    fr: "Support prioritaire",
  },
  "plan.enterprise.feature6": {
    en: "Preferred display in search results",
    fr: "Affichage préférentiel dans les résultats de recherche",
  },
  "plan.enterprise.feature7": {
    en: "Access to enterprise dashboard with:",
    fr: "Accès à un dashboard entreprise avec :",
  },
  "plan.enterprise.feature8": {
    en: "• View of activities of providers linked to the company",
    fr: "• Vue sur les activités des prestataires liés à l'entreprise",
  },
  "plan.enterprise.feature9": {
    en: "• Customer request tracking by geographic area",
    fr: "• Suivi des demandes clients par zone géographique",
  },
  "plan.enterprise.feature10": {
    en: "• Consolidated statistics on overall performance",
    fr: "• Statistiques consolidées sur la performance globale",
  },
  // Period indicators
  "period.month": {
    en: "/month",
    fr: "/mois",
  },
  "period.year.standard": {
    en: "/year (2 months free)",
    fr: "/an (2 mois offerts)",
  },
  "period.year.pro": {
    en: "/year (2.5 months free)",
    fr: "/an (2,5 mois offerts)",
  },
  "period.year.enterprise": {
    en: "/year (2 months free)",
    fr: "/an (2 mois offerts)",
  },
  "period.year": {
    en: "/year",
    fr: "/an",
  },
  // Home content translations
  "home.professionals.title": {
    en: "Professionals found around you",
    fr: "Professionnels trouvés autour de vous",
  },
  "home.professionals.explore": {
    en: "Explore all professionals",
    fr: "Explorer tous les professionnels",
  },
  "home.categories.all": {
    en: "All",
    fr: "Tous",
  },
  "home.categories.mason": {
    en: "Mason",
    fr: "Maçon",
  },
  "home.categories.mechanic": {
    en: "Mechanic",
    fr: "Mécanicien",
  },
  "home.categories.carpenter": {
    en: "Carpenter",
    fr: "Menuisier",
  },
  "home.categories.electrician": {
    en: "Electrician",
    fr: "Électricien",
  },
  "home.loading": {
    en: "Loading...",
    fr: "Chargement...",
  },
  "home.error.loading": {
    en: "Error loading providers",
    fr: "Erreur lors du chargement des prestataires",
  },
  "home.no.providers": {
    en: "No providers found",
    fr: "Aucun prestataire trouvé",
  },
  "home.faq.title": {
    en: "Frequently Asked Questions",
    fr: "Foire aux questions",
  },
  "home.faq.subtitle": {
    en: "Need help? Here are the answers to the most common questions.",
    fr: "Besoin d'aide ? Voici les réponses aux questions les plus courantes.",
  },
  "home.cta.title": {
    en: "Are you a service provider?",
    fr: "Vous êtes un prestataire de services ?",
  },
  "home.cta.subtitle": {
    en: "Join our platform and grow your business by reaching new clients.",
    fr: "Rejoignez notre plateforme et développez votre activité en touchant de nouveaux clients.",
  },
  "home.cta.button": {
    en: "I'm signing up",
    fr: "Je m'inscris",
  },
  // Footer translations
  "footer.quick.links": {
    en: "Quick links",
    fr: "Liens rapides",
  },
  "footer.legal": {
    en: "Legal",
    fr: "Légal",
  },
  "footer.terms": {
    en: "Terms of Service",
    fr: "Conditions d'utilisation",
  },
  "footer.privacy": {
    en: "Privacy Policy",
    fr: "Politique de confidentialité",
  },
  "footer.cookies": {
    en: "Cookie Policy",
    fr: "Politique des cookies",
  },
  "footer.newsletter.description": {
    en: "Stay updated with the latest freelancing trends and opportunities.",
    fr: "Restez informé des dernières tendances et opportunités du freelancing.",
  },
  "footer.brand.name": {
    en: "MonPresta",
    fr: "MonPresta",
  },
  "footer.faq": {
    en: "FAQ",
    fr: "FAQ",
  },
  // FAQ translations
  "faq.q1.question": {
    en: "How to create a user account?",
    fr: "Comment créer un compte utilisateur ?",
  },
  "faq.q1.answer": {
    en: "Click on 'Create Account' at the top right and follow the steps.",
    fr: "Cliquez sur « Créer un compte » en haut à droite et suivez les étapes.",
  },
  "faq.q2.question": {
    en: "How much does it cost to use the platform?",
    fr: "Combien coûte l'utilisation de la plateforme ?",
  },
  "faq.q2.answer": {
    en: "Access is free for users. Subscriptions are available for professionals.",
    fr: "L'accès est gratuit pour les utilisateurs. Des abonnements sont disponibles pour les pros.",
  },
  "faq.q3.question": {
    en: "How to contact a professional?",
    fr: "Comment contacter un professionnel ?",
  },
  "faq.q3.answer": {
    en: "Use the 'Contact' button on the professional's profile to send a message.",
    fr: "Utilisez le bouton « Contacter » sur le profil du professionnel pour envoyer un message.",
  },
  "faq.q4.question": {
    en: "Are the providers verified?",
    fr: "Est-ce que les prestataires sont vérifiés ?",
  },
  "faq.q4.answer": {
    en: "Yes, we validate profiles and verify reviews to ensure quality.",
    fr: "Oui, nous validons les profils et vérifions les avis pour garantir la qualité.",
  },
  "faq.q5.question": {
    en: "Can I modify or cancel a request?",
    fr: "Puis-je modifier ou annuler une demande ?",
  },
  "faq.q5.answer": {
    en: "Yes, from your dashboard, you can manage your ongoing requests.",
    fr: "Oui, depuis votre tableau de bord, vous pouvez gérer vos demandes en cours.",
  },
  "faq.contact.text": {
    en: "Can't find your answer? ",
    fr: "Vous ne trouvez pas votre réponse ? ",
  },
  "faq.contact.link": {
    en: "Contact our support",
    fr: "Contactez notre support",
  },
  "faq.contact.suffix": {
    en: ".",
    fr: ".",
  },
  // How it works translations
  "hiw.title": {
    en: "How it works",
    fr: "Comment ça marche",
  },
  "hiw.subtitle": {
    en: "Find the ideal professional for your project in three simple steps",
    fr: "Trouvez rapidement le professionnel idéal pour votre projet en trois étapes simples",
  },
  "hiw.step1.title": {
    en: "Launch a job search",
    fr: "Lancez une recherche d'un métier",
  },
  "hiw.step1.description": {
    en: "Define your need and find the best talents in your area in just a few clicks.",
    fr: "Définissez votre besoin et trouvez les meilleurs talents dans votre région en quelques clics.",
  },
  "hiw.step2.title": {
    en: "Choose your preferred provider",
    fr: "Choisissez le prestataire de votre choix",
  },
  "hiw.step2.description": {
    en: "Compare profiles, ratings and expertise to find the ideal professional for your project.",
    fr: "Comparez les profils, évaluations et expertises pour trouver le professionnel idéal pour votre projet.",
  },
  "hiw.step3.title": {
    en: "Contact them",
    fr: "Contactez le",
  },
  "hiw.step3.description": {
    en: "Establish a direct connection with the provider to discuss your project and start your collaboration.",
    fr: "Établissez une connexion directe avec le prestataire pour discuter de votre projet et démarrer votre collaboration.",
  },
  // Why use it section translations
  "why.use.title": {
    en: "Why use our platform?",
    fr: "Pourquoi utiliser notre plateforme ?",
  },
  "why.use.subtitle": {
    en: "Save time, compare with confidence, and find the right professional at the right price.",
    fr: "Gagnez du temps, comparez en confiance, et trouvez le bon pro au bon prix.",
  },
  "why.use.as.user.title": {
    en: "As a user",
    fr: "En tant qu'utilisateur",
  },
  "why.use.as.user.subtitle": {
    en: "Ready to find the right professional?",
    fr: "Prêt à trouver le bon pro ?",
  },
  "why.use.as.pro.title": {
    en: "As a professional",
    fr: "En tant que professionnel",
  },
  "why.use.as.pro.subtitle": {
    en: "Develop your business starting today.",
    fr: "Développez votre activité dès aujourd'hui.",
  },
  // User advantages
  "why.use.user.speed.title": {
    en: "Speed",
    fr: "Rapidité",
  },
  "why.use.user.speed.text": {
    en: "Find a professional in just a few clicks.",
    fr: "Trouvez un professionnel en quelques clics.",
  },
  "why.use.user.geolocation.title": {
    en: "Geolocation",
    fr: "Géolocalisation",
  },
  "why.use.user.geolocation.text": {
    en: "Locate professionals near you.",
    fr: "Repérez les pros proches de chez vous.",
  },
  "why.use.user.choice.title": {
    en: "Wide choice",
    fr: "Large choix",
  },
  "why.use.user.choice.text": {
    en: "Access dozens of trades and services.",
    fr: "Accédez à des dizaines de métiers et services.",
  },
  "why.use.user.reviews.title": {
    en: "Verified reviews",
    fr: "Avis vérifiés",
  },
  "why.use.user.reviews.text": {
    en: "Decide with confidence thanks to ratings.",
    fr: "Décidez en confiance grâce aux évaluations.",
  },
  "why.use.user.contact.title": {
    en: "Direct contact",
    fr: "Contact direct",
  },
  "why.use.user.contact.text": {
    en: "Exchange via the integrated messaging system.",
    fr: "Échangez via la messagerie intégrée.",
  },
  "why.use.user.quotes.title": {
    en: "Express quotes",
    fr: "Devis express",
  },
  "why.use.user.quotes.text": {
    en: "Receive multiple proposals quickly.",
    fr: "Recevez plusieurs propositions rapidement.",
  },
  // Professional advantages
  "why.use.pro.visibility.title": {
    en: "Increased visibility",
    fr: "Visibilité accrue",
  },
  "why.use.pro.visibility.text": {
    en: "Reach qualified clients near you.",
    fr: "Touchez des clients qualifiés près de vous.",
  },
  "why.use.pro.profile.title": {
    en: "Valued profile",
    fr: "Profil valorisé",
  },
  "why.use.pro.profile.text": {
    en: "Showcase your achievements and expertise.",
    fr: "Mettez en avant vos réalisations et expertises.",
  },
  "why.use.pro.reputation.title": {
    en: "Reputation",
    fr: "Réputation",
  },
  "why.use.pro.reputation.text": {
    en: "Build trust with customer reviews.",
    fr: "Renforcez la confiance avec les avis clients.",
  },
  "why.use.pro.tools.title": {
    en: "Management tools",
    fr: "Outils de gestion",
  },
  "why.use.pro.tools.text": {
    en: "Centralize requests, quotes and appointments.",
    fr: "Centralisez demandes, devis et rendez-vous.",
  },
  "why.use.pro.opportunities.title": {
    en: "Opportunities",
    fr: "Opportunités",
  },
  "why.use.pro.opportunities.text": {
    en: "Win contracts you would have missed.",
    fr: "Gagnez des contrats que vous auriez manqués.",
  },
  "why.use.pro.security.title": {
    en: "Security & compliance",
    fr: "Sécurité & conformité",
  },
  "why.use.pro.security.text": {
    en: "Secure exchanges and payments.",
    fr: "Echanges et paiements sécurisés.",
  },
  // CTA buttons
  "why.use.user.cta": {
    en: "Start a search",
    fr: "Lancer une recherche",
  },
  "why.use.pro.cta.primary": {
    en: "Create my professional profile",
    fr: "Créer mon profil pro",
  },
  "why.use.pro.cta.secondary": {
    en: "Discover how it works",
    fr: "Découvrir comment ça marche",
  },
  // Stats section translations
  "stats.verified.pros": {
    en: "Verified Pros",
    fr: "Pros vérifiés",
  },
  "stats.connections": {
    en: "Connections made",
    fr: "Mises en relation",
  },
  "stats.average.rating": {
    en: "Average rating",
    fr: "Moyenne d'avis",
  },
  // Hero section translations
  "hero.main.title": {
    en: "Find the professional closest to you",
    fr: "Trouvez le professionnel le plus proche de vous",
  },
  "hero.main.subtitle": {
    en: "Connect with thousands of professionals in construction, crafts, automotive and more.",
    fr: "Connectez-vous avec des milliers de professionnels dans le bâtiment, l'artisanat, l'automobile et plus encore.",
  },
  "hero.search.category.placeholder": {
    en: "All categories",
    fr: "Toutes les catégories",
  },
  "hero.search.location.placeholder": {
    en: "Where? (city, postal code)",
    fr: "Où ? (ville, code postal)",
  },
  "hero.search.location.detecting": {
    en: "Detecting your position...",
    fr: "Détection de votre position...",
  },
  "hero.search.button": {
    en: "Search",
    fr: "Rechercher",
  },
  "hero.carousel.view.category": {
    en: "View category",
    fr: "Voir la catégorie",
  },
  // Popular categories section translations
  "popular.categories.title": {
    en: "Popular services in your area",
    fr: "Services populaires dans votre zone",
  },
}

// Custom hook to get localized categories
export function useLocalizedCategories() {
  const { language } = useLanguage();
  // Import the function synchronously
  const { getLocalizedCategories } = require('../constants/categories');
  return getLocalizedCategories(language);
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

