"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  type: "circle" | "ring" | "dot"
}

export function BubbleEffects() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const newElements: FloatingElement[] = []
    
    // Create soft floating circles
    for (let i = 0; i < 12; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 300 + 100,
        duration: Math.random() * 30 + 20,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.04 + 0.02,
        type: "circle",
      })
    }
    
    // Create decorative rings
    for (let i = 12; i < 18; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 150 + 80,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.06 + 0.02,
        type: "ring",
      })
    }
    
    // Create small dots
    for (let i = 18; i < 30; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.15 + 0.05,
        type: "dot",
      })
    }
    
    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Animated elements */}
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float-gentle"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: el.type === "dot" ? `${el.size}px` : `${el.size}px`,
            height: el.type === "dot" ? `${el.size}px` : `${el.size}px`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === "circle" && (
            <div 
              className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 blur-3xl"
              style={{ opacity: el.opacity }}
            />
          )}
          {el.type === "ring" && (
            <div 
              className="w-full h-full rounded-full border-2 border-primary/10"
              style={{ opacity: el.opacity }}
            />
          )}
          {el.type === "dot" && (
            <div 
              className="w-full h-full rounded-full bg-primary"
              style={{ opacity: el.opacity }}
            />
          )}
        </div>
      ))}
      
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
    </div>
  )
}
