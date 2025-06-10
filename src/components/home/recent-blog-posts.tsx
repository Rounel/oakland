"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import Link from "next/link"

export function RecentBlogPosts() {
  const { t } = useLanguage()

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Freelancers to Boost Productivity",
      excerpt: "Learn how to maximize your productivity and earnings as a freelancer with these proven strategies.",
      date: "2023-10-15",
      category: "Productivity",
      image: "/ap.png?height=200&width=400",
      slug: "10-tips-for-providers",
    },
    {
      id: 2,
      title: "How to Create a Winning Client Proposal",
      excerpt:
        "Stand out from the competition with these proposal writing techniques that will help you win more projects.",
      date: "2023-10-08",
      category: "Business",
      image: "/ap.png?height=200&width=400",
      slug: "winning-client-proposal",
    },
    {
      id: 3,
      title: "The Future of Remote Work and Freelancing",
      excerpt: "Explore the trends shaping the future of work and how providers can position themselves for success.",
      date: "2023-09-30",
      category: "Trends",
      image: "/ap.png?height=200&width=400",
      slug: "future-of-remote-work",
    },
  ]

  return (
    <section className="container px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t("blog.title")}</h2>
          <p className="mt-2 text-muted-foreground">Insights and tips for providers and clients</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id} className="h-full overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image || "/ap.png"}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

