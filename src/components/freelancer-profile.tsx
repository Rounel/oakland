"use client"

import Image from "next/image"
import { Check, MapPin, MessageSquare, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

interface FreelancerProfileProps {
  freelancer: {
    id: string
    name: string
    username: string
    isVettedPro: boolean
    rating: number
    reviewCount: number
    isTopRated: boolean
    tagline: string
    location: string
    language: string
    bio: string
    skills: string[]
    clients: {
      name: string
      logo: string
    }[]
    hourlyRate: number
    responseTime: string
    isOnline: boolean
    localTime: string
  }
}

export function FreelancerProfile({ freelancer }: FreelancerProfileProps) {
  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                <Image
                  src="/ap.png?height=128&width=128"
                  alt={freelancer.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Profile Header */}
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{freelancer.name}</h1>
                <span className="text-gray-500">@{freelancer.username}</span>
                {freelancer.isVettedPro && (
                  <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 font-medium">Vetted Pro</Badge>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold ml-1">{freelancer.rating}</span>
                  <span className="text-gray-500 ml-1">({freelancer.reviewCount})</span>
                </div>

                {freelancer.isTopRated && (
                  <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-sm">
                    <span className="font-medium">Top Rated</span>
                    <span className="ml-1">♦♦♦</span>
                  </div>
                )}
              </div>

              <p className="text-gray-700 mb-4">{freelancer.tagline}</p>

              <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {freelancer.location}
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path>
                    <path d="M7 3.34V5a3 3 0 0 0 3 3h0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17"></path>
                    <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  {freelancer.language}
                </div>
              </div>
            </div>
          </div>

          {/* Vetted by Okland */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-2">Vetted by Okland</h2>
            <p className="text-gray-700">{freelancer.name} was selected by the Okland team for their expertise.</p>
          </div>

          {/* Vetted for */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Vetted for</h2>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span>Articles & Blog Posts</span>
            </div>
          </div>

          {/* About me */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">About me</h2>
            <p className="text-gray-700">
              I specialize in building digital ecosystems that drive real growth. From fast, beautiful websites to
              strategic SEO and blog content that converts, I create complete online experiences that get results. With
              9+ years of experience and 550+ happy clients, I know exactly what it takes to turn b...{" "}
              <button className="text-gray-700 font-medium hover:underline">Read more</button>
            </p>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {freelancer.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
              <span className="bg-gray-100 text-blue-600 px-3 py-1.5 rounded-full text-sm hover:bg-gray-200 transition-colors font-medium">
                +1
              </span>
            </div>
          </div>

          {/* Clients */}
          {/* <div className="mt-8">
            <h2 className="text-lg font-bold mb-3">Among my clients:</h2>
            <div className="flex flex-wrap gap-6 items-center">
              {freelancer.clients.map((client, index) => (
                <div key={index} className="h-8">
                  <Image
                    src={client.logo || "/ap.png?height=32&width=80"}
                    alt={client.name}
                    width={80}
                    height={32}
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* Right Column - Contact Card */}
        <div>
          <div className="bg-white border rounded-lg p-6 sticky top-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="/ap.png?height=40&width=40"
                  alt={freelancer.name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-bold">{freelancer.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-gray-400 mr-1.5"></span>
                    Offline
                  </span>
                  <span className="mx-1">•</span>
                  <span>{freelancer.localTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold">à partir de {freelancer.hourlyRate} FCFA</span>
            </div>

            <div className="mb-6">
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask about free intro calls
              </button>
            </div>

            <Button className="w-full bg-gray-900 hover:bg-black mb-4 py-6">
              <MessageSquare className="h-5 w-5 mr-2" />
              Contact me
            </Button>

            <div className="text-center text-gray-600">Average response time: {freelancer.responseTime}</div>

            <div className="mt-8 pt-6 border-t">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16H12.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Okland satisfaction guarantee</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Okland providers deliver top-quality work. If you're not satisfied, we'll refund you.
                  </p>
                  <a href="#" className="text-sm font-medium hover:underline">
                    About satisfaction guarantee
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewRatingSummary />
    </div>
  )
}

function ReviewRatingSummary() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const ratingDistribution = [
    { stars: 5, count: 449, percentage: 98.9 },
    { stars: 4, count: 3, percentage: 0.7 },
    { stars: 3, count: 0, percentage: 0 },
    { stars: 2, count: 1, percentage: 0.2 },
    { stars: 1, count: 1, percentage: 0.2 }
  ];
  
  const detailedRatings = [
    { category: "Niveau de communication avec le prestataire", rating: 5 },
    { category: "Qualité de la livraison", rating: 5 },
    { category: "Valeur de la livraison", rating: 4.9 }
  ];

  return (
    <div className={`mx-auto bg-white my-6 rounded-lg transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'} grid md:grid-cols-2 gap-10`}>
      <div className="">
        {/* Header with total reviews */}
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-bold mr-3">454 Avis</h2>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-xl font-bold">5,0</span>
          </div>
        </div>
        
        {/* Rating distribution */}
        <div className="mb-8">
          {ratingDistribution.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-24 text-sm text-gray-600">{item.stars} étoile{item.stars > 1 ? 's' : ''}</div>
              <div className="flex-1 mx-3">
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div 
                    className="h-full bg-gray-800 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: isVisible ? `${item.percentage}%` : '0%',
                      transitionDelay: `${index * 100}ms`
                    }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-right text-sm text-gray-600">({item.count})</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Detailed ratings */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Détails de la notation</h3>
        
        {detailedRatings.map((item, index) => (
          <div key={index} className="flex items-center justify-between mb-3">
            <div className="text-gray-600">{item.category}</div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 font-medium">{item.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}