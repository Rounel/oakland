"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Plus, Minus } from "lucide-react"
import Link from "next/link"

export default function Component() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>("free-trial")
  const [searchQuery, setSearchQuery] = useState("")

  const generalFaqs = [
    {
      id: "free-trial",
      question: "Is there a free trial available?",
      answer:
        "Yes, we have a free version of Untitled UI available for you to try out! It's an excellent way to get familiar with the product and see if it's right for you. It doesn't use the latest component properly features announced at Config 2022. You can duplicate this UI kit here and use it in as many projects as you'd like.",
    },
    {
      id: "free-version",
      question: "What does the free version include?",
      answer:
        "The free version includes basic components, templates, and design tokens to get you started with your projects.",
    },
    {
      id: "affiliate-program",
      question: "Do you have an affiliate program?",
      answer: "Yes, we offer an affiliate program with competitive commissions for qualified partners.",
    },
    {
      id: "use-figma",
      question: "Do I need to know how to use Figma?",
      answer:
        "Basic Figma knowledge is helpful but not required. We provide comprehensive documentation and tutorials.",
    },
    {
      id: "pay-figma",
      question: "Do I need to pay for Figma?",
      answer:
        "Figma offers a free tier that works great with our components. Premium features require a Figma subscription.",
    },
    {
      id: "sketch-xd",
      question: "Is there a version for Sketch or XD?",
      answer: "Currently, we focus on Figma, but we're exploring support for other design tools in the future.",
    },
  ]

  const billingFaqs = [
    {
      id: "one-time-payment",
      question: "Is it a one-time payment?",
      answer: "Yes, it's a one-time purchase with lifetime access to the current version and free updates.",
    },
    {
      id: "lifetime-access",
      question: "What does 'lifetime access' mean?",
      answer: "Lifetime access means you can use the product forever once purchased, including future updates.",
    },
    {
      id: "cancellation-policy",
      question: "What is your cancellation policy?",
      answer: "We offer a 30-day money-back guarantee if you're not satisfied with your purchase.",
    },
    {
      id: "invoice-info",
      question: "Can other info be added to an invoice?",
      answer: "Yes, you can add custom information to your invoice during checkout or contact support.",
    },
    {
      id: "billing-work",
      question: "How does billing work?",
      answer: "Billing is processed securely through Stripe. You'll receive an invoice immediately after purchase.",
    },
    {
      id: "change-email",
      question: "How do I change my account email?",
      answer: "You can change your email in account settings or contact our support team for assistance.",
    },
  ]

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  const filteredGeneralFaqs = generalFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredBillingFaqs = billingFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-900 rounded"></div>
                </div>
                <span className="font-semibold text-lg">Untitled UI</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">for FIGMA</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  Products
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  Interviews
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Log in
              </Button>
              <Button className="bg-white text-gray-900 hover:bg-gray-100">Sign up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="mb-4">
                <span className="text-gray-400 text-sm">Support</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-gray-300 mb-8">
                Need help with something? Here are our most frequently asked questions.
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-800 rounded-lg p-6">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Dashboard Preview"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* General FAQs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">General FAQs</h2>
            <p className="text-gray-600 mb-8">
              Everything you need to know about the product and how it works. Can't find an answer?{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Chat to our team
              </Link>
              .
            </p>
            <div className="space-y-4">
              {filteredGeneralFaqs.map((faq) => (
                <Card key={faq.id} className="border border-gray-200">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <Minus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Billing FAQs */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Billing FAQs</h2>
            <p className="text-gray-600 mb-8">
              Everything you need to know about billing and invoices. Can't find an answer?{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Chat to our team
              </Link>
              .
            </p>
            <div className="space-y-4">
              {filteredBillingFaqs.map((faq) => (
                <Card key={faq.id} className="border border-gray-200">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <Minus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Still have questions section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-4">Still have questions?</h2>
              <p className="text-xl text-gray-300 mb-8">Join over 4,000+ startups already growing with Untitled.</p>
              <div className="flex gap-4">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                  Learn more
                </Button>
                <Button className="bg-white text-gray-900 hover:bg-gray-100">Get started</Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-800 rounded-lg p-6">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Dashboard Preview"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter and Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-2">Join our newsletter</h3>
            <p className="text-gray-400 mb-4">We'll send you a nice letter once per week. No spam.</p>
            <div className="flex gap-4 max-w-md">
              <Input
                type="email"
                placeholder="Search"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-white text-gray-900 hover:bg-gray-100">Subscribe</Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Releases
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Media kit
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Help centre
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Use cases</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Startups
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Government
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    SaaS
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Marketplaces
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Ecommerce
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    AngelList
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Dribbble
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Licenses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-900 rounded"></div>
              </div>
              <span className="font-semibold text-lg">Untitled UI</span>
            </div>
            <p className="text-gray-400 text-sm">© 2077 Untitled UI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
