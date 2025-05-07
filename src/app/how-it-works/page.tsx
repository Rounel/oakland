import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryCard } from "@/components/category-card"
import { Timeline } from "@/components/ui/timeline"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-600 to-green-700 text-white py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">How Okland works</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Here are your steps to success, from finding a freelancer to delivering of your virtual masterpiece.
            </p>
          </div>
        </section>

        {/* Profile Card Section */}
        {/* <section className="bg-gradient-to-b from-green-700 to-[#001e2d] py-16 md:py-24 relative">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full animate-float">
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 mb-2">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="Freelancer profile"
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="font-bold text-lg">David L.</h3>
                <p className="text-sm text-gray-500">Logo Designer</p>
                <div className="flex items-center mt-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">5.0 (341)</span>
                </div>
                <div className="border-t border-gray-200 w-full pt-4 mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Starting at</span>
                    <span className="font-bold">$50</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 w-full pt-4 mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Delivery time</span>
                    <span className="font-bold">2 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-white mt-12">
            <p className="mb-4">Check it out</p>
            <div className="animate-bounce">
              <ChevronDown className="mx-auto h-6 w-6" />
            </div>
          </div>
        </section> */}

        {/* Fiverr Go Section */}
        {/* <section className="bg-gradient-to-b from-[#001e2d] via-purple-900 to-red-600 py-16 md:py-24 text-white">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Fiverr Go</h2>
              <p className="mb-6">
                Choose a freelancer personally fit and instantly matched to your project with Fiverr Go, tailored to
                deliver for success.
              </p>
              <Button className="bg-white text-green-600 hover:bg-gray-100">Start generating</Button>
            </div>
            <div className="relative animate-slide-up">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Fiverr Go interface"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </section> */}

        {/* 4 Steps Section */}
        <div className="relative w-full overflow-clip">
        <Timeline data={steps} />
        </div>

        {/* Tips Section */}
        {/* <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-green-600 font-medium mb-2">TIPS TO MAKE SUCCESS</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Perfecting your process will save you time and effort—and we've got the perfect tips.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tipCategories.map((category, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h3 className="font-bold text-lg mb-4">{category.title}</h3>
                  <ul className="space-y-4">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-600">{tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Icons Section */}
        {/* <section className="py-12 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4">
            <p className="text-center text-xs text-gray-500 uppercase mb-8">TRUSTED BY MILLIONS OF BUSINESSES</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[1, 2, 3].map((icon) => (
                <div key={icon} className="w-20 h-20 flex items-center justify-center">
                  <Image
                    src={`/placeholder.svg?height=80&width=80`}
                    alt={`Trusted company ${icon}`}
                    width={80}
                    height={80}
                    className="opacity-70"
                  />
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* First Step Section */}
        {/* <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Take your first step, your way.</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                You can find the right fit by browsing work from our talented community, or post a project and let them
                come to you.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {firstSteps.map((step, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 flex flex-col animate-fade-in">
                  <div className="mb-6">
                    <Image
                      src={`/placeholder.svg?height=200&width=300`}
                      alt={step.title}
                      width={300}
                      height={200}
                      className="rounded-lg w-full"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{step.description}</p>
                  <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50 mt-auto">
                    {step.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Browse our most popular categories to find inspiration for your next project.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <CategoryCard key={index} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">FAQs</h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <button className="flex justify-between items-center w-full text-left py-4">
                    <h3 className="font-medium">{faq.question}</h3>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">For quick assistance:</p>
              <p className="mb-2">
                We can't wait to hear from you.{" "}
                <Link href="#" className="text-green-600 hover:underline">
                  Drop us a message
                </Link>{" "}
                any time.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

const steps = [
  {
    title: "Recherchez un professionnel près de chez vous",
    description: "Find the perfect match for your project by exploring profiles, reviews, and portfolios.",
  },
  {
    title: "Contactez celui qui vous convient le mieux",
    description: "Message providers to discuss your project requirements and expectations.",
  },
//   {
//     title: "Place your order",
//     description: "Confirm your requirements and make a payment to start the project.",
//   },
//   {
//     title: "Review & approve",
//     description: "Receive your delivery, provide feedback, and release payment when satisfied.",
//   },
]

const tipCategories = [
  {
    title: "Professional search",
    tips: [
      "Use specific keywords to find the right talent for your project",
      "Filter by ratings, delivery time, and budget to narrow your options",
      "Check portfolios to ensure their style matches your vision",
    ],
  },
  {
    title: "Communication",
    tips: [
      "Clearly describe your project requirements and expectations",
      "Respond promptly to messages to keep the project moving",
      "Use Fiverr's messaging system for all communications",
    ],
  },
  {
    title: "Feedback",
    tips: [
      "Provide constructive feedback to help providers improve their work",
      "Be specific about what you like and what needs adjustment",
      "Leave honest reviews to help other buyers make informed decisions",
    ],
  },
  {
    title: "Inspiration",
    tips: [
      "Browse through popular categories to discover new ideas",
      "Save favorite providers for future projects",
      "Use collections to organize your saved services",
    ],
  },
  {
    title: "Custom offers",
    tips: [
      "Ask for a custom offer if you need something specific",
      "Discuss your budget and timeline before placing an order",
      "Be clear about deliverables and revisions",
    ],
  },
  {
    title: "Order-enhancing Extras",
    tips: [
      "Consider adding extras to enhance your project",
      "Evaluate if faster delivery or additional revisions are worth the cost",
      "Discuss custom extras if needed",
    ],
  },
  {
    title: "How to tip",
    tips: [
      "Show appreciation for exceptional work with a tip",
      "Tips are optional but appreciated for going above and beyond",
      "You can add a tip after the order is complete",
    ],
  },
  {
    title: "Resolution",
    tips: [
      "If issues arise, communicate with your freelancer first",
      "Use Fiverr's resolution center if needed",
      "Customer support is available to help resolve disputes",
    ],
  },
]

const firstSteps = [
  {
    title: "Search our catalog",
    description: "Explore the marketplace for the services you need, filtering by category, budget, and delivery time.",
    buttonText: "Explore providers",
  },
  {
    title: "Get tailored offers",
    description: "Post a request with your specific needs and receive custom offers from talented providers.",
    buttonText: "Post a request",
  },
  {
    title: "Schedule a consultation",
    description: "Book a video call with a freelancer to discuss your project requirements in detail before ordering.",
    buttonText: "Talk with providers",
  },
]

const categories = [
  {
    name: "Graphics & Design",
    image: "/placeholder.svg?height=150&width=150",
    color: "#b5e3b8",
  },
  {
    name: "Programming & Tech",
    image: "/placeholder.svg?height=150&width=150",
    color: "#a52a2a",
  },
  {
    name: "Digital Marketing",
    image: "/placeholder.svg?height=150&width=150",
    color: "#ffd580",
  },
  {
    name: "Video & Animation",
    image: "/placeholder.svg?height=150&width=150",
    color: "#f08080",
  },
  {
    name: "Writing & Translation",
    image: "/placeholder.svg?height=150&width=150",
    color: "#8b4513",
  },
  {
    name: "Data",
    image: "/placeholder.svg?height=150&width=150",
    color: "#add8e6",
  },
  {
    name: "Music & Audio",
    image: "/placeholder.svg?height=150&width=150",
    color: "#d3d3d3",
  },
  {
    name: "Business",
    image: "/placeholder.svg?height=150&width=150",
    color: "#90ee90",
  },
  {
    name: "Photography",
    image: "/placeholder.svg?height=150&width=150",
    color: "#808080",
  },
  {
    name: "AI Services",
    image: "/placeholder.svg?height=150&width=150",
    color: "#ff7f50",
  },
]

const faqs = [
  {
    question: "How will I know whether the Fiverr providers can do what they claim?",
    answer:
      "You can review their portfolio, check ratings and reviews from previous clients, and even request a custom offer to test their skills before committing to a larger project.",
  },
  {
    question: "What are the key elements I need to look for when choosing the right freelancer?",
    answer:
      "Look for relevant experience, positive reviews, clear communication, response time, and a portfolio that matches your project needs. You can also message them before ordering to gauge their understanding of your requirements.",
  },
  {
    question: "What should I do if I have issues with a seller?",
    answer:
      "First, try to resolve the issue directly with the seller through Fiverr's messaging system. If that doesn't work, you can use Fiverr's Resolution Center to address the problem. For further assistance, contact Fiverr's customer support.",
  },
  {
    question: "What do reviews indicate?",
    answer:
      "Reviews provide insights into a freelancer's reliability, quality of work, communication skills, and ability to meet deadlines. They reflect the experiences of previous clients and can help you make an informed decision.",
  },
]
