'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import BeforeSection from './before/BeforeSection'
import DuringSection from './during/DuringSection'
import AfterSection from './after/AfterSection'
import { useLoadingOverlay } from '@/context/LoadingOverlayContext'

export default function PresentationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lastSelected = useRef<'before' | 'during' | 'after' | null>(null)
  const [inView, setInView] = useState(false)
  const [selected, setSelected] = useState<'before' | 'during' | 'after' | null>(null)
  const isProgrammaticScroll = useRef(false)

  const { show, hide } = useLoadingOverlay()
  const navbarVisible = inView || selected !== null

  // Observe the main section to toggle navbar visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Determines whether we're moving forward or backward in section flow
  function getScrollDirection(
    from: string | null,
    to: string
  ): 'forward' | 'backward' {
    const order = ['before', 'during', 'after']
    if (!from) return 'forward'
    return order.indexOf(to) > order.indexOf(from) ? 'forward' : 'backward'
  }

  // Handles scroll and overlay transition after section animation
  const handleAfterAnimate = () => {
    if (!selected) return

    const direction = getScrollDirection(lastSelected.current, selected)
    const target = document.getElementById(`${selected}-section`)
    lastSelected.current = selected

    if (!target) return

    isProgrammaticScroll.current = true
    show() // Show loading overlay

    // Wait for fade-in (loader transition)
    setTimeout(() => {
      hide() // Hide loader

      // Delay before scrolling to ensure DOM is updated
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: direction === 'forward' ? 'start' : 'end',
        })
      }, 200)

      // Disable programmatic scroll flag after 5 seconds
      setTimeout(() => {
        isProgrammaticScroll.current = false
      }, 5000)
    }, 600) // Total duration of the transition overlay
  }

  return (
    <section ref={sectionRef} className="relative">
      {/* Section content rendering with transition */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onAnimationComplete={handleAfterAnimate}
          >
            {selected === 'before' && (
              <BeforeSection
                isProgrammaticScroll={isProgrammaticScroll}
                onNext={() => setSelected('during')}
              />
            )}
            {selected === 'during' && (
              <DuringSection
                isProgrammaticScroll={isProgrammaticScroll}
                onNext={() => setSelected('after')}
                onBack={() => setSelected('before')}
              />
            )}
            {selected === 'after' && (
              <AfterSection
                isProgrammaticScroll={isProgrammaticScroll}
                onBack={() => setSelected('during')}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom navbar with animated presence */}
      <AnimatePresence>
        {navbarVisible && (
          <motion.div
            key="navbar"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-2 left-0 w-full z-50 flex justify-center pointer-events-none"
          >
            <div className="pointer-events-auto">
              <Navbar onSelect={setSelected} selected={selected} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
