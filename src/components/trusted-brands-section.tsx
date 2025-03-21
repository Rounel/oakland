"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ComputerIcon as Microsoft } from "lucide-react"

export default function TrustedBrandsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={ref} className="py-16 bg-slate-50">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          Trusted by leading
          <br className="md:hidden" /> brands and startups
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="bg-orange-700 text-white p-8 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-6">
              <Microsoft className="h-6 w-6" />
              <span className="font-bold">Microsoft</span>
            </div>

            <p className="text-orange-100 mb-8 text-lg">
              "One of the advantages of utilizing freelancers is finding talent with different skills quickly as our
              needs change."
            </p>

            <p className="text-sm text-orange-200 mb-6">Carol Taylor, Director of Content Experience</p>

            <div className="border-t border-orange-600 pt-6">
              <h4 className="font-semibold mb-1">Results</h4>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-2xl font-bold">50% Faster</p>
                  <p className="text-sm text-orange-200">launch of projects</p>
                </div>

                <div>
                  <p className="text-2xl font-bold">10,000</p>
                  <p className="text-sm text-orange-200">projects completed</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <div className="h-full flex flex-col justify-center">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Professional working"
                width={400}
                height={300}
                className="rounded-lg mb-6"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="bg-slate-900 text-white p-8 rounded-lg"
          >
            <p className="font-medium mb-8">And many more</p>

            <motion.div
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-6"
            >
              {["Airbnb", "Automattic", "Cloudflare", "Glassdoor", "Segment", "Zendesk"].map((brand, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="flex items-center justify-center bg-slate-800 p-4 rounded-md"
                >
                  <p className="text-sm font-bold text-center">{brand}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

