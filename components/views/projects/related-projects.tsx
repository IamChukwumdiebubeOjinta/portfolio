"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const relatedProjects = [
  {
    title: "WaveFound Music Platform",
    description: "AI-powered music optimization and marketing platform",
    category: "SaaS Platform",
    image: "/placeholder.svg?height=200&width=300&text=WaveFound",
    slug: "wavefound-music-platform",
  },
  {
    title: "Gallery & Vault System",
    description: "Drag-and-drop file management with nested folders",
    category: "File Management",
    image: "/placeholder.svg?height=200&width=300&text=Gallery+Vault",
    slug: "gallery-vault-system",
  },
]

interface RelatedProjectsProps {
  currentProject: {
    id: string
    title: string
  }
}

export function RelatedProjects({ currentProject }: RelatedProjectsProps) {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    {project.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full gap-2" asChild>
                    <a href={`/project/${project.slug}`}>
                      View Project
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
