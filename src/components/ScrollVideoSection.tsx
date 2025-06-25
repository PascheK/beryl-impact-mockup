'use client'

import {
  ReactElement,
  Children,
  cloneElement,
  isValidElement,
} from 'react'
import type { OverlayProps } from './Overlay'
import { useScrollVideo } from '@/hooks/useScrollVideo'

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
  const {
    containerRef,
    videoRef,
    wrapperRef,
    currentTime,
  } = useScrollVideo({
    src,
    scrollSpeed,
    activate: activateTriggers,
    onReady,
  })

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
