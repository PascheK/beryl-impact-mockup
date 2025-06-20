'use client'

import {
  useEffect,
  useRef,
  ReactElement,
  Children,
  cloneElement,
  isValidElement,
  useState,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { OverlayProps } from './Overlay'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  src: string
  scrollSpeed?: number
  children?: ReactElement<OverlayProps> | ReactElement<OverlayProps>[]
  onReady?: () => void
  activateTriggers?: boolean
}

export default function ScrollVideoSection({
  src,
  scrollSpeed = 400,
  children,
  onReady,
  activateTriggers = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState(0)

  // Initialize scroll-triggered video control when activated
  useEffect(() => {
    if (!activateTriggers) return

    const video = videoRef.current
    const container = containerRef.current
    const wrapper = wrapperRef.current
    if (!video || !container || !wrapper) return

    const killAll = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      gsap.globalTimeline.clear()
    }

    let tween: gsap.core.Tween | null = null
    const duration = video.duration

    if (!isFinite(duration) || duration === 0) return
    const height = duration * scrollSpeed

    // Reset all triggers and animations
    killAll()

    // Scroll-linked video progress
    tween = gsap.to(video, {
      currentTime: duration,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${height}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: () => setCurrentTime(video.currentTime),
      },
    })

    // Optional visual zoom effect based on scroll position
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${height}`,
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress
        if (p < 0.15 || p > 0.85) {
          gsap.to(wrapper, { scale: 0.8, overwrite: 'auto' })
        } else {
          gsap.to(wrapper, { scale: 0.95, opacity: 1, overwrite: 'auto' })
        }
      }
    })

    ScrollTrigger.refresh()

    return () => {
      killAll()
      tween?.kill()
    }
  }, [activateTriggers, scrollSpeed, src])

  // Notify parent once video metadata is ready
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onMeta = () => {
      onReady?.()
    }

    video.addEventListener('loadedmetadata', onMeta)
    video.load()

    return () => {
      video.removeEventListener('loadedmetadata', onMeta)
    }
  }, [onReady])

  return (
    <div ref={containerRef} className="relative bg-black z-0">
      <div
        ref={wrapperRef}
        className="sticky top-0 w-screen h-screen flex items-center justify-center z-10 overflow-hidden scale-[0.8]"
      >
        {/* Background video, controlled via scroll */}
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          className="w-full h-full object-cover rounded-xl"
        />

        {/* Children overlays injected with currentTime prop */}
        {Children.map(children, (child) =>
          isValidElement<OverlayProps>(child)
            ? cloneElement(child, { currentTime })
            : null
        )}
      </div>
    </div>
  )
}
