"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function FloatingShapes() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const shapes = [
    {
      id: 1,
      type: "circle",
      size: "w-20 h-20",
      color: "bg-blue-500/10",
      initialX: "10%",
      initialY: "20%",
      duration: 20,
    },
    {
      id: 2,
      type: "square",
      size: "w-16 h-16",
      color: "bg-blue-400/15",
      initialX: "80%",
      initialY: "30%",
      duration: 25,
    },
    {
      id: 3,
      type: "triangle",
      size: "w-12 h-12",
      color: "bg-blue-300/20",
      initialX: "20%",
      initialY: "70%",
      duration: 18,
    },
    {
      id: 4,
      type: "circle",
      size: "w-8 h-8",
      color: "bg-blue-600/25",
      initialX: "70%",
      initialY: "60%",
      duration: 22,
    },
    {
      id: 5,
      type: "hexagon",
      size: "w-14 h-14",
      color: "bg-blue-500/12",
      initialX: "90%",
      initialY: "80%",
      duration: 28,
    },
    {
      id: 6,
      type: "square",
      size: "w-10 h-10",
      color: "bg-blue-400/18",
      initialX: "15%",
      initialY: "40%",
      duration: 24,
    },
  ]

  const getShapeElement = (shape: any) => {
    const baseClasses = `${shape.size} ${shape.color} absolute`

    switch (shape.type) {
      case "circle":
        return <div className={`${baseClasses} rounded-full`} />
      case "square":
        return <div className={`${baseClasses} rounded-lg rotate-45`} />
      case "triangle":
        return (
          <div
            className={`${baseClasses} bg-transparent`}
            style={{
              width: 0,
              height: 0,
              borderLeft: "24px solid transparent",
              borderRight: "24px solid transparent",
              borderBottom: "48px solid rgba(59, 130, 246, 0.2)",
            }}
          />
        )
      case "hexagon":
        return (
          <div className={`${baseClasses} bg-transparent`}>
            <div
              className="w-full h-full"
              style={{
                background: "rgba(59, 130, 246, 0.12)",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            />
          </div>
        )
      default:
        return <div className={`${baseClasses} rounded-full`} />
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.initialX,
            top: shape.initialY,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: shape.id * 2,
          }}
        >
          {getShapeElement(shape)}
        </motion.div>
      ))}

      {/* Formas adicionales más pequeñas */}
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`small-${index}`}
          className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 1.5,
          }}
        />
      ))}
    </div>
  )
}
