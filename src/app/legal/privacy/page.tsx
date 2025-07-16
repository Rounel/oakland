"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  const [activeSection, setActiveSection] = useState("objet")

  const sidebarItems = [
    { id: "objet", label: "Objet" },
    { id: "donnees-collectees", label: "Données collectées" },
    { id: "finalites-traitement", label: "Finalités du traitement" },
    { id: "base-legale", label: "Base légale du traitement" },
    { id: "partage-donnees", label: "Partage des données" },
    { id: "duree-conservation", label: "Durée de conservation" },
    { id: "securite", label: "Sécurité" },
    { id: "droits-utilisateurs", label: "Droits des utilisateurs" },
    { id: "cookies", label: "Cookies et technologies similaires" },
    { id: "transferts-donnees", label: "Transferts de données" },
    { id: "modification-politique", label: "Modification de la Politique" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen scroll-smooth">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            Politique de <span className="text-purple-500">Confidentialité</span>
          </h1>
          <div className="text-gray-700 text-lg max-w-2xl mx-auto space-y-2">
            <p>Politique de Confidentialité de l'application [Nom de l'Application]</p>
            <p className="text-sm">Dernière mise à jour : [date]</p>
            <p className="text-sm">Droit applicable : droit ivoirien</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-[20rem]">
            <nav className="space-y-2 sticky top-18">
              {sidebarItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-black/10 text-black"
                      : "text-gray-500 hover:text-black hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:w-full">
            <div className="prose prose-invert max-w-none">
              <section id="objet" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">1. Objet</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    La présente Politique de Confidentialité décrit la manière dont OKLAND HOLDING, société immatriculée
                    au RCCM sous le numéro [numéro], dont le siège social est situé à [adresse], en sa qualité de
                    responsable de traitement, collecte, utilise, conserve et protège les données personnelles des
                    utilisateurs (Clients et Prestataires) de l'application [Nom de l'Application].
                  </p>
                </div>
              </section>

              <section id="donnees-collectees" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">2. Données collectées</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Nous collectons les données suivantes de manière directe ou indirecte :</p>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">2.1 Données d'inscription :</h3>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Nom et prénom</li>
                    <li>Adresse e-mail</li>
                    <li>Numéro de téléphone</li>
                    <li>Adresse postale</li>
                    <li>Mot de passe (chiffré)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">2.2 Données de profil (Prestataires) :</h3>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Nom commercial, numéro de registre (RCCM/CNPS)</li>
                    <li>Description des services</li>
                    <li>Tarification</li>
                    <li>Coordonnées professionnelles</li>
                    <li>Photos ou certificats</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">2.3 Données de navigation :</h3>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Identifiants de connexion, logs, cookies, adresse IP</li>
                    <li>Historique de recherches et réservations</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">2.4 Données de transaction :</h3>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Montants payés ou facturés</li>
                    <li>Moyen de paiement (via prestataire tiers sécurisé)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">
                    2.5 Données de localisation (avec autorisation) :
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Localisation GPS pour optimiser la mise en relation</li>
                  </ul>
                </div>
              </section>

              <section id="finalites-traitement" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">3. Finalités du traitement</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Les données sont collectées pour les finalités suivantes :</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Création et gestion des comptes utilisateurs,</li>
                    <li>Mise en relation entre Clients et Prestataires,</li>
                    <li>Suivi des transactions, paiements et évaluations,</li>
                    <li>Assistance et support client,</li>
                    <li>Lutte contre la fraude et les usages abusifs,</li>
                    <li>Respect des obligations légales, fiscales et réglementaires,</li>
                    <li>Envoi de notifications, emails ou SMS (avec consentement préalable)</li>
                  </ul>
                </div>
              </section>

              <section id="base-legale" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">4. Base légale du traitement</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Les traitements reposent sur :</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>L'exécution du contrat entre l'utilisateur et la plateforme,</li>
                    <li>Le respect d'obligations légales (ex. : obligations comptables),</li>
                    <li>L'intérêt légitime de la plateforme à améliorer ses services</li>
                    <li>Le consentement explicite de l'utilisateur, lorsqu'il est requis</li>
                  </ul>
                </div>
              </section>

              <section id="partage-donnees" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">5. Partage des données</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Les données peuvent être transmises uniquement à :</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>
                      Des prestataires techniques ou sous-traitants agissant pour le compte de la plateforme
                      (hébergement, paiements, maintenance),
                    </li>
                    <li>Les autorités administratives ou judiciaires en cas d'obligation légale</li>
                  </ul>
                  <p className="font-semibold">La plateforme ne revend jamais vos données personnelles.</p>
                </div>
              </section>

              <section id="duree-conservation" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">6. Durée de conservation</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Les données sont conservées pendant :</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>La durée de l'inscription de l'utilisateur sur la plateforme,</li>
                    <li>Puis 5 ans après suppression du compte (à des fins légales ou probatoires)</li>
                    <li>Les données de facturation : 10 ans selon la législation comptable.</li>
                  </ul>
                </div>
              </section>

              <section id="securite" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">7. Sécurité</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    La Plateforme met en œuvre des mesures techniques et organisationnelles pour protéger les données
                    personnelles :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Stockage sécurisé (serveurs protégés par chiffrement)</li>
                    <li>Accès restreint aux seuls personnels autorisés,</li>
                    <li>Mots de passe chiffrés, pare-feux, journalisation des accès</li>
                  </ul>
                </div>
              </section>

              <section id="droits-utilisateurs" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">8. Droits des utilisateurs</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Conformément à la loi ivoirienne sur la protection des données personnelles (Loi n°2013-450) et à la
                    réglementation de l'ARTCI, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Droit d'accès,</li>
                    <li>Droit de rectification,</li>
                    <li>Droit d'opposition,</li>
                    <li>Droit à la suppression (effacement),</li>
                    <li>Droit de limitation ou portabilité (si applicable)</li>
                  </ul>
                  <div className="bg-white/5 p-4 rounded-lg mt-4">
                    <p>
                      <strong>Pour exercer vos droits, vous pouvez écrire à :</strong>
                    </p>
                    <p>[Email dédié] ou par courrier à [adresse de l'entreprise].</p>
                  </div>
                </div>
              </section>

              <section id="cookies" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">9. Cookies et technologies similaires</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Des cookies ou traceurs peuvent être utilisés pour :</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Améliorer l'expérience utilisateur,</li>
                    <li>Assurer la sécurité,</li>
                    <li>Réaliser des statistiques anonymes</li>
                  </ul>
                  <p>
                    Vous pouvez gérer vos préférences dans les paramètres de votre navigateur ou depuis l'application.
                  </p>
                </div>
              </section>

              <section id="transferts-donnees" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">10. Transferts de données hors de Côte d'Ivoire</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Les données peuvent être hébergées sur des serveurs situés hors de la Côte d'Ivoire. Le cas échéant,
                    des garanties appropriées sont mises en place, conformément aux exigences de l'ARTCI.
                  </p>
                </div>
              </section>

              <section id="modification-politique" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">11. Modification de la Politique</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    La présente Politique peut être mise à jour à tout moment. En cas de modification majeure, les
                    utilisateurs seront informés par notification ou email.
                  </p>
                </div>
              </section>

              <section id="contact" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">12. Contact</h2>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-white/5 p-6 rounded-lg">
                    <p className="mb-2">
                      <strong>Responsable du traitement :</strong> [Nom de l'entreprise]
                    </p>
                    <p>
                      <strong>Contact :</strong> [email] | [téléphone]
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
