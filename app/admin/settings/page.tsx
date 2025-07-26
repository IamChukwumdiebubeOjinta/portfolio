"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Save, Settings, User, Palette, Bell, Shield, Plus, X } from "lucide-react"

export default function SettingsPanel() {
  const [bioText, setBioText] = useState(
    `I'm a product-focused full-stack engineer based in Nigeria, passionate about crafting highly interactive, intelligent web applications. While I thrive in front-end architecture and DX (Remix, React, Tailwind), I'm just as comfortable building complex AI-powered systems, designing backend APIs, or scaling cloud infrastructure.`,
  )

  const [features, setFeatures] = useState({
    blog: true,
    testimonials: false,
    contact: true,
    hireMeBanner: true,
    analytics: true,
  })

  const [techStack, setTechStack] = useState([
    "Remix",
    "Next.js",
    "React",
    "Vercel AI SDK",
    "OpenAI",
    "Prisma",
    "PostgreSQL",
    "FastAPI",
    "Docker",
  ])

  const [newTech, setNewTech] = useState("")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

  const toggleFeature = (feature: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }))
  }

  const addTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()])
      setNewTech("")
    }
  }

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech))
  }

  const handleSave = () => {
    setSaveStatus("saving")
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your portfolio configuration</p>
        </div>
        <Button onClick={handleSave} className="gap-2" disabled={saveStatus === "saving"}>
          <Save className="h-4 w-4" />
          {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Bio Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Bio & About Text
            </CardTitle>
            <CardDescription>Update your personal bio and about section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">About Me Text</Label>
              <Textarea
                id="bio"
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                className="min-h-[120px]"
                placeholder="Write about yourself..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Tech Stack
            </CardTitle>
            <CardDescription>Manage your skills and technologies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add new technology..."
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTech()}
              />
              <Button onClick={addTech} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="gap-1">
                  {tech}
                  <button onClick={() => removeTech(tech)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feature Toggles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Feature Toggles
            </CardTitle>
            <CardDescription>Enable or disable portfolio sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(features).map(([feature, enabled]) => (
                <div key={feature} className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium capitalize">
                      {feature.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {feature === "blog" && "Show blog section on homepage"}
                      {feature === "testimonials" && "Display client testimonials"}
                      {feature === "contact" && "Enable contact form"}
                      {feature === "hireMeBanner" && "Show hire me banner"}
                      {feature === "analytics" && "Track page analytics"}
                    </p>
                  </div>
                  <Switch checked={enabled} onCheckedChange={() => toggleFeature(feature as keyof typeof features)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure email notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Contact Form Submissions</Label>
                <p className="text-sm text-muted-foreground">Get notified when someone submits the contact form</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Analytics Report</Label>
                <p className="text-sm text-muted-foreground">Receive weekly portfolio performance reports</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Manage admin access and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full bg-transparent">
              Change Admin Password
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Download Backup
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
