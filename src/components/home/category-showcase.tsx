import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryShowcaseProps {
  title: string
  count: string
  imageSrc: string
  href: string
}

export function CategoryShowcase({ title, count, imageSrc, href }: CategoryShowcaseProps) {
  return (
    <Link href={href}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={title}
              width={200}
              height={200}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
              <h3 className="font-medium text-white">{title}</h3>
              <p className="text-xs text-white/80">{count}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

