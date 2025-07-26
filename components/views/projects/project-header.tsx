"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, Play } from "lucide-react"

interface ProjectHeaderProps {
  project: {
    title: string
    subtitle: string
    description: string
    category: string
    status: string
    links: {
      demo?: string
      github?: string
    }
  }
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Back Button */}
          <Button variant="ghost" className="mb-8 gap-2" asChild>
            <a href="/#projects">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </a>
          </Button>

          {/* Project Info */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary">{project.category}</Badge>
              <Badge variant={project.status === "Live" ? "default" : "outline"}>{project.status}</Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{project.title}</h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">{project.subtitle}</p>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{project.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.links.demo && (
                <Button size="lg" className="gap-2" asChild>
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <Play className="h-4 w-4" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.links.github && (
                <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    View Source
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
