"use client"

import { useEffect, useRef } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingShapes } from "@/components/floating-shapes"

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const description = descriptionRef.current
    const button = buttonRef.current

    if (title) {
      title.style.opacity = "0"
      title.style.transform = "translateY(20px)"
      setTimeout(() => {
        title.style.transition = "opacity 0.8s ease, transform 0.8s ease"
        title.style.opacity = "1"
        title.style.transform = "translateY(0)"
      }, 100)
    }

    if (description) {
      description.style.opacity = "0"
      description.style.transform = "translateY(20px)"
      setTimeout(() => {
        description.style.transition = "opacity 0.8s ease, transform 0.8s ease"
        description.style.opacity = "1"
        description.style.transform = "translateY(0)"
      }, 300)
    }

    if (button) {
      button.style.opacity = "0"
      button.style.transform = "translateY(20px)"
      setTimeout(() => {
        button.style.transition = "opacity 0.8s ease, transform 0.8s ease"
        button.style.opacity = "1"
        button.style.transform = "translateY(0)"
      }, 500)
    }
  }, [])

  const scrollToExperience = () => {
    const experienceSection = document.getElementById("experience")
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="min-h-screen relative flex flex-col justify-center items-center text-center pt-16">
       <FloatingShapes />
       
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent"
        >
          Desarrollador Full Stack
        </h1>
        <p ref={descriptionRef} className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        ¡Bienvenidos a mi portafolio!
        Me impulsa trabajar en proyectos desafiantes, aportando soluciones sólidas y eficientes. Me actualizo constantemente, priorizando la calidad, el rendimiento y la confiabilidad en cada desarrollo.
        </p>
        <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={scrollToExperience}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300 flex items-center gap-2"
          >
            Ver mi trabajo
            {/* <ArrowDown size={16} /> */}
          </Button>
          <Button
            onClick={() => {
              const contactSection = document.getElementById("contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
            variant="outline"
            className="border-blue-600 text-blue-500 hover:bg-blue-600/10 px-6 py-2 rounded-md transition-colors duration-300"
          >
            Contactar
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ArrowDown className="text-blue-500" size={24} />
      </div>
    </section>
  )
}
