'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollVideoSection from './ScrollVideoSection'
import type { ReactElement } from 'react'
import type { OverlayProps } from './Overlay'
gsap.registerPlugin(ScrollTrigger)

type FullScrollSectionProps = {
  isProgrammaticScroll: React.RefObject<boolean>
  onScrollEnd?: () => void
  onScrollBack?: () => void
  videoSrc: string
  scrollSpeed?: number

  // Amélioration ici ↓
  overlays?: ReactElement<OverlayProps> | ReactElement<OverlayProps>[]

  // Ces deux props attendent des composants React, donc :
  introSection: ReactElement
  outroSection: ReactElement
}

export default function FullScrollSection({
  isProgrammaticScroll,
  onScrollEnd,
  onScrollBack,
  videoSrc,
  scrollSpeed = 400,
  overlays,
  introSection,
  outroSection,
}: FullScrollSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  // Initialisation de ScrollTrigger
  useEffect(() => {
    if (!videoReady || !wrapperRef.current) return

    const el = wrapperRef.current
    let hasFiredEnd = false
    let hasFiredBack = false

    triggerRef.current = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      markers: false,
      onUpdate: (self) => {
        if (isProgrammaticScroll.current) return

        const progress = self.progress

        if (progress > 0.99 && !hasFiredEnd) {
          hasFiredEnd = true
          hasFiredBack = false
          onScrollEnd?.()
        }

        if (progress < 0.01 && !hasFiredBack) {
          hasFiredBack = true
          hasFiredEnd = false
          onScrollBack?.()
        }
      },
    })

    ScrollTrigger.refresh()

    return () => {
      triggerRef.current?.kill()
    }
  }, [videoReady, onScrollEnd, onScrollBack])

  // Gestion du flag programmatique
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!triggerRef.current) return

    if (isProgrammaticScroll.current) {
      triggerRef.current.disable()
    } else {
      setTimeout(() => {
        triggerRef.current?.enable()
        ScrollTrigger.refresh()
      }, 300)
    }
  }, [isProgrammaticScroll.current])

  return (
    <div ref={wrapperRef} className="relative bg-black text-white">
      {/* Section Intro */}
      {introSection}

      {/* Vidéo scrollable */}
      <ScrollVideoSection
        src={videoSrc}
        scrollSpeed={scrollSpeed}
        activateTriggers={videoReady}
        onReady={() => setVideoReady(true)}
      >
        {overlays}
      </ScrollVideoSection>

      {/* Section Outro */}
      {outroSection}
    </div>
  )
}
