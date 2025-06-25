'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollVideoSection from './ScrollVideoSection'
import type { ReactElement } from 'react'
import type { OverlayProps } from './Overlay'
gsap.registerPlugin(ScrollTrigger)

type FullScrollSectionProps = {
  videoSrc: string
  scrollSpeed?: number
  sectionId: string
  // Amélioration ici ↓
  overlays?: ReactElement<OverlayProps> | ReactElement<OverlayProps>[]

  // Ces deux props attendent des composants React, donc :
  introSection: ReactElement
  outroSection: ReactElement
}

export default function FullScrollSection({
  videoSrc,
  scrollSpeed = 400,
  sectionId,
  overlays,
  introSection,
  outroSection,
}: FullScrollSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [videoReady, setVideoReady] = useState(false)


  return (
    <section id={sectionId} ref={wrapperRef} className="relative bg-black text-white">
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
    </section>
  )
}
