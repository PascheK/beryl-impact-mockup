'use client'

import { useEffect, useRef, useState, ReactElement, Children, cloneElement, isValidElement } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { OverlayProps } from './Overlay'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  src: string
  scrollSpeed?: number
  children?: ReactElement<OverlayProps> | ReactElement<OverlayProps>[]
}

export default function ScrollVideoSection({
  src,
  scrollSpeed = 400,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(1100)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    let tween: gsap.core.Tween | null = null

    const onLoadedMetadata = () => {
      const duration = video.duration
      const calculatedHeight = duration * scrollSpeed
      setScrollHeight(calculatedHeight)

      // Kill existing ScrollTrigger (important!)
      ScrollTrigger.getAll().forEach(t => t.kill())

      tween = gsap.to(video, {
        currentTime: duration,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${calculatedHeight}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: () => setCurrentTime(video.currentTime),
        },
      })

      ScrollTrigger.refresh()
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)

    // Reset scroll position for clean transitions
    video.load()

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      tween?.scrollTrigger?.kill()
      tween?.kill()
    }
  }, [src, scrollSpeed]) // Re-trigger when src or speed changes

  return (
    <div
      ref={containerRef}
      className="relative bg-black h-full"
    >
      <div className="sticky top-0 w-screen h-screen overflow-hidden p-[1rem]">
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Inject currentTime in each Overlay child */}
        {Children.map(children, child =>
          isValidElement<OverlayProps>(child)
            ? cloneElement(child, { currentTime })
            : null
        )}
      </div>
    </div>
  )
}
