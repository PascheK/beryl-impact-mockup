'use client'

import { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

type ScrollSectionTriggerProps = {
  onTrigger: () => void
  text: string
  direction?: 'down' | 'up' // ← par défaut: 'down'
}

export default function ScrollSectionTrigger({
  onTrigger,
  text,
  direction = 'down',
}: ScrollSectionTriggerProps) {
  const triggerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!triggerRef.current) return

    let trigger: ScrollTrigger | null = null

    const rafId = requestAnimationFrame(() => {
      trigger = ScrollTrigger.create({
        trigger: triggerRef.current!,
        start: direction === 'down' ? 'center center' : 'center center',
        onEnter: () => direction === 'down' && onTrigger(),
        onLeaveBack: () => direction === 'up' && onTrigger(),
      })
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 50)
    })

    return () => {
      cancelAnimationFrame(rafId)
      trigger?.kill()
    }
  }, [onTrigger, direction])



  const Icon = direction === 'down' ? ChevronDown : ChevronUp

  return (
    <div
      ref={triggerRef}
      className="relative w-full min-h-screen flex items-center justify-center z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: direction === 'down' ? -20 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: direction === 'down' ? 20 : -20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-black/70 text-white px-8 py-5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-4 text-center max-w-[90%] md:max-w-[60%]"
      >
        <span className="text-lg md:text-xl font-semibold leading-snug">{text}</span>
        <motion.div
          animate={{
            y: direction === 'down' ? [0, 10, 0] : [0, -10, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon className="w-6 h-6 md:w-7 md:h-7" />
        </motion.div>
      </motion.div>
    </div>
  )
}
