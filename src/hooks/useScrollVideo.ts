import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export type UseScrollVideoProps = {
  src: string
  scrollSpeed?: number
  activate?: boolean
  onReady?: () => void
}

gsap.registerPlugin(ScrollTrigger)

export function useScrollVideo({
  src,
  scrollSpeed = 400,
  activate = false,
  onReady,
}: UseScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (!activate) return

    const video = videoRef.current
    const container = containerRef.current
    const wrapper = wrapperRef.current
    if (!video || !container || !wrapper) return

    const killAll = () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      gsap.globalTimeline.clear()
    }

    let tween: gsap.core.Tween | null = null
    const duration = video.duration
    if (!isFinite(duration) || duration === 0) return
    const height = duration * scrollSpeed
    killAll()

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

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${height}`,
      scrub: true,
      onUpdate: self => {
        const p = self.progress
        if (p < 0.15 || p > 0.85) {
          gsap.to(wrapper, { scale: 0.8, overwrite: 'auto' })
        } else {
          gsap.to(wrapper, { scale: 0.95, opacity: 1, overwrite: 'auto' })
        }
      },
    })

    ScrollTrigger.refresh()

    return () => {
      killAll()
      tween?.kill()
    }
  }, [activate, scrollSpeed, src])

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

  return { containerRef, videoRef, wrapperRef, currentTime }
}
