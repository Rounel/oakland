"use client"

import { motion } from "framer-motion"
import Link from "next/link"
// Pas besoin d'importer LucideIcon

interface CategoryProps {
  category: {
    id: string
    name: string
    slug: string
  }
}

export default function CategoryCard({ category }: CategoryProps) {
  return (
    <Link href={`/recherche?categorie=${category.slug}`}>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
      </motion.div>
    </Link>
  )
}
