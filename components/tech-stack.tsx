"use client"

import { motion } from "framer-motion"

const technologies = [
  { name: "JavaScript", icon: "🟨", category: "Language" },
  { name: "TypeScript", icon: "🔷", category: "Language" },
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "Next.js", icon: "▲", category: "Framework" },
  { name: "Remix", icon: "💿", category: "Framework" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "Express", icon: "🚂", category: "Backend" },
  { name: "FastAPI", icon: "⚡", category: "Backend" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
  { name: "Prisma", icon: "🔺", category: "ORM" },
  { name: "Docker", icon: "🐳", category: "DevOps" },
  { name: "AWS", icon: "☁️", category: "Cloud" },
  { name: "Redis", icon: "🔴", category: "Cache" },
  { name: "Git", icon: "📝", category: "Tools" },
]

export function TechStack() {
  return (
    <section id="tech-stack" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The skills, tools and technologies I really enjoy working with
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated selection of technologies I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{tech.name}</h3>
                <p className="text-xs text-muted-foreground">{tech.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
