import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { About } from "@/components/about"
import { PersonalStory } from "@/components/personal-story"
import { TechStack } from "@/components/tech-stack"
import { Projects } from "@/components/projects"
import { ProjectDemos } from "@/components/project-demos"
import { AllProjects } from "@/components/all-projects"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Stats />
      <About />
      <PersonalStory />
      <TechStack />
      <Projects />
      <ProjectDemos />
      <AllProjects />
      <Contact />
    </main>
  )
}
