"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef } from "react"
import { useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1.2, 1.2, 1.2],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const r = useSpring(0, {
    stiffness: 100,
    damping: 20,
    mass: 1,
  })

  const onRender = useCallback(
    (state: Record<string, any>) => {
      // This prevents rotation while dragging
      if (!pointerInteracting.current) {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = state.phi + 0.002
      }
      state.phi += r.get()
      state.width = 800
      state.height = 800
    },
    [r]
  )

  const onResize = () => {
    if (canvasRef.current) {
      const parent = canvasRef.current.parentElement
      if (parent) {
        const w = parent.offsetWidth
        canvasRef.current.width = w * 2
        canvasRef.current.height = w * 2
      }
    }
  }

  useEffect(() => {
    let width = 0
    if (canvasRef.current) {
      const parent = canvasRef.current.parentElement
      if (parent) {
        width = parent.offsetWidth
      }
    }

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    })

    window.addEventListener("resize", onResize)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div
      className={cn(
        "aspect-square w-full max-w-full",
        className
      )}
    >
      <canvas
        className={cn(
          "h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing"
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab"
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab"
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
            r.set(delta / 200)
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
            r.set(delta / 200)
          }
        }}
      />
    </div>
  )
}
