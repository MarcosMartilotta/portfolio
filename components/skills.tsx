"use client"

import { useEffect } from "react"

import { useState } from "react"

import type React from "react"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Code, Server, Database, Layout } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface SkillCategory {
  name: string
  icon: React.ReactNode
  skills: string[]
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 })

  const skillCategories: SkillCategory[] = [
    {
      name: "Tecnologías",
      icon: <Code className="h-6 w-6 text-blue-500" />,
      skills: ["PHP", "SQL", "JavaScript", "HTML", "CSS"],
    },
    {
      name: "Backend & Bases de Datos",
      icon: <Database className="h-6 w-6 text-blue-500" />,
      skills: ["MySQL", "MongoDB", "Supabase", "API REST"],
    },
    {
      name: "Frameworks & Librerías",
      icon: <Layout className="h-6 w-6 text-blue-500" />,
      skills: ["React", "Next.js", "React Native", "Laravel", "Tailwind CSS", "Bootstrap", "Shadcn", "Styled Components", "Apex Charts", "TcPdf", ],
    },
    {
      name: "DevOps & Automatización & Herramientas",
      icon: <Server className="h-6 w-6 text-blue-500" />,
      skills: ["Docker", "Git", "GitHub", "VPS", "Linux", "n8n", "ChatGPT", "GitHub Copilot", "Cursor"],
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Habilidades</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 h-full hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {category.icon}
                    <h3 className="text-xl font-semibold ml-2 text-gray-900 dark:text-white">{category.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <SkillBadge key={i} name={skill} index={i} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillBadge({ name, index }: { name: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-600/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
    >
      {name}
    </motion.span>
  )
}

function useIntersectionObserver(ref: React.RefObject<Element>, options: IntersectionObserverInit = {}): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isIntersecting
}
