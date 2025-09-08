"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectCard } from "@/components/project-card"
import { SkillsGrid } from "@/components/skills-grid"
import { ContactForm } from "@/components/contact-form"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Globe,
  Terminal,
  ChevronDown,
  Download,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-mono text-lg font-bold text-primary">{"wmalfian"}</div>

          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: "hero", label: "Home" },
              { id: "about", label: "About" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-1 hover-lift">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                    <img
                      src="/professional-headshot-of-computer-science-student.jpg"
                      alt="Profile Picture"
                      className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              <div className="inline-block p-4 rounded-full bg-primary/10 mb-6 hover-lift">
                <Code2 className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Computer Science
                <span className="text-primary block">Student & Developer</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">
                Passionate about creating innovative solutions through clean code, advanced algorithms, and cutting-edge
                technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" onClick={() => scrollToSection("projects")} className="group hover-lift">
                View My Work
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group bg-transparent hover-lift">
                <Download className="mr-2 w-4 h-4" />
                Download Resume
              </Button>
            </div>

            <div className="flex justify-center space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border border-primary rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-secondary rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-primary rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              About <span className="text-primary">Me</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="hover-lift">
                <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                    <Terminal className="w-24 h-24 text-primary" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a dedicated Computer Science student with a passion for solving complex problems through elegant
                  code. My journey in programming started with curiosity and has evolved into a deep appreciation for
                  software architecture, algorithms, and system design.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Currently pursuing my degree while working on challenging projects that span full-stack development,
                  machine learning, and distributed systems. I believe in writing clean, maintainable code and following
                  industry best practices.
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {["Problem Solving", "System Design", "Clean Code", "Team Collaboration"].map((trait) => (
                    <Badge
                      key={trait}
                      variant="secondary"
                      className="px-3 py-1 hover:scale-105 transition-transform cursor-default"
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              A showcase of my technical skills and problem-solving abilities
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title="Distributed Task Scheduler"
                description="A scalable microservices-based task scheduling system built with Node.js, Redis, and Docker. Features load balancing, fault tolerance, and real-time monitoring."
                technologies={["Node.js", "Redis", "Docker", "TypeScript"]}
                githubUrl="#"
                liveUrl="#"
                icon={<Database className="w-6 h-6" />}
                imageUrl="/distributed-system-architecture-diagram.jpg"
              />

              <ProjectCard
                title="AI-Powered Code Reviewer"
                description="Machine learning application that analyzes code quality, suggests improvements, and detects potential bugs using natural language processing."
                technologies={["Python", "TensorFlow", "FastAPI", "React"]}
                githubUrl="#"
                liveUrl="#"
                icon={<Code2 className="w-6 h-6" />}
                imageUrl="/ai-code-analysis-interface.jpg"
              />

              <ProjectCard
                title="Real-time Collaboration Platform"
                description="Full-stack web application enabling real-time document collaboration with operational transformation, WebSocket connections, and conflict resolution."
                technologies={["React", "Socket.io", "MongoDB", "Express"]}
                githubUrl="#"
                liveUrl="#"
                icon={<Globe className="w-6 h-6" />}
                imageUrl="/real-time-collaboration-interface.jpg"
              />
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="group bg-transparent hover-lift">
                View All Projects
                <Github className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Technical <span className="text-primary">Skills</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Technologies and tools I work with</p>

            <SkillsGrid />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Let's discuss opportunities, collaborations, or just connect!
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">s70315@ocean.umt.edu.my</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Github className="w-5 h-5 text-primary" />
                      GitHub
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">github.com/wmalfian</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Linkedin className="w-5 h-5 text-primary" />
                      LinkedIn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">linkedin.com/in/wmalfian</p>
                  </CardContent>
                </Card>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 wmalfian Portfolio.
          </p>
        </div>
      </footer>
    </div>
  )
}
