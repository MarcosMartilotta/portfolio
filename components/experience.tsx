"use client"

import { useState } from "react"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Calendar, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string[]
  technologies: string[]
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 })

  const experiences: ExperienceItem[] = [
    {
      title: "Full Stack Developer • Project Leader",
      company: "Fersys",
      period: "08/2023 - Present",
      description: [
        "Lideré y gestioné proyectos de desarrollo end-to-end con stack LAMP.",
        "Desarrollé soluciones a medida entendiendo necesidades reales de clientes (SaaS, RRHH, seguros, salud).",
        "Integré APIs de terceros como ser Twilio, MercadoPago, OpenStreetMap, etc.",
        "Aseguré calidad, escalabilidad y mantenimiento continuo del código.",
        "Implementé sistemas con web scraping, ZPL, notificaciones y control de inventario.",
        "Realicé presentaciones a clientes y configuraciones de infraestructura con VPS y Docker.",
        "Trabajo bajo metodologías ágiles (Scrum / Kanban).",
      ],
      technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "Bootstrap", "jQuery", "Docker", "n8n"],
    },
    {
      title: "Front End Developer",
      company: "NoCountry",
      period: "05/2023 - 08/2023",
      description: [
        "Construí plataformas web con MERN para gestión de citas para farmacias y gestión de laboratorios.",
        "Colaboré en equipos ágiles con Scrum.",
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "HTML", "CSS"],
    }
  ]

  return (
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Experiencia</span>
        </h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {exp.title}
                    </CardTitle>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar size={16} className="mr-1" />
                      {exp.period}
                    </div>
                  </div>
                  <div className="flex items-center text-blue-500 mt-1">
                    <Briefcase size={16} className="mr-2" />
                    <span className="font-medium">{exp.company}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                      >
                        {tech}
                      </span>
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
