'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import BeforeSection from './before/BeforeSection'
import DuringSection from './during/DuringSection'
import AfterSection from './after/AfterSection'
import { useLoadingOverlay } from '@/context/LoadingOverlayContext'

export default function PresentationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lastSelected = useRef<'before' | 'during' | 'after' | null>(null)
  const [selected, setSelected] = useState<'before' | 'during' | 'after' | null>('before')
  const [canChangeSection, setCanChangeSection] = useState(true)
  const [isNavbarChanged, setIsNavbarChanged] = useState(false)
  const { show, hide } = useLoadingOverlay()


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
    if (!lastSelected.current) {
      show();
      document.body.style.overflow = 'hidden'
      lastSelected.current = selected;
      setTimeout(() => {
        hide();
        document.body.style.overflow = '' // Restore scroll
      }, 1600);
    } else {
      if (!selected) return;
      const direction = !isNavbarChanged ? getScrollDirection(lastSelected.current, selected) : 'forward';
      const target = document.getElementById(`${selected}-section`);
      lastSelected.current = selected;

      if (!target) return;

      show(); // Affiche l'overlay
      document.body.style.overflow = 'hidden'

      // Attends un peu pour que l'overlay apparaisse avant de scroller
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: direction === 'forward' ? 'start' : 'end',
        });

        // Cache l'overlay après un délai suffisant pour couvrir le scroll
        setTimeout(() => {
          hide();
          setIsNavbarChanged(false);
          setCanChangeSection(true);
          document.body.style.overflow = '' // Restore scroll

        }, 1600); // ajuste en fonction de ton scroll/transition
      }, 100); // petit délai pour éviter le "flash"
    }

  };


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
                onNext={() => {
                  if (!canChangeSection) return;
                  document.body.style.overflow = 'hidden'
                  setCanChangeSection(false);
                  setSelected('during')
                }}
              />
            )}
            {selected === 'during' && (
              <DuringSection
                onNext={() => {
                  if (!canChangeSection) return;
                  document.body.style.overflow = 'hidden'
                  setCanChangeSection(false);
                  setSelected('after')
                }}
                onBack={() => {
                  if (!canChangeSection) return;
                  document.body.style.overflow = 'hidden'
                  setCanChangeSection(false);
                  setSelected('before')
                }}
              />
            )}
            {selected === 'after' && (
              <AfterSection
                onBack={() => {
                  if (!canChangeSection) return;
                  document.body.style.overflow = 'hidden'
                  setCanChangeSection(false);
                  setSelected('during')
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom navbar with animated presence */}
      <AnimatePresence>
        <motion.div
          key="navbar"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-2 left-0 w-full z-50 flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto">
            <Navbar onSelect={setSelected} selected={selected} canChangeSection={canChangeSection} onChangeSection={setCanChangeSection} onNavbarChanged={setIsNavbarChanged} />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
