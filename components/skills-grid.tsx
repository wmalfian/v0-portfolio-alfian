import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, Globe, Server, Smartphone, Brain, GitBranch, Shield } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code2 className="w-6 h-6" />,
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C++", "Go", "Rust"],
  },
  {
    title: "Frontend Development",
    icon: <Globe className="w-6 h-6" />,
    skills: ["React", "Next.js", "Vue.js", "Tailwind CSS", "HTML5", "CSS3", "SASS"],
  },
  {
    title: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    skills: ["Node.js", "Express", "FastAPI", "Django", "Spring Boot", "GraphQL"],
  },
  {
    title: "Databases",
    icon: <Database className="w-6 h-6" />,
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "SQLite", "Elasticsearch"],
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="w-6 h-6" />,
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
  },
  {
    title: "AI & Machine Learning",
    icon: <Brain className="w-6 h-6" />,
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI API", "Hugging Face"],
  },
  {
    title: "DevOps & Tools",
    icon: <GitBranch className="w-6 h-6" />,
    skills: ["Docker", "Kubernetes", "AWS", "Git", "CI/CD", "Linux", "Nginx"],
  },
  {
    title: "Security & Testing",
    icon: <Shield className="w-6 h-6" />,
    skills: ["Jest", "Cypress", "OAuth", "JWT", "Penetration Testing", "OWASP"],
  },
]

export function SkillsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {skillCategories.map((category, index) => (
        <Card key={category.title} className="group hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {category.icon}
              </div>
              <h3 className="font-semibold text-sm text-balance">{category.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
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
