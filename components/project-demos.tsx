"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play, Github } from "lucide-react"

const demos = [
  {
    title: "WaveFound",
    description:
      "A platform for optimizing and marketing music across platforms with AI-powered insights and analytics.",
    image: "/placeholder.svg?height=300&width=500",
    tech: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    demoUrl: "#",
    githubUrl: "#",
    status: "Live",
  },
  {
    title: "WOTIF",
    description: "Task management and productivity app with intelligent scheduling and team collaboration features.",
    image: "/placeholder.svg?height=300&width=500",
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
    demoUrl: "#",
    githubUrl: "#",
    status: "Beta",
  },
  {
    title: "PaymentGateway",
    description: "Secure payment processing system with multi-currency support and fraud detection.",
    image: "/placeholder.svg?height=300&width=500",
    tech: ["FastAPI", "PostgreSQL", "Redis", "Stripe API"],
    demoUrl: "#",
    githubUrl: "#",
    status: "Development",
  },
]

export function ProjectDemos() {
  return (
    <section id="demos" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Some of the noteworthy projects I have built</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive demos and live applications showcasing real-world solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={demo.image || "/placeholder.svg"}
                    alt={demo.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="sm" className="gap-2">
                      <Play className="h-4 w-4" />
                      View Demo
                    </Button>
                  </div>
                  <Badge
                    className="absolute top-3 right-3"
                    variant={demo.status === "Live" ? "default" : demo.status === "Beta" ? "secondary" : "outline"}
                  >
                    {demo.status}
                  </Badge>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{demo.title}</CardTitle>
                      <CardDescription className="text-base">{demo.description}</CardDescription>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {demo.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Want to see more of my work? Check out my complete project portfolio.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 bg-transparent"
            onClick={() => {
              const element = document.querySelector("#all-projects")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <Github className="h-5 w-5" />
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
