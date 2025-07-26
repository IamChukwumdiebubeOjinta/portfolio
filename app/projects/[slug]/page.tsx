"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Code,
  Zap,
  Database,
  Server,
  Smartphone,
  Monitor,
  Play,
  Star,
  Clock,
} from "lucide-react"
import { ProjectHeader } from "@/components/views/projects/project-header"
import { ProjectGallery } from "@/components/views/projects/project-gallery"
import { ProjectFeatures } from "@/components/views/projects/project-features"
import { ProjectTechStack } from "@/components/views/projects/project-tech-stack"
import { ProjectTimeline } from "@/components/views/projects/project-timeline"
import { RelatedProjects } from "@/components/views/projects/related-projects"

// Mock project data - in real app, this would come from your database
const projectsData = {
  "uloma-ai-assistant": {
    id: "1",
    title: "Uloma AI Assistant",
    subtitle: "AI-Powered Family Storytelling Platform",
    description:
      "A sophisticated AI chat interface that helps families preserve and share their stories through intelligent conversation, automatic summarization, and persistent memory.",
    longDescription: `Uloma represents a breakthrough in AI-powered storytelling, combining cutting-edge language models with robust backend architecture to create meaningful family connections. The platform uses advanced streaming techniques to provide real-time responses while maintaining conversation context across sessions.

Built with a focus on scalability and reliability, Uloma handles complex conversation flows, automatic story summarization, and intelligent memory management. The system processes thousands of messages daily while maintaining sub-second response times.`,
    category: "AI & Machine Learning",
    status: "Live",
    year: "2024",
    duration: "6 months",
    team: "Solo Developer",
    role: "Full-Stack Engineer & AI Architect",
    client: "Personal Project",
    images: [
      "/placeholder.svg?height=600&width=800&text=Uloma+Chat+Interface",
      "/placeholder.svg?height=600&width=800&text=Story+Dashboard",
      "/placeholder.svg?height=600&width=800&text=Family+Tree+View",
      "/placeholder.svg?height=600&width=800&text=Analytics+Panel",
    ],
    techStack: {
      frontend: ["Remix", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "Prisma", "PostgreSQL", "BullMQ", "Redis"],
      ai: ["Vercel AI SDK", "OpenAI GPT-4", "Streaming APIs"],
      infrastructure: ["Docker", "PM2", "Prometheus", "Grafana"],
      deployment: ["Vercel", "Railway", "AWS S3"],
    },
    features: [
      {
        title: "Real-time AI Conversations",
        description: "Streaming responses with context awareness and memory persistence",
        icon: Zap,
      },
      {
        title: "Story Summarization",
        description: "Automatic generation of story summaries using advanced NLP",
        icon: Code,
      },
      {
        title: "Family Tree Integration",
        description: "Visual family connections with story mapping",
        icon: Users,
      },
      {
        title: "Conversation Persistence",
        description: "Long-term memory storage with intelligent retrieval",
        icon: Database,
      },
      {
        title: "Queue Management",
        description: "Background processing with BullMQ for scalability",
        icon: Server,
      },
      {
        title: "Real-time Analytics",
        description: "Prometheus monitoring with custom dashboards",
        icon: Monitor,
      },
    ],
    timeline: [
      {
        phase: "Research & Planning",
        duration: "2 weeks",
        description: "Market research, technical architecture design, and AI model evaluation",
      },
      {
        phase: "Core Development",
        duration: "3 months",
        description: "Built chat interface, AI integration, and database architecture",
      },
      {
        phase: "AI Enhancement",
        duration: "1 month",
        description: "Implemented streaming, summarization, and memory systems",
      },
      {
        phase: "Infrastructure & Deployment",
        duration: "3 weeks",
        description: "Docker containerization, monitoring setup, and production deployment",
      },
      {
        phase: "Testing & Optimization",
        duration: "1 month",
        description: "Performance optimization, user testing, and bug fixes",
      },
    ],
    challenges: [
      "Implementing real-time streaming while maintaining conversation context",
      "Designing efficient queue systems for background story processing",
      "Optimizing AI response times without sacrificing quality",
      "Building scalable infrastructure for growing user base",
    ],
    results: [
      "Achieved sub-second response times for 95% of queries",
      "Successfully processed over 10,000 family stories",
      "Maintained 99.9% uptime with automated monitoring",
      "Reduced server costs by 40% through optimization",
    ],
    links: {
      demo: "https://uloma.dev",
      github: "https://github.com/username/uloma",
      case_study: "#",
    },
  },
  "instincthub-suggestion-box": {
    id: "2",
    title: "InstinctHub Suggestion Box",
    subtitle: "Anonymous Team Feedback Platform",
    description:
      "A secure, anonymous feedback system designed to improve team culture and communication within organizations.",
    longDescription: `InstinctHub Suggestion Box addresses the critical need for honest, anonymous feedback in modern workplaces. The platform ensures complete anonymity while providing valuable insights to leadership teams.

The system features advanced anonymization techniques, real-time feedback processing, and comprehensive analytics dashboards. Built with security and privacy as core principles, it has helped numerous organizations improve their internal culture.`,
    category: "Team Collaboration",
    status: "Live",
    year: "2024",
    duration: "4 months",
    team: "2 Developers",
    role: "Lead Developer",
    client: "InstinctHub",
    images: [
      "/placeholder.svg?height=600&width=800&text=Feedback+Interface",
      "/placeholder.svg?height=600&width=800&text=Admin+Dashboard",
      "/placeholder.svg?height=600&width=800&text=Analytics+View",
      "/placeholder.svg?height=600&width=800&text=Mobile+App",
    ],
    techStack: {
      frontend: ["React", "Vite", "TypeScript", "Tailwind CSS", "Chart.js"],
      backend: ["Express.js", "Node.js", "MongoDB", "JWT"],
      security: ["bcrypt", "Rate Limiting", "CORS", "Helmet"],
      deployment: ["Netlify", "Heroku", "MongoDB Atlas"],
    },
    features: [
      {
        title: "Anonymous Submissions",
        description: "Complete anonymity with advanced privacy protection",
        icon: Users,
      },
      {
        title: "Real-time Dashboard",
        description: "Live feedback monitoring and analytics",
        icon: Monitor,
      },
      {
        title: "Category Management",
        description: "Organized feedback with custom categories",
        icon: Code,
      },
      {
        title: "Mobile Responsive",
        description: "Seamless experience across all devices",
        icon: Smartphone,
      },
    ],
    timeline: [
      {
        phase: "Discovery & Design",
        duration: "3 weeks",
        description: "User research, wireframing, and security architecture planning",
      },
      {
        phase: "Frontend Development",
        duration: "6 weeks",
        description: "React application with responsive design and user interface",
      },
      {
        phase: "Backend & Security",
        duration: "4 weeks",
        description: "API development with anonymization and security features",
      },
      {
        phase: "Testing & Launch",
        duration: "3 weeks",
        description: "Security testing, performance optimization, and deployment",
      },
    ],
    challenges: [
      "Ensuring complete anonymity while preventing abuse",
      "Building intuitive admin interfaces for feedback management",
      "Implementing real-time updates without compromising performance",
    ],
    results: [
      "Deployed across 5+ organizations",
      "Processed over 1,000 anonymous feedback submissions",
      "Achieved 98% user satisfaction rating",
      "Improved team communication metrics by 35%",
    ],
    links: {
      demo: "https://instincthub-suggestions.com",
      github: "https://github.com/username/instincthub-suggestions",
    },
  },
}

