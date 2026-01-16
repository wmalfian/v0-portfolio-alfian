import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Code2, 
  Smartphone, 
  Database, 
  Layout, 
  Server, 
  GitBranch, 
  Terminal,
  Cpu
} from "lucide-react"

export function SkillsGrid() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code2 className="w-5 h-5 text-primary" />,
      // Added Python, C++, PHP, Visual Basic, MicroPython here
      skills: [
        "Java", "Python", "C++", "PHP", "Dart", "JavaScript", 
        "TypeScript", "Visual Basic", "MicroPython", "SQL", "HTML/CSS"
      ],
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="w-5 h-5 text-primary" />,
      // Updated to include Kotlin alongside Java
      skills: [
        "Flutter", "Android (Java/Kotlin)", "Google Maps API", 
        "Firebase Auth", "SQLite (Mobile)"
      ],
    },
    {
      title: "Web Development",
      icon: <Layout className="w-5 h-5 text-primary" />,
      skills: [
        "React", "Next.js", "Bootstrap 5", "Tailwind CSS", 
        "Java JSP & Servlets", "PHP (Web)"
      ],
    },
    {
      title: "Backend & Database",
      icon: <Server className="w-5 h-5 text-primary" />,
      // Added Oracle Database here
      skills: [
        "MySQL", "Oracle Database", "Firebase Firestore", 
        "Docker", "Railway Deployment", "JDBC", "Git"
      ],
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {skillCategories.map((category, index) => (
        <Card 
          key={index} 
          className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50"
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {category.icon}
              </div>
              {category.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary"
                  className="hover:scale-105 transition-transform cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}