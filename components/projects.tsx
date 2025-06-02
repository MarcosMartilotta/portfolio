"use client"

import { useState } from "react"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectItem {
  title: string
  description: string[]
  technologies: string[]
  image: string
  href: string
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 })

  const projects: ProjectItem[] = [
    {
      title: "Bot de Alquileres",
      description: [
        "Creación de pagina para el proyecto Bot de alquileres, una herramienta para concoer el mejor precio tus alquileres en vista diariamente",
      ],
      image: "/images/logoHeader-bg.png",
      href: "https://bot-alquileres-b877.vercel.app",
      technologies: ["Next.js", "DaisyUI", "TailwindCSS", "vercel"],
    },
      {
      title: "Bot de Alquileres",
      description: [
        "Creación de pagina para el proyecto Bot de alquileres, una herramienta para concoer el mejor precio tus alquileres en vista diariamente",
      ],
      image: "/images/logoHeader-bg.png",
      href: "https://bot-alquileres-b877.vercel.app",
      technologies: ["Next.js", "DaisyUI", "TailwindCSS", "vercel"],
    },
      {
      title: "Bot de Alquileres",
      description: [
        "Creación de pagina para el proyecto Bot de alquileres, una herramienta para concoer el mejor precio tus alquileres en vista diariamente",
      ],
      image: "/images/logoHeader-bg.png",
      href: "https://bot-alquileres-b877.vercel.app",
      technologies: ["Next.js", "DaisyUI", "TailwindCSS", "vercel"],
    }
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Proyectos</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projects.map((pro, index) => (
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
                      {pro.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative w-100 h-40 rounded-lg overflow-hidden group">
                    <Image
                      className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform-filter duration-300 group-hover:scale-105 group-hover:blur" // Use group-hover
                      onClick={() => window.open(pro.href, "_blank")}
                      alt={pro.title}
                      width={400}
                      height={300}
                      src={pro.image}
                    />
                    {/* Description overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg cursor-pointer"
                         onClick={() => window.open(pro.href, "_blank")}> {/* Make overlay clickable */}
                      <ul className="space-y-1 text-white text-sm text-center"> {/* Adjust text styles as needed */}
                        {pro.description.map((item, i) => (
                          <li key={i} className="flex items-start justify-center"> {/* Centered list items */}
                            <span className="text-blue-300 mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Technologies remain outside the image area */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {pro.technologies.map((tech, i) => (
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

function useIntersectionObserver(
  ref: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
): boolean {
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
