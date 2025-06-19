'use client'

import { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollVideoSection from './ScrollVideoSection'
import Overlay from './Overlay'
import BeforeSection from './BeforeSection'
import DuringSection from './DuringSection'
import AfterSection from './AfterSection'

export default function PresentationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollTargetRef = useRef<HTMLDivElement>(null) // 👈 Ref pour scroll
  const [inView, setInView] = useState(false)
  const [selected, setSelected] = useState<'before' | 'during' | 'after' | null>(null)

  const navbarVisible = inView || selected !== null

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Scroll automatique après changement de section
  useEffect(() => {
    if (selected && scrollTargetRef.current) {
      setTimeout(() => {
        scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 50) // petit délai pour laisser le DOM se mettre à jour
    }
  }, [selected])

  return (
    <section ref={sectionRef} className="relative">
      {/* SECTION VIDEO */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            ref={scrollTargetRef} // 👈 Ref ici
            key={selected}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {selected === 'before' && <BeforeSection />}
            {selected === 'during' && <DuringSection />}
            {selected === 'after' && <AfterSection />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR FIXED MAIS AFFICHÉE SI DANS LA SECTION OU UNE SECTION EST SÉLECTIONNÉE */}
      <AnimatePresence>
        {navbarVisible && (
          <motion.div
            key="navbar"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-0 w-full z-50 flex justify-center pointer-events-none"
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
