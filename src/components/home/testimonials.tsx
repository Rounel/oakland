"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"

export function Testimonials() {
  const { t } = useLanguage()

  const testimonials = [
    {
      id: 1,
      content:
        "Working with providers on this platform has transformed our business. We found the perfect developer who understood our vision.",
      author: {
        name: "Sarah Johnson",
        role: "Marketing Director",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      rating: 5,
    },
    {
      id: 2,
      content:
        "As a freelancer, I've been able to connect with amazing clients and grow my portfolio. The platform is intuitive and secure.",
      author: {
        name: "David Chen",
        role: "UX Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "DC",
      },
      rating: 5,
    },
    {
      id: 3,
      content:
        "The quality of talent on this platform is exceptional. We hired a content writer who exceeded our expectations on every level.",
      author: {
        name: "Marie Dubois",
        role: "Startup Founder",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MD",
      },
      rating: 4,
    },
  ]

  return (
    <section className="container px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t("testimonials.title")}</h2>
          <p className="mt-2 text-muted-foreground">Hear from our satisfied clients and providers</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardHeader>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{testimonial.content}</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                    <AvatarFallback>{testimonial.author.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.author.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.author.role}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

