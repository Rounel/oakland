"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Zap, Users, Shield, Database, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-600/10 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            À propos de MonPresta
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Connecter les talents locaux avec ceux qui en ont besoin
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Notre mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Notre plateforme a pour but de mettre en lumière les travailleurs et artisans locaux en leur offrant une
              visibilité géographique ciblée. Nous croyons en la valeur du savoir-faire de proximité et voulons
              faciliter la mise en relation entre les prestataires et les clients, sans barrières ni inscription du côté
              utilisateur.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why This Platform Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Pourquoi cette plateforme ?</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Trouver facilement des prestataires
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Localisez rapidement les meilleurs professionnels près de chez vous
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Valoriser le travail local</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Soutenir l'économie locale en mettant en avant les talents de votre région
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Géolocalisation précise</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Utilisez la géolocalisation pour des résultats plus pertinents
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Simple et rapide</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Plateforme intuitive, sans inscription requise pour les utilisateurs
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who Is It For Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Pour qui est-ce fait ?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Users size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Pour les utilisateurs</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Accès libre sans création de compte</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Recherche géolocalisée des prestataires</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Contact direct avec les professionnels</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Consultation des avis et évaluations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Users size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Pour les prestataires</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Inscription via un formulaire sécurisé</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Visibilité ciblée auprès d'une clientèle locale</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Gestion simplifiée de votre profil professionnel</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Mise en valeur de vos compétences et réalisations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">L'équipe derrière le projet</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/founder-portrait.png" alt="Fondateur" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Thomas Martin</h3>
              <p className="text-primary mb-2">Fondateur & Développeur</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Passionné par la technologie et l'économie locale
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/professional-designer-portrait.png" alt="Designer" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Sophie Dubois</h3>
              <p className="text-primary mb-2">Designer UX/UI</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Experte en création d'expériences utilisateur intuitives
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/ap.png?key=3rgi7" alt="Marketing" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Lucas Bernard</h3>
              <p className="text-primary mb-2">Responsable Marketing</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Spécialiste en stratégies de croissance et communication
              </p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Commitments Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Nos engagements</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Protection des données</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Nous garantissons la sécurité et la confidentialité de vos informations
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Respect des utilisateurs</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Nous plaçons l'expérience utilisateur au cœur de nos préoccupations
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Database size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Validation rigoureuse</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Chaque profil prestataire est vérifié pour garantir son authenticité
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Plateforme accessible</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Nous nous engageons à maintenir un service gratuit pour les utilisateurs
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary text-white rounded-md">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Nous contacter</h2>
            <p className="text-xl mb-8 text-white/90">
              Vous avez des questions ou des suggestions pour améliorer notre plateforme ? N'hésitez pas à nous
              contacter, nous serons ravis d'échanger avec vous.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contactez-nous
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
