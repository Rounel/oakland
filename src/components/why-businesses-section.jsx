"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CheckCircle, DollarSign, Shield, Award, Star } from "lucide-react"

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
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function WhyBusinessesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-slate-50" ref={ref}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={container}>
            <motion.h2
              className="text-4xl font-bold mb-10"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              Why businesses
              <br />
              turn to SkillMatch
            </motion.h2>

            <div className="space-y-10">
              <motion.div
                className="flex gap-6"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
                  },
                }}
              >
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Proof of quality</h3>
                  <p className="text-slate-600">
                    Check any pro's work samples, client reviews, and identity verification.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-6"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
                  },
                }}
              >
                <div className="flex-shrink-0 mt-1">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">No cost until you hire</h3>
                  <p className="text-slate-600">
                    Interview potential fits for your job, negotiate rates, and only pay for work you approve.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-6"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, ease: "easeOut", delay: 0.6 },
                  },
                }}
              >
                <div className="flex-shrink-0 mt-1">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Safe and secure</h3>
                  <p className="text-slate-600">
                    Focus on your work knowing we help protect your data and privacy. We're here with 24/7 support if
                    you need it.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative h-[500px]">
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-3/5 bg-green-600 rounded-lg overflow-hidden"
                initial={{ x: 100, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              >
                <div className="p-10 text-white h-full flex flex-col justify-center">
                  <motion.h3
                    className="text-3xl font-bold mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    We're
                    <br />
                    the world's work
                    <br />
                    marketplace
                  </motion.h3>

                  <motion.div
                    className="flex items-center gap-2 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <Star className="h-8 w-8 fill-white text-white" />
                    <div>
                      <div className="text-3xl font-bold">4.9/5</div>
                      <div className="text-sm">Clients rate professionals on SkillMatch</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <Award className="h-8 w-8 text-white" />
                    <div>
                      <div className="text-xl font-bold">Award winner</div>
                      <div className="text-sm">G2's 2023 Best Software Awards</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                initial={{ x: -50, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Professional freelancer"
                  width={300}
                  height={400}
                  className="h-[400px] w-auto"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

