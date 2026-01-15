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
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => new Set([...prev, entry.target.id]))
        }
      })
    }, observerOptions)

    const elementsToObserve = [
      "hero",
      "about",
      "projects",
      "skills",
      "contact",
      "about-content",
      "about-image",
      "projects-grid",
      "skills-content",
      "contact-info",
      "contact-form",
    ]

    elementsToObserve.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

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

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
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
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50 animate-slide-down">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="font-mono text-lg font-bold text-primary cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => scrollToSection("hero")}
          >
            {"wmalfian"}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 relative animate-fade-in ${
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full animate-scale-x"></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:rotate-180 transition-transform duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border animate-slide-down">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 hover:translate-x-2 animate-fade-in ${
                    activeSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-gradient"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in-up">
              <div className="mb-6 sm:mb-8">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-1 hover-lift animate-scale-in">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                    <img
                      src="profile.png"
                      alt="Profile Picture"
                      className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance leading-tight animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                Wan Mohd Alfian Bin Wan Azman
                <span className="text-primary block animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                  Student & Developer
                </span>
              </h1>
              <p
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 text-pretty px-4 sm:px-0 animate-fade-in-up"
                style={{ animationDelay: "600ms" }}
              >
                Passionate about creating innovative solutions through clean code, advanced algorithms, and cutting-edge
                technology.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0 animate-fade-in-up"
              style={{ animationDelay: "800ms" }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="group hover-lift w-full sm:w-auto hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                View My Work
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group bg-transparent hover-lift w-full sm:w-auto hover:shadow-lg transition-all duration-300"
              >
                <Download className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                Download Resume
              </Button>
            </div>

            <div
              className="flex justify-center space-x-4 sm:space-x-6 animate-fade-in-up"
              style={{ animationDelay: "1000ms" }}
            >
              {[
                { icon: Github, href: "https://github.com/wmalfian" },
                { icon: Linkedin, href: "https://linkedin.com/in/wmalfian" },
                // Mail button removed
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary hover:scale-125 hover:rotate-12 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                  asChild
                  style={{ animationDelay: `${1200 + index * 100}ms` }}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow hover:text-primary transition-colors cursor-pointer hover:scale-125 transition-all duration-300"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
        </button>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-16 sm:py-20 bg-muted/30 relative transition-all duration-1000 ${
          visibleElements.has("about") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border border-primary rounded-full animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-secondary rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-primary rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 transition-all duration-1000 ${
                visibleElements.has("about") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              About <span className="text-primary">Me</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div
                id="about-image"
                className={`hover-lift order-2 md:order-1 transition-all duration-1000 delay-300 ${
                  visibleElements.has("about-image") ? "animate-fade-in-left" : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center relative overflow-hidden hover:rotate-6 transition-transform duration-500">
                  <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                    <Terminal className="w-16 h-16 sm:w-24 sm:h-24 text-primary animate-pulse" />
                  </div>
                </div>
              </div>

              <div
                id="about-content"
                className={`space-y-4 sm:space-y-6 order-1 md:order-2 transition-all duration-1000 delay-500 ${
                  visibleElements.has("about-content") ? "animate-fade-in-right" : "opacity-0 translate-x-10"
                }`}
              >
                <p
                  className="text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: "200ms" }}
                >
                  I'm a dedicated Computer Science student with a passion for solving complex problems through elegant
                  code. My journey in programming started with curiosity and has evolved into a deep appreciation for
                  software architecture, algorithms, and system design.
                </p>

                <p
                  className="text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: "400ms" }}
                >
                  Currently pursuing my degree while working on challenging projects that span full-stack development,
                  machine learning, and distributed systems. I believe in writing clean, maintainable code and following
                  industry best practices.
                </p>

                <div className="flex flex-wrap gap-2 pt-4 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
                  {["Problem Solving", "System Design", "Clean Code", "Team Collaboration"].map((trait, index) => (
                    <Badge
                      key={trait}
                      variant="secondary"
                      className="px-3 py-1 hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default text-xs sm:text-sm animate-fade-in-up"
                      style={{ animationDelay: `${800 + index * 100}ms` }}
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
      <section
        id="projects"
        className={`py-16 sm:py-20 transition-all duration-1000 ${
          visibleElements.has("projects") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-1000 ${
                visibleElements.has("projects") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p
              className={`text-center text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg px-4 sm:px-0 transition-all duration-1000 delay-200 ${
                visibleElements.has("projects") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              A showcase of my technical skills and problem-solving abilities
            </p>

            <div
              id="projects-grid"
              className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 delay-400 ${
                visibleElements.has("projects-grid") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              {[
                {
                  title: "Distributed Task Scheduler",
                  description:
                    "A scalable microservices-based task scheduling system built with Node.js, Redis, and Docker. Features load balancing, fault tolerance, and real-time monitoring.",
                  technologies: ["Node.js", "Redis", "Docker", "TypeScript"],
                  icon: <Database className="w-6 h-6" />,
                  imageUrl: "/distributed-system-architecture-diagram.jpg",
                },
                {
                  title: "AI-Powered Code Reviewer",
                  description:
                    "Machine learning application that analyzes code quality, suggests improvements, and detects potential bugs using natural language processing.",
                  technologies: ["Python", "TensorFlow", "FastAPI", "React"],
                  icon: <Code2 className="w-6 h-6" />,
                  imageUrl: "/ai-code-analysis-interface.jpg",
                },
                {
                  title: "Real-time Collaboration Platform",
                  description:
                    "Full-stack web application enabling real-time document collaboration with operational transformation, WebSocket connections, and conflict resolution.",
                  technologies: ["React", "Socket.io", "MongoDB", "Express"],
                  icon: <Globe className="w-6 h-6" />,
                  imageUrl: "/real-time-collaboration-interface.jpg",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${400 + index * 200}ms` }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    githubUrl="#"
                    liveUrl="#"
                    icon={project.icon}
                    imageUrl={project.imageUrl}
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12 animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
              <Button
                variant="outline"
                size="lg"
                className="group bg-transparent hover-lift hover:shadow-lg transition-all duration-300"
              >
                View All Projects
                <Github className="ml-2 w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-16 sm:py-20 bg-muted/30 transition-all duration-1000 ${
          visibleElements.has("skills") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-1000 ${
                visibleElements.has("skills") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              Technical <span className="text-primary">Skills</span>
            </h2>
            <p
              className={`text-center text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg px-4 sm:px-0 transition-all duration-1000 delay-200 ${
                visibleElements.has("skills") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              Technologies and tools I work with
            </p>

            <div
              id="skills-content"
              className={`transition-all duration-1000 delay-400 ${
                visibleElements.has("skills-content") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              <SkillsGrid />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-16 sm:py-20 transition-all duration-1000 ${
          visibleElements.has("contact") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-1000 ${
                visibleElements.has("contact") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p
              className={`text-center text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg px-4 sm:px-0 transition-all duration-1000 delay-200 ${
                visibleElements.has("contact") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              Let's discuss opportunities, collaborations, or just connect!
            </p>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              <div
                id="contact-info"
                className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-400 ${
                  visibleElements.has("contact-info") ? "animate-fade-in-left" : "opacity-0 -translate-x-10"
                }`}
              >
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    content: "wmalfian@gmail.com",
                    href: "mailto:wmalfian@gmail.com",
                  },
                  {
                    icon: Github,
                    title: "GitHub",
                    content: "github.com/wmalfian",
                    href: "https://github.com/wmalfian",
                  },
                  {
                    icon: Linkedin,
                    title: "LinkedIn",
                    content: "linkedin.com/in/wmalfian",
                    href: "https://linkedin.com/in/wmalfian",
                  },
                ].map((contact, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <contact.icon className="w-5 h-5 text-primary" />
                        {contact.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <a
                        href={contact.href}
                        target={contact.href.startsWith("http") ? "_blank" : undefined}
                        rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base break-all hover:underline"
                      >
                        {contact.content}
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div
                id="contact-form"
                className={`transition-all duration-1000 delay-600 ${
                  visibleElements.has("contact-form") ? "animate-fade-in-right" : "opacity-0 translate-x-10"
                }`}
              >
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 sm:py-8 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm sm:text-base">© 2025 wmalfian Portfolio.</p>
        </div>
      </footer>
    </div>
  )
}
