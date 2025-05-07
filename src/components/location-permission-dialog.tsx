"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LocationPermissionDialogProps {
  onAllow: () => void
  onDeny: () => void
}

export default function LocationPermissionDialog({ onAllow, onDeny }: LocationPermissionDialogProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleAllow = () => {
    setIsVisible(false)
    onAllow()
  }

  const handleDeny = () => {
    setIsVisible(false)
    onDeny()
  }

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false)
        onDeny()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onDeny])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-0 right-0 mx-auto w-full max-w-md z-50 px-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-primary/10 rounded-full p-2 mr-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Autoriser la géolocalisation</h3>
                  <button
                    onClick={handleDeny}
                    className="ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Pour vous proposer les prestataires les plus proches, nous avons besoin de votre localisation.
                  Voulez-vous l'autoriser ?
                </p>
                <div className="mt-4 flex space-x-3">
                  <Button variant="default" onClick={handleAllow}>
                    Autoriser
                  </Button>
                  <Button variant="outline" onClick={handleDeny}>
                    Plus tard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