export default function ProjectPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  //console.log(JSON.stringify(params))

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      //const projectData = projectsData[1]
      console.log(projectsData["uloma-ai-assistant"])
      setProject(projectsData["uloma-ai-assistant"])
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button asChild>
            <a href="/#projects">Back to Projects</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader project={project} />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Project Gallery */}
        <ProjectGallery images={project.images} title={project.title} />

        {/* Project Overview */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Project Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground">{project.longDescription}</p>
                </div>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm text-muted-foreground">{project.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Team</p>
                        <p className="text-sm text-muted-foreground">{project.team}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Role</p>
                        <p className="text-sm text-muted-foreground">{project.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Year</p>
                        <p className="text-sm text-muted-foreground">{project.year}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {project.links.demo && (
                      <Button className="w-full gap-2" asChild>
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4" />
                          View Live Demo
                        </a>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button variant="outline" className="w-full gap-2 bg-transparent" asChild>
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          View Source Code
                        </a>
                      </Button>
                    )}
                    {project.links.case_study && (
                      <Button variant="outline" className="w-full gap-2 bg-transparent" asChild>
                        <a href={project.links.case_study} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Read Case Study
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Key Features */}
        <ProjectFeatures features={project.features} />

        {/* Technology Stack */}
        <ProjectTechStack techStack={project.techStack} />

        {/* Development Timeline */}
        <ProjectTimeline timeline={project.timeline} />

        {/* Challenges & Results */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Challenges & Results</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Key Challenges</CardTitle>
                  <CardDescription>Technical and design challenges overcome during development</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Key Results</CardTitle>
                  <CardDescription>Measurable outcomes and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {project.results.map((result: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Related Projects */}
        <RelatedProjects currentProject={project} />

        {/* Back to Projects */}
        <section className="text-center">
          <Button variant="outline" size="lg" className="gap-2 bg-transparent" asChild>
            <a href="/#projects">
              <ArrowLeft className="h-4 w-4" />
              Back to All Projects
            </a>
          </Button>
        </section>
      </div>
    </div>
  )
}
