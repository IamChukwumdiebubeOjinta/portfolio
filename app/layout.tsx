import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chukwumdiebube Ojinta - Full-Stack Engineer & AI Systems Architect",
  description:
    "Portfolio of Chukwumdiebube Ojinta, a full-stack engineer specializing in AI-powered applications, Remix, React, and modern web technologies.",
  keywords: ["Full-Stack Engineer", "AI Systems", "React", "Remix", "Next.js", "TypeScript"],
  authors: [{ name: "Chukwumdiebube Ojinta" }],
  openGraph: {
    title: "Chukwumdiebube Ojinta - Full-Stack Engineer & AI Systems Architect",
    description: "Building modern, intelligent, user-first digital experiences",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          <div className="pt-16">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
