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
  Menu,
  X,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed nav height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="font-mono text-lg font-bold text-primary cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            {"wmalfian"}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 relative ${
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="mb-6 sm:mb-8">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-1 hover-lift">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                    <img
                      src="/professional-headshot-of-computer-science-student.jpg"
                      alt="Profile Picture"
                      className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              <div className="inline-block p-3 sm:p-4 rounded-full bg-primary/10 mb-4 sm:mb-6 hover-lift">
                <Code2 className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
                Wan Mohd Alfian Bin Wan Azman
                <span className="text-primary block">Student & Developer</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 text-pretty px-4 sm:px-0">
                Passionate about creating innovative solutions through clean code, advanced algorithms, and cutting-edge
                technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="group hover-lift w-full sm:w-auto"
              >
                View My Work
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group bg-transparent hover-lift w-full sm:w-auto">
                <Download className="mr-2 w-4 h-4" />
                Download Resume
              </Button>
            </div>

            <div className="flex justify-center space-x-4 sm:space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:scale-110 transition-all duration-300"
                asChild
              >
                <a href="https://github.com/wmalfian" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:scale-110 transition-all duration-300"
                asChild
              >
                <a href="https://linkedin.com/in/wmalfian" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:scale-110 transition-all duration-300"
                asChild
              >
                <a href="mailto:s70315@ocean.umt.edu.my">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:text-primary transition-colors cursor-pointer"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-muted/30 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border border-primary rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-secondary rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-primary rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
              About <span className="text-primary">Me</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="hover-lift order-2 md:order-1">
                <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                    <Terminal className="w-16 h-16 sm:w-24 sm:h-24 text-primary" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 order-1 md:order-2">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  I'm a dedicated Computer Science student with a passion for solving complex problems through elegant
                  code. My journey in programming started with curiosity and has evolved into a deep appreciation for
                  software architecture, algorithms, and system design.
                </p>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Currently pursuing my degree while working on challenging projects that span full-stack development,
                  machine learning, and distributed systems. I believe in writing clean, maintainable code and following
                  industry best practices.
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {["Problem Solving", "System Design", "Clean Code", "Team Collaboration"].map((trait) => (
                    <Badge
                      key={trait}
                      variant="secondary"
                      className="px-3 py-1 hover:scale-105 transition-transform cursor-default text-xs sm:text-sm"
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
      <section id="projects" className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg px-4 sm:px-0">
              A showcase of my technical skills and problem-solving abilities
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

            <div className="text-center mt-8 sm:mt-12">
              <Button variant="outline" size="lg" className="group bg-transparent hover-lift">
                View All Projects
                <Github className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
              Technical <span className="text-primary">Skills</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg px-4 sm:px-0">
              Technologies and tools I work with
            </p>

            <SkillsGrid />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg px-4 sm:px-0">
              Let's discuss opportunities, collaborations, or just connect!
            </p>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              <div className="space-y-6 sm:space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Mail className="w-5 h-5 text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href="mailto:s70315@ocean.umt.edu.my"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base break-all"
                    >
                      s70315@ocean.umt.edu.my
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Github className="w-5 h-5 text-primary" />
                      GitHub
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href="https://github.com/wmalfian"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base break-all"
                    >
                      github.com/wmalfian
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Linkedin className="w-5 h-5 text-primary" />
                      LinkedIn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href="https://linkedin.com/in/wmalfian"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base break-all"
                    >
                      linkedin.com/in/wmalfian
                    </a>
                  </CardContent>
                </Card>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm sm:text-base">© 2025 wmalfian Portfolio.</p>
        </div>
      </footer>
    </div>
  )
}
