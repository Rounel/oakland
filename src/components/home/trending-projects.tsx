import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChevronRight } from "lucide-react"

interface TrendingProjectsProps {
  title: string
  category: string
  budget: string
  proposals: number
  timePosted: string
  isUrgent?: boolean
}

export function TrendingProjects({
  title,
  category,
  budget,
  proposals,
  timePosted,
  isUrgent = false,
}: TrendingProjectsProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Link href={`/projects/${title.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
                <h3 className="font-medium">{title}</h3>
              </Link>
              {isUrgent && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
          <Badge variant="outline" className="text-sm">
            {budget}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{proposals} propositions</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{timePosted}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Button className="w-full" asChild>
          <Link href={`/projects/${title.toLowerCase().replace(/\s+/g, "-")}`}>
            Voir le projet <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

