import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, Clock, MessageSquare, Plus, User, FileText } from "lucide-react"
import Link from "next/link"

export default function ClientDashboard() {
  // Sample data for client dashboard
  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      freelancer: {
        name: "Alex Morgan",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AM",
      },
      status: "In Progress",
      dueDate: "2023-11-15",
      budget: "$1,200",
      progress: 65,
    },
    {
      id: 2,
      title: "Content Writing for Blog Series",
      freelancer: {
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ER",
      },
      status: "Review",
      dueDate: "2023-11-05",
      budget: "$450",
      progress: 90,
    },
    {
      id: 3,
      title: "Social Media Marketing Campaign",
      freelancer: {
        name: "Marcus Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MJ",
      },
      status: "In Progress",
      dueDate: "2023-11-30",
      budget: "$800",
      progress: 40,
    },
  ]

  const recentMessages = [
    {
      id: 1,
      from: {
        name: "Alex Morgan",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AM",
      },
      message: "I've completed the wireframes for the homepage. Please review when you have a moment.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      from: {
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ER",
      },
      message: "Just submitted the first three blog articles for your review. Let me know your thoughts!",
      time: "Yesterday",
      unread: false,
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and providers</p>
        </div>
        <Button asChild>
          <Link href="/post-project">
            <Plus className="mr-2 h-4 w-4" /> Post a New Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeProjects.length > 0 ? "Projects in progress" : "No active projects"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentMessages.filter((msg) => msg.unread).length}</div>
            <p className="text-xs text-muted-foreground">
              {recentMessages.filter((msg) => msg.unread).length > 0
                ? "Messages awaiting your response"
                : "No unread messages"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450</div>
            <p className="text-xs text-muted-foreground">Across all active projects</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="projects">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="providers">Freelancers</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>Monitor and manage your ongoing projects</CardDescription>
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
                            <span>{project.freelancer.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div>{project.budget}</div>
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
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="messages" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Stay in touch with your providers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="flex gap-4 rounded-lg border p-4">
                      <Avatar>
                        <AvatarImage src={message.from.avatar} alt={message.from.name} />
                        <AvatarFallback>{message.from.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{message.from.name}</h4>
                            {message.unread && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary">
                                New
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                        <div className="pt-2">
                          <Button size="sm">Reply</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/client/messages">View All Messages</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="providers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Freelancers</CardTitle>
                <CardDescription>Freelancers you've worked with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="flex items-center gap-4 rounded-lg border p-4">
                      <Avatar>
                        <AvatarImage src={project.freelancer.avatar} alt={project.freelancer.name} />
                        <AvatarFallback>{project.freelancer.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{project.freelancer.name}</h4>
                        <p className="text-sm text-muted-foreground">Working on: {project.title}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Profile
                      </Button>
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

