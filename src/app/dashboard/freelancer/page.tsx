import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, Clock, Search, User, FileText, Star } from "lucide-react"
import Link from "next/link"

export default function FreelancerDashboard() {
  // Sample data for freelancer dashboard
  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      client: {
        name: "Global Retail Inc.",
        avatar: "/ap.png?height=40&width=40",
        initials: "GR",
      },
      status: "In Progress",
      dueDate: "2023-11-15",
      payment: "$1,200",
      progress: 65,
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: {
        name: "Tech Startup Ltd.",
        avatar: "/ap.png?height=40&width=40",
        initials: "TS",
      },
      status: "Review",
      dueDate: "2023-11-05",
      payment: "$850",
      progress: 90,
    },
  ]

  const availableProjects = [
    {
      id: 1,
      title: "WordPress Website Development",
      description:
        "Looking for an experienced WordPress developer to create a custom theme and implement various plugins.",
      budget: "$800 - $1,200",
      postedDate: "2 days ago",
      proposals: 8,
      skills: ["WordPress", "PHP", "JavaScript", "CSS"],
    },
    {
      id: 2,
      title: "Logo Design for Tech Startup",
      description:
        "Need a modern, minimalist logo for our AI-powered analytics platform. Should convey innovation and reliability.",
      budget: "$300 - $500",
      postedDate: "1 day ago",
      proposals: 12,
      skills: ["Logo Design", "Branding", "Adobe Illustrator"],
    },
    {
      id: 3,
      title: "Content Writing for SaaS Blog",
      description:
        "Seeking a content writer with SaaS experience to create 10 blog posts about customer success and retention.",
      budget: "$500 - $700",
      postedDate: "3 days ago",
      proposals: 15,
      skills: ["Content Writing", "SEO", "SaaS", "B2B"],
    },
  ]

  const recentReviews = [
    {
      id: 1,
      client: {
        name: "Sarah Thompson",
        avatar: "/ap.png?height=40&width=40",
        initials: "ST",
      },
      project: "Brand Identity Design",
      rating: 5,
      comment: "Exceptional work! Delivered exactly what we needed and was very responsive throughout the project.",
      date: "Oct 15, 2023",
    },
    {
      id: 2,
      client: {
        name: "Michael Chen",
        avatar: "/ap.png?height=40&width=40",
        initials: "MC",
      },
      project: "Website Redesign",
      rating: 4,
      comment: "Great work overall. Communication was excellent and the final product met our expectations.",
      date: "Oct 2, 2023",
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Freelancer Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and client relationships</p>
        </div>
        <Button asChild>
          <Link href="/search">
            <Search className="mr-2 h-4 w-4" /> Find Projects
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">Projects in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Projects</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableProjects.length}</div>
            <p className="text-xs text-muted-foreground">Matching your skills</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Earnings This Month</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,850</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9/5</div>
            <p className="text-xs text-muted-foreground">Based on {recentReviews.length} reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="available">Available Projects</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Projects</CardTitle>
                <CardDescription>Projects you're currently working on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{project.title}</h3>
                          <Badge
                            variant={project.status === "Review" ? "outline" : "default"}
                            className={project.status === "Review" ? "border-amber-500 text-amber-500" : ""}
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{project.client.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div>{project.payment}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex w-full max-w-[180px] flex-col gap-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div className="h-full bg-primary" style={{ width: `${project.progress}%` }}></div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="available" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Projects Matching Your Skills</CardTitle>
                <CardDescription>Browse and apply for these available projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {availableProjects.map((project) => (
                    <div key={project.id} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium">{project.title}</h3>
                        <Badge variant="outline">{project.budget}</Badge>
                      </div>
                      <p className="mb-3 text-sm">{project.description}</p>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Posted {project.postedDate}</span>
                          <span>{project.proposals} proposals</span>
                        </div>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
                <CardDescription>What clients are saying about your work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="rounded-lg border p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.client.avatar} alt={review.client.name} />
                            <AvatarFallback>{review.client.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{review.client.name}</h4>
                            <p className="text-xs text-muted-foreground">{review.project}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

