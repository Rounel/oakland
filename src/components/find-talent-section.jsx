"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

export default function FindTalentSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      <Image
        src="/1.jpg"
        alt="Client working on laptop"
        width={1200}
        height={600}
        className="w-full h-[600px] object-cover absolute"
        priority
      />

      {/* Content */}
      <div className="container relative z-20 p-4 md:p-8">
        <motion.div
          className=" text-white"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          <motion.p className="text-xl mb-4" variants={item}>
            For clients
          </motion.p>

          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6" variants={item}>
            Find talent
            <br />
            your way
          </motion.h2>

          <motion.p className="text-xl mb-12 max-w-2xl" variants={item}>
            Work with the largest network of independent professionals and get things done—from quick turnarounds to big
            transformations.
          </motion.p>

          <motion.div className="grid md:grid-cols-3 gap-4 w-full" variants={container}>
            <motion.div variants={item}>
              <motion.div
                className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-md h-full flex flex-col"
                whileHover="hover"
                initial="rest"
                variants={buttonHover}
              >
                <h3 className="text-4xl font-semibold mb-auto pb-4">
                  Post a job
                  <br />
                  and hire a pro
                </h3>
                <div className="flex items-center text-sm font-medium">
                  Talent Marketplace™
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={item}>
              <motion.div
                className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-md h-full flex flex-col"
                whileHover="hover"
                initial="rest"
                variants={buttonHover}
              >
                <h3 className="text-4xl font-semibold mb-auto pb-12">
                  Browse and
                  <br />
                  buy projects
                </h3>
                <div className="flex items-center text-sm font-medium">
                  Project Catalog™
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={item}>
              <motion.div
                className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-md h-full flex flex-col"
                whileHover="hover"
                initial="rest"
                variants={buttonHover}
              >
                <h3 className="text-4xl font-semibold mb-auto pb-12">
                  Get advice from an
                  <br />
                  industry expert
                </h3>
                <div className="flex items-center text-sm font-medium">
                  Consultations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

