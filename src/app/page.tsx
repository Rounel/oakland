"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, CheckCircle, Star, Users, Shield, Award, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import FindTalentSection from "@/components/find-talent-section"
import WhyBusinessesSection from "@/components/why-businesses-section"
import TrustedBrandsSection from "@/components/trusted-brands-section"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const slideIn = (direction = "right", delay = 0) => ({
  hidden: {
    x: direction === "left" ? -60 : 60,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay,
    },
  },
})

// Animated section component
const AnimatedSection = ({ children, className, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay,
            when: "beforeChildren",
            staggerChildren: 0.2,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Animated job card component for the "Up your work game" section
const JobCard = () => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">iOS developer to join our team</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Less than 30 hrs/week</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Less than 1 month</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
              <line x1="16" y1="8" x2="2" y2="22"></line>
              <line x1="17.5" y1="15" x2="9" y2="15"></line>
            </svg>
            <span>Expert</span>
          </div>
        </div>
        <div className="h-4 bg-gray-100 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-100 rounded mb-2"></div>
        <div className="h-4 bg-gray-100 rounded mb-2 w-5/6"></div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">WordPress</span>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">MySQL</span>
        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">PHP</span>
        <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs">JavaScript</span>
        <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs">CSS3</span>
        <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs">HTML</span>
      </div>
      <motion.div
        className="absolute -right-10 -bottom-10"
        initial={{ rotate: -10, y: 20 }}
        animate={{ rotate: 0, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <div className="w-32 h-32 bg-orange-400 rounded-full relative">
          <div className="absolute top-6 left-6 w-16 h-16 bg-orange-500 rounded-full"></div>
          <motion.div
            className="absolute top-4 left-10 w-6 h-20 bg-purple-400 rounded-full origin-bottom"
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
          ></motion.div>
        </div>
      </motion.div>
      <motion.button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Job posted!
      </motion.button>
    </motion.div>
  )
}

// Category card with animation
const CategoryCard = ({ title, rating, skills, delay = 0 }) => {
  return (
    <motion.div
      className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
      variants={fadeIn}
      custom={delay}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span>{rating}/5</span>
        <span className="mx-2">•</span>
        <span>{skills} skills</span>
      </div>
    </motion.div>
  )
}

export default function Home() {
  // Ref for the scroll animation
  const scrollRef = useRef(null)

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollY = window.scrollY
        const element = scrollRef.current
        element.style.transform = `translateY(${scrollY * 0.1}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="container flex items-center justify-between py-4 max-w-[90rem] mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-2xl text-primary">
              Oakland
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Find Talent
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Find Work
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Why Oakland
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Enterprise
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors hidden md:block">
              Log In
            </Link>
            <Button className="transition-all hover:scale-105">Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[90rem] mx-auto">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10" />
          <div ref={scrollRef} className="absolute inset-0">
            <Image
              src="/1.jpg"
              alt="Professional working on laptop"
              width={1200}
              height={600}
              className="w-full h-[600px] object-cover"
            />
          </div>
          <div className="container relative z-20 py-20">
            <motion.div
              className="max-w-2xl text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Connecting exceptional talent with ambitious projects
              </motion.h1>
              <motion.p
                className="text-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Find the perfect match for your business needs or showcase your skills to clients worldwide.
              </motion.p>
              <motion.div
                className="bg-white p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <div className="flex gap-2 mb-4 text-gray-800">
                  <Button variant="outline" className="rounded-full bg-white transition-all hover:scale-105">
                    I need to hire
                  </Button>
                  <Button variant="ghost" className="rounded-full transition-all hover:scale-105">
                    I want to work
                  </Button>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search for any skill or job title"
                      className="pl-10 border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <Button className="transition-all hover:scale-105">Search</Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <AnimatedSection className="py-20 bg-slate-50">
          <div className="container">

            <div className="grid md:grid-cols-2 gap-8 mx-auto">
              <JobCard />

              <motion.div
                className="space-y-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div className=" mb-12" variants={fadeIn}>
                  <h2 className="text-4xl font-bold mb-4">Up your work game, it's easy</h2>
                  <p className="text-lg text-muted-foreground">
                    Whether you're looking to hire top talent or find your next gig, Oakland makes it simple.
                  </p>
                </motion.div>
                <motion.div className="flex gap-4" variants={slideIn("left", 0.1)}>
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">No cost to join</h3>
                    <p className="text-muted-foreground">
                      Register and browse talent profiles, explore projects, or even book a consultation.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex gap-4" variants={slideIn("left", 0.2)}>
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Post a job and hire top talent</h3>
                    <p className="text-muted-foreground">
                      Finding talent doesn't have to be a chore. Post a job or we can search for you!
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex gap-4" variants={slideIn("left", 0.3)}>
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Work with the best—without breaking the bank</h3>
                    <p className="text-muted-foreground">
                      Oakland makes it affordable to up your work and take advantage of low transaction rates.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex gap-4 mt-8" variants={fadeIn}>
                  <Button className="gap-2 transition-all hover:scale-105 hover:shadow-md">Sign up for free</Button>
                  <Button variant="outline" className="gap-2 transition-all hover:scale-105">
                    Learn how to hire
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Categories Section */}
        <AnimatedSection className="py-20">
          <div className="container">
            <motion.h2 className="text-3xl font-bold mb-6" variants={fadeIn}>
              Browse talent by category
            </motion.h2>

            <motion.p className="mb-12 text-muted-foreground" variants={fadeIn}>
              Looking for work?{" "}
              <Link href="#" className="text-primary hover:underline">
                Browse jobs
              </Link>
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <CategoryCard title="Development & IT" rating="4.85" skills="1853" delay={0} />
              <CategoryCard title="AI Services" rating="4.8" skills="294" delay={0.1} />
              <CategoryCard title="Design & Creative" rating="4.91" skills="968" delay={0.2} />
              <CategoryCard title="Sales & Marketing" rating="4.77" skills="392" delay={0.3} />
              <CategoryCard title="Writing & Translation" rating="4.92" skills="505" delay={0.4} />
              <CategoryCard title="Admin & Customer Support" rating="4.77" skills="508" delay={0.5} />
              <CategoryCard title="Finance & Accounting" rating="4.79" skills="214" delay={0.6} />
              <CategoryCard title="Engineering & Architecture" rating="4.85" skills="650" delay={0.7} />
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Enterprise Section */}
        <AnimatedSection className="bg-emerald-800 text-white">
          <div className="container rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center ">
              <motion.div variants={fadeIn} className="px-4">
                <h2 className="text-3xl font-bold mb-4">This is how innovative companies find exceptional talent</h2>
                <p className="text-lg mb-8 text-emerald-100">
                  Oakland Enterprise offers a complete solution for workforce management, talent acquisition, and
                  project delivery.
                </p>
                <motion.ul className="space-y-4 mb-8" variants={staggerContainer}>
                  <motion.li
                    className="flex items-start gap-3"
                    variants={slideIn("left", 0.1)}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <CheckCircle className="h-6 w-6 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>Access elite talent pools curated for your industry</span>
                  </motion.li>
                  <motion.li
                    className="flex items-start gap-3"
                    variants={slideIn("left", 0.2)}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <CheckCircle className="h-6 w-6 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>Streamline your hiring process with AI-powered matching</span>
                  </motion.li>
                  <motion.li
                    className="flex items-start gap-3"
                    variants={slideIn("left", 0.3)}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <CheckCircle className="h-6 w-6 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>Dedicated account manager to ensure your success</span>
                  </motion.li>
                </motion.ul>
                <motion.div variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="secondary" className="transition-all">
                    Learn about Enterprise
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div className="relative" variants={scaleUp}>
                <Image
                  src="/1.jpg"
                  alt="Enterprise solutions"
                  width={850}
                  height={500}
                  className="shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        <FindTalentSection />

        {/* For Clients & Talent Section */}
        <AnimatedSection className="py-20">
          <div className="container">
            <Tabs defaultValue="clients" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-12">
                <TabsTrigger value="clients" className="transition-all data-[state=active]:scale-105">
                  For Clients
                </TabsTrigger>
                <TabsTrigger value="talent" className="transition-all data-[state=active]:scale-105">
                  For Talent
                </TabsTrigger>
              </TabsList>
              <TabsContent value="clients" className="space-y-6">
                <motion.div
                  className="grid md:grid-cols-2 gap-12 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <motion.h2 className="text-3xl font-bold mb-6" variants={fadeIn}>
                      Find talent your way
                    </motion.h2>
                    <motion.p className="text-lg mb-8 text-muted-foreground" variants={fadeIn}>
                      Work with the largest network of independent professionals and get things done—from quick
                      turnarounds to big transformations.
                    </motion.p>
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={staggerContainer}>
                      <motion.div variants={scaleUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="h-auto py-6 flex flex-col items-center gap-2 w-full transition-all hover:shadow-md">
                          <Briefcase className="h-6 w-6" />
                          <span>Post a job</span>
                        </Button>
                      </motion.div>
                      <motion.div variants={scaleUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          className="h-auto py-6 flex flex-col items-center gap-2 w-full transition-all hover:shadow-md"
                        >
                          <Users className="h-6 w-6" />
                          <span>Browse talent</span>
                        </Button>
                      </motion.div>
                      <motion.div variants={scaleUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="secondary"
                          className="h-auto py-6 flex flex-col items-center gap-2 w-full transition-all hover:shadow-md"
                        >
                          <Award className="h-6 w-6" />
                          <span>Pro matching</span>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                  <motion.div variants={slideIn("right")} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <Image
                      src="/placeholder.svg?height=400&width=500"
                      alt="Client posting a job"
                      width={500}
                      height={400}
                      className="rounded-lg shadow-lg"
                    />
                  </motion.div>
                </motion.div>
              </TabsContent>
              <TabsContent value="talent" className="space-y-6">
                <motion.div
                  className="grid md:grid-cols-2 gap-12 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <motion.h2 className="text-3xl font-bold mb-6" variants={fadeIn}>
                      Find great work
                    </motion.h2>
                    <motion.p className="text-lg mb-8 text-muted-foreground" variants={fadeIn}>
                      Meet clients you're excited to work with and take your career or business to new heights.
                    </motion.p>
                    <motion.ul className="space-y-4 mb-8" variants={staggerContainer}>
                      <motion.li
                        className="flex items-start gap-3"
                        variants={slideIn("left", 0.1)}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span>Find opportunities for every stage of your freelance career</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-3"
                        variants={slideIn("left", 0.2)}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span>Control when, where, and how you work</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-3"
                        variants={slideIn("left", 0.3)}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span>Explore different ways to earn</span>
                      </motion.li>
                    </motion.ul>
                    <motion.div variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="transition-all hover:shadow-md">Find Opportunities</Button>
                    </motion.div>
                  </div>
                  <motion.div variants={slideIn("right")} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <Image
                      src="/placeholder.svg?height=400&width=500"
                      alt="Freelancer working"
                      width={500}
                      height={400}
                      className="rounded-lg shadow-lg"
                    />
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </AnimatedSection>

        <WhyBusinessesSection />

        {/* Why Choose Us Section */}
        {/* <AnimatedSection className="py-20 bg-slate-50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6">Why businesses choose Oakland</h2>
                <motion.ul className="space-y-8" variants={staggerContainer}>
                  <motion.li
                    className="flex items-start gap-4"
                    variants={slideIn("left", 0.1)}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">Proven quality</h3>
                      <p className="text-muted-foreground">
                        Our rigorous vetting process ensures you work with top-tier professionals who consistently
                        deliver excellence.
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex items-start gap-4"
                    variants={slideIn("left", 0.2)}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">Safe and secure</h3>
                      <p className="text-muted-foreground">
                        Our platform provides secure payments, contracts, and communication channels to protect your
                        business.
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex items-start gap-4"
                    variants={slideIn("left", 0.3)}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">Flexible solutions</h3>
                      <p className="text-muted-foreground">
                        Whether you need a single expert or an entire team, our platform scales to meet your business
                        requirements.
                      </p>
                    </div>
                  </motion.li>
                </motion.ul>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg"
                variants={scaleUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="bg-primary text-white p-6 rounded-lg mb-6"
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h3 className="font-bold text-xl mb-2">We're where the work happens</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 fill-white text-white" />
                    <Star className="h-5 w-5 fill-white text-white" />
                    <Star className="h-5 w-5 fill-white text-white" />
                    <Star className="h-5 w-5 fill-white text-white" />
                    <Star className="h-5 w-5 fill-white text-white" />
                    <span className="ml-2 font-medium">4.9/5</span>
                  </div>
                  <p className="text-primary-foreground mb-4">
                    Join thousands of satisfied clients and freelancers who trust Oakland
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="secondary" className="w-full transition-all">
                      Create Account
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="mb-2 font-medium">Trusted by 10,000+ businesses worldwide</p>
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <motion.div className="font-bold text-slate-400" whileHover={{ scale: 1.1, color: "#6366f1" }}>
                      COMPANY
                    </motion.div>
                    <motion.div className="font-bold text-slate-400" whileHover={{ scale: 1.1, color: "#6366f1" }}>
                      BRAND
                    </motion.div>
                    <motion.div className="font-bold text-slate-400" whileHover={{ scale: 1.1, color: "#6366f1" }}>
                      ENTERPRISE
                    </motion.div>
                    <motion.div className="font-bold text-slate-400" whileHover={{ scale: 1.1, color: "#6366f1" }}>
                      STARTUP
                    </motion.div>
                    <motion.div className="font-bold text-slate-400" whileHover={{ scale: 1.1, color: "#6366f1" }}>
                      TECH CO
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection> */}

        <TrustedBrandsSection />

        {/* Testimonials Section */}
        <AnimatedSection className="py-20">
          <div className="container">
            <motion.h2 className="text-3xl font-bold mb-12 text-center" variants={fadeIn}>
              Trusted by leading brands and startups
            </motion.h2>
            <motion.div className="grid md:grid-cols-3 gap-6" variants={staggerContainer}>
              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
                <Card className="bg-emerald-700 text-white h-full">
                  <CardContent className="p-6">
                    <p className="mb-6 text-emerald-100">
                      "Oakland has transformed how we approach talent acquisition. The quality of professionals we've
                      connected with has exceeded our expectations, and the platform's ease of use makes the entire
                      process seamless."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="font-semibold">
                        <p>Sarah Johnson</p>
                        <p className="text-sm text-emerald-200">CTO, TechVision</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
                <Card className="bg-amber-600 text-white h-full">
                  <CardContent className="p-6">
                    <p className="mb-6 text-amber-100">
                      "As a growing startup, finding specialized talent quickly is crucial. Oakland has been
                      instrumental in helping us build our team with top-tier professionals who align perfectly with our
                      company culture and technical needs."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="font-semibold">
                        <p>Michael Chen</p>
                        <p className="text-sm text-amber-200">Founder, InnovateLab</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
                <Card className="bg-blue-700 text-white h-full">
                  <CardContent className="p-6">
                    <p className="mb-6 text-blue-100">
                      "The enterprise solutions offered by Oakland have revolutionized our approach to project-based
                      work. Their dedicated account management and quality assurance have made them an invaluable
                      partner in our growth."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="font-semibold">
                        <p>Emily Rodriguez</p>
                        <p className="text-sm text-blue-200">VP of Operations, GlobalCorp</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection className="py-20 bg-slate-50">
          <div className="container">
            <motion.div className="grid md:grid-cols-3 gap-12" variants={staggerContainer}>
              <motion.div variants={fadeIn}>
                <h2 className="text-2xl font-bold mb-6">Top Skills</h2>
                <motion.ul className="space-y-2">
                  {[
                    "Web Development",
                    "Mobile App Development",
                    "UI/UX Design",
                    "Content Writing",
                    "Digital Marketing",
                    "Data Analysis",
                    "Project Management",
                    "Video Editing",
                  ].map((skill, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5, color: "hsl(var(--primary))" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href="#" className="hover:text-primary transition-colors">
                        {skill}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              <motion.div variants={fadeIn}>
                <h2 className="text-2xl font-bold mb-6">Categories & Specialties</h2>
                <motion.ul className="space-y-2">
                  {[
                    "Data Science Specialists",
                    "Video Editors",
                    "Content Strategists",
                    "Graphic Designers",
                    "DevOps Engineers",
                    "Full Stack Developers",
                    "Social Media Managers",
                    "SEO Specialists",
                  ].map((category, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5, color: "hsl(var(--primary))" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href="#" className="hover:text-primary transition-colors">
                        {category}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              <motion.div variants={fadeIn}>
                <h2 className="text-2xl font-bold mb-6">Trending Technologies</h2>
                <motion.ul className="space-y-2">
                  {[
                    "React.js Development",
                    "Python Programming",
                    "AI & Machine Learning",
                    "Blockchain Development",
                    "Cloud Architecture",
                    "AR/VR Development",
                    "Cybersecurity",
                    "Data Visualization",
                  ].map((tech, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5, color: "hsl(var(--primary))" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href="#" className="hover:text-primary transition-colors">
                        {tech}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container max-w-[90rem] mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                title: "For Clients",
                links: ["How to Hire", "Talent Marketplace", "Project Catalog", "Enterprise", "Success Stories"],
              },
              {
                title: "For Talent",
                links: ["How to Find Work", "Direct Contracts", "Getting Paid", "Success Stories", "Skill Tests"],
              },
              {
                title: "Resources",
                links: ["Help & Support", "Success Stories", "Blog", "Community", "Affiliate Program"],
              },
              {
                title: "Company",
                links: ["About Us", "Leadership", "Careers", "Press", "Contact Us"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility", "Security"],
              },
            ].map((section, sectionIndex) => (
              <motion.div key={sectionIndex} variants={fadeIn}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-slate-300">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={linkIndex} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      <Link href="#" className="hover:text-white transition-colors">
                        {link}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <Link href="/" className="font-bold text-xl">
                Oakland
              </Link>
              <div className="flex items-center gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.2, y: -3 }} transition={{ duration: 0.2 }}>
                    <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                      <span className="sr-only">{social}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`lucide lucide-${social}`}
                      >
                        {social === "twitter" && (
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        )}
                        {social === "facebook" && (
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        )}
                        {social === "instagram" && (
                          <>
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                          </>
                        )}
                        {social === "linkedin" && (
                          <>
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </>
                        )}
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="text-slate-400 text-sm">© 2025 Oakland, Inc. All rights reserved.</div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

