import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import type { ReactNode } from "react"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  icon: ReactNode
  imageUrl?: string
  isMobile?: boolean // Added optional prop
}

export function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  icon,
  imageUrl,
  isMobile = false, // Default to false
}: ProjectCardProps) {
  return (
    <Card className="group hover-lift overflow-hidden bg-card/50 backdrop-blur-sm border-border/50">
      {imageUrl && (
        <div className={`relative overflow-hidden h-48 ${isMobile ? "bg-muted/20" : ""}`}>
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
              // If isMobile is true, use object-contain (fit). Otherwise use object-cover (fill)
              isMobile ? "object-contain p-2" : "object-cover"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4 p-2 rounded-lg bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            {icon}
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {!imageUrl && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
              {icon}
            </div>
          )}
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
        </div>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs hover:scale-105 transition-transform cursor-default"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 group/btn bg-transparent hover:bg-primary/5" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              Code
            </a>
          </Button>
          <Button size="sm" className="flex-1 group/btn hover:shadow-lg" asChild>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-0.5 transition-transform" />
              Live Demo
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}