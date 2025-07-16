"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  const [activeSection, setActiveSection] = useState("objet")

  const sidebarItems = [
    { id: "objet", label: "Objet" },
    { id: "acceptation-cgvu", label: "Acceptation des CGVU" },
    { id: "fonctionnement-plateforme", label: "Fonctionnement de la Plateforme" },
    { id: "acces-inscription", label: "Accès et inscription" },
    { id: "modalites-paiement", label: "Modalités de paiement" },
    { id: "role-limite-plateforme", label: "Rôle limité de la Plateforme" },
    { id: "exoneration-responsabilite", label: "Exonération de responsabilité" },
    { id: "obligations-utilisateurs", label: "Obligations des utilisateurs" },
    { id: "donnees-personnelles", label: "Données personnelles" },
    { id: "propriete-intellectuelle", label: "Propriété intellectuelle" },
    { id: "resiliation-suspension", label: "Résiliation et suspension" },
    { id: "droit-applicable", label: "Droit applicable - Litiges" },
    { id: "reglement-prestataires", label: "Règlement Intérieur des Prestataires" },
    { id: "dispositions-finales", label: "Dispositions finales" },
  ]

  return (
    <div className="min-h-screen scroll-smooth">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            Conditions <span className="text-purple-500">Générales</span>
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Conditions Générales de Vente et d'Utilisation de la plateforme. En utilisant notre service, vous acceptez
            ces conditions.
          </p>
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
                    Les présentes Conditions Générales de Vente et d'Utilisation ont pour objet de définir les modalités
                    d'accès et d'utilisation de la plateforme [Nom de l'application] (ci-après « la Plateforme »),
                    éditée par [Nom de votre entreprise], dont le siège social est situé à [adresse], immatriculée au
                    RCCM d'[ville] sous le numéro [numéro], (ci-après « l'Éditeur » ou « la Société »).
                  </p>
                  <p>
                    La Plateforme permet la mise en relation entre des professionnels prestataires de services (ci-après
                    les « Prestataires ») et des utilisateurs finaux (ci-après les « Clients ») souhaitant commander ou
                    réserver leurs services.
                  </p>
                </div>
              </section>

              <section id="acceptation-cgvu" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">2. Acceptation des CGVU</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    En créant un compte ou en utilisant la Plateforme, le Prestataire ou le Client accepte sans réserve
                    les présentes CGVU.
                  </p>
                  <p>
                    L'Éditeur se réserve le droit de modifier les CGVU à tout moment. En cas de modification, les CGVU
                    applicables sont celles en vigueur au moment de l'utilisation.
                  </p>
                </div>
              </section>

              <section id="fonctionnement-plateforme" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">3. Fonctionnement de la Plateforme</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Les Prestataires créent un profil et renseignent les services qu'ils proposent.</p>
                  <p>
                    Les Clients peuvent consulter les profils, faire des demandes, réserver ou commander des
                    prestations.
                  </p>
                  <p>
                    La Plateforme agit exclusivement comme intermédiaire technique, sans participation dans les contrats
                    conclus entre Prestataires et Clients.
                  </p>
                </div>
              </section>

              <section id="acces-inscription" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">4. Accès et inscription</h2>
                <div className="space-y-4 text-gray-700">
                  <p>L'accès à la Plateforme est gratuit pour les Clients.</p>
                  <p>
                    Les Prestataires peuvent être soumis à des frais d'abonnement ou de commission, précisés dans les
                    conditions tarifaires accessibles sur la Plateforme.
                  </p>
                  <p>
                    Les utilisateurs s'engagent à fournir des informations exactes lors de l'inscription et à maintenir
                    leur compte à jour.
                  </p>
                </div>
              </section>

              <section id="modalites-paiement" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">5. Modalités de paiement</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Les paiements entre Clients et Prestataires peuvent transiter par la Plateforme via un prestataire
                    de paiement sécurisé.
                  </p>
                  <p>
                    En cas de commission, le montant perçu par la Plateforme est indiqué au moment de la transaction.
                  </p>
                  <p>
                    L'Éditeur ne garantit pas le paiement effectif des prestations si la transaction est réalisée en
                    dehors de la Plateforme.
                  </p>
                </div>
              </section>

              <section id="role-limite-plateforme" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">6. Rôle limité de la Plateforme</h2>
                <div className="space-y-4 text-gray-700">
                  <p>La Plateforme agit uniquement comme intermédiaire technique.</p>
                  <p>Elle n'est pas partie aux contrats conclus entre les Prestataires et les Clients.</p>
                  <p>
                    <strong>La Société ne garantit pas :</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>La qualité ou la conformité des prestations réalisées par les Prestataires ;</li>
                    <li>La solvabilité ou la fiabilité des Clients ;</li>
                    <li>La réalisation effective de la prestation.</li>
                  </ul>
                </div>
              </section>

              <section id="exoneration-responsabilite" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">7. Exonération de responsabilité</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>L'Éditeur n'est pas responsable :</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Des litiges commerciaux entre Prestataires et Clients ;</li>
                    <li>Des retards, annulations, inexécutions ou inexactitudes dans les prestations ;</li>
                    <li>Des dommages, pertes ou litiges consécutifs à une mauvaise utilisation de la Plateforme.</li>
                  </ul>
                  <p>
                    Chaque utilisateur est seul responsable des engagements qu'il prend et des informations qu'il
                    fournit.
                  </p>
                </div>
              </section>

              <section id="obligations-utilisateurs" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">8. Obligations des utilisateurs</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Les Prestataires s'engagent à :</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Fournir des informations exactes sur leurs services ;</li>
                    <li>
                      Réaliser les prestations dans les règles de l'art et en respectant la réglementation en vigueur en
                      Côte d'Ivoire.
                    </li>
                  </ul>
                  <p>
                    <strong>Les Clients s'engagent à :</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>
                      Fournir des informations exactes et à respecter les engagements pris auprès des Prestataires ;
                    </li>
                    <li>Régler les prestations convenues dans les délais.</li>
                  </ul>
                </div>
              </section>

              <section id="donnees-personnelles" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">9. Données personnelles</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    La Plateforme collecte et traite des données à caractère personnel dans le respect de la
                    réglementation ivoirienne sur la protection des données.
                  </p>
                  <p>
                    Les utilisateurs disposent d'un droit d'accès, de modification et de suppression de leurs données en
                    écrivant à : [adresse email].
                  </p>
                </div>
              </section>

              <section id="propriete-intellectuelle" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">10. Propriété intellectuelle</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Tous les éléments de la Plateforme (marques, logos, contenus, textes, visuels, code) sont la
                    propriété exclusive de l'Éditeur et protégés par les lois ivoiriennes et internationales sur la
                    propriété intellectuelle.
                  </p>
                  <p>Toute reproduction ou utilisation sans autorisation est interdite.</p>
                </div>
              </section>

              <section id="resiliation-suspension" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">11. Résiliation et suspension de compte</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    L'Éditeur se réserve le droit de suspendre ou supprimer un compte utilisateur en cas de non-respect
                    des présentes CGVU, de comportement frauduleux ou illégal.
                  </p>
                </div>
              </section>

              <section id="droit-applicable" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">12. Droit applicable – Litiges</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Les présentes CGVU sont régies par le droit ivoirien.</p>
                  <p>
                    Tout litige relatif à l'interprétation ou à l'exécution des présentes relève de la compétence
                    exclusive des tribunaux d'Abidjan, sauf règlement amiable préalable.
                  </p>
                </div>
              </section>

              <section id="reglement-prestataires" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">
                  13. Règlement Intérieur des Prestataires (Annexe)
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Le présent règlement fait partie intégrante des CGVU et s'applique à tout utilisateur inscrit en
                    tant que Prestataire de services sur la plateforme [Nom de l'application]. Il a pour objet
                    d'encadrer la conduite, la qualité de service et les obligations professionnelles des Prestataires
                    envers les Clients et la Plateforme.
                  </p>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">13.1. Inscription et profil</h3>
                  <p>
                    Le Prestataire doit renseigner des informations exactes, à jour et vérifiables sur son identité, son
                    activité, ses qualifications et ses tarifs.
                  </p>
                  <p>Il est responsable de l'exactitude et de la mise à jour de son profil.</p>
                  <p>
                    La Société se réserve le droit de demander des justificatifs (ex. pièce d'identité, diplôme, numéro
                    RCCM ou CNPS, attestation fiscale).
                  </p>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">13.2. Obligations de comportement</h3>
                  <p>
                    <strong>Le Prestataire s'engage à :</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Offrir un service professionnel, conforme aux engagements pris ;</li>
                    <li>Être ponctuel, poli, respectueux et réactif avec les Clients ;</li>
                    <li>
                      Ne pas tenir de propos injurieux, discriminatoires, diffamatoires ou commerciaux hors du cadre de
                      la plateforme ;
                    </li>
                    <li>
                      S'abstenir de toute tentative de détournement de Clients vers des canaux externes non autorisés.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">13.3. Qualité de service</h3>
                  <p>
                    Le Prestataire doit veiller à fournir des prestations de qualité, conformes à la description faite
                    sur la Plateforme.
                  </p>
                  <p>
                    En cas d'annulation ou de retard, le Prestataire doit prévenir le Client dans les plus brefs délais.
                  </p>
                  <p>
                    Les litiges peuvent donner lieu à une évaluation du comportement du Prestataire, pouvant entraîner
                    des sanctions.
                  </p>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">13.4. Obligations légales et fiscales</h3>
                  <p>
                    Le Prestataire reconnaît être seul responsable de ses obligations fiscales, sociales et
                    réglementaires (notamment CNPS, impôt sur le revenu ou patente, le cas échéant).
                  </p>
                  <p>La Société ne se substitue en aucun cas à ces obligations.</p>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">13.5. Interdictions spécifiques</h3>
                  <p>
                    <strong>Il est formellement interdit au Prestataire de :</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Réaliser des prestations illégales ou contraires à l'ordre public ;</li>
                    <li>Usurper l'identité d'un tiers ou fournir des documents falsifiés ;</li>
                    <li>Détourner la plateforme à des fins autres que la mise en relation professionnelle ;</li>
                    <li>
                      Solliciter directement les Clients de la Plateforme en dehors de celle-ci (sauf autorisation
                      écrite préalable).
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">13.6. Contrôle et sanctions</h3>
                  <p>
                    En cas de manquement, la Société pourra suspendre ou supprimer le compte du Prestataire, sans
                    indemnité.
                  </p>
                  <p>
                    Des sanctions peuvent aller de l'avertissement à l'exclusion définitive, en fonction de la gravité
                    ou de la répétition des manquements.
                  </p>
                  <p>
                    La Société se réserve également le droit d'engager une action en responsabilité en cas de préjudice
                    subi.
                  </p>
                </div>
              </section>

              <section id="dispositions-finales" className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">14. Dispositions finales</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Les présentes CGVU et le règlement annexé forment un ensemble contractuel indivisible.</p>
                  <p>
                    Les clauses d'exonération de responsabilité, de limitation du rôle de la Plateforme et de compétence
                    juridictionnelle sont reconduites intégralement.
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/20">
                  <div className="text-center space-y-2 text-gray-400">
                    <p>Fait à [lieu], le [date]</p>
                    <p>En vigueur à compter du [date]</p>
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
