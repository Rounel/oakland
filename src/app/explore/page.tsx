import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"

export default function ExplorePage() {
  // Sample freelancer data
  const freelancers = [
    {
      id: 1,
      name: "Alex Morgan",
      title: "Full Stack Developer",
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "AM",
      rating: 4.9,
      reviews: 124,
      hourlyRate: "$45",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      description: "Experienced full stack developer with 6+ years of experience building web applications and APIs.",
    },
    {
      id: 2,
      name: "Sophie Chen",
      title: "UI/UX Designer",
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "SC",
      rating: 4.8,
      reviews: 87,
      hourlyRate: "$55",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      description: "Creative UI/UX designer focused on creating beautiful and functional user experiences.",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      title: "Digital Marketing Specialist",
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "MJ",
      rating: 4.7,
      reviews: 63,
      hourlyRate: "$40",
      skills: ["SEO", "Content Strategy", "Social Media", "Analytics"],
      description: "Results-driven marketing specialist with expertise in digital campaigns and growth strategies.",
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      title: "Content Writer",
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "ER",
      rating: 4.9,
      reviews: 92,
      hourlyRate: "$35",
      skills: ["Blog Writing", "Copywriting", "SEO Writing", "Editing"],
      description: "Professional writer specializing in engaging content that drives traffic and conversions.",
    },
    {
      id: 5,
      name: "Thomas Weber",
      title: "Video Editor",
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "TW",
      rating: 4.6,
      reviews: 41,
      hourlyRate: "$50",
      skills: ["Adobe Premiere", "After Effects", "Color Grading", "Motion Graphics"],
      description: "Creative video editor with experience in commercial and narrative content production.",
    },
    {
      id: 6,
      name: "Olivia Kim",
      title: "Mobile App Developer",
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "OK",
      rating: 4.8,
      reviews: 76,
      hourlyRate: "$60",
      skills: ["React Native", "Swift", "Kotlin", "Firebase"],
      description: "Specialized in developing cross-platform mobile applications with seamless user experiences.",
    },
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Freelancers</h1>
          <p className="text-muted-foreground">Find the perfect professional for your project</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Sort By</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {freelancers.map((freelancer) => (
          <Card key={freelancer.id} className="flex h-full flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                    <AvatarFallback>{freelancer.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{freelancer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <StarIcon className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{freelancer.rating}</span>
                      <span className="text-xs text-muted-foreground">({freelancer.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{freelancer.hourlyRate}</p>
                  <p className="text-xs text-muted-foreground">per hour</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4 text-sm">{freelancer.description}</p>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
              <Button className="w-full">Contact</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}

