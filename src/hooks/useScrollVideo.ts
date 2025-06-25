import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type UseScrollVideoOptions = {
  videoRef: React.RefObject<HTMLVideoElement>
  wrapperRef: React.RefObject<HTMLDivElement>
  containerRef: React.RefObject<HTMLDivElement>
  activate: boolean
  speed: number
  onTimeUpdate?: (time: number) => void
}

export function useScrollVideo({
  videoRef,
  wrapperRef,
  containerRef,
  activate,
  speed,
  onTimeUpdate,
}: UseScrollVideoOptions) {
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
    const height = duration * speed

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
        onUpdate: () => onTimeUpdate?.(video.currentTime),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activate, speed])
}
