'use client'

import { useEffect, useState } from 'react'
import { useLoadingOverlay } from '@/context/LoadingOverlayContext'

// List of videos to preload
const videoSources = ['/videos/test.mp4']

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const { show, hide } = useLoadingOverlay()

  useEffect(() => {

    const waitForVideos = async () => {
      const loadPromises = videoSources.map((src) => {
        return new Promise<void>((resolve) => {
          const video = document.createElement('video')
          video.src = src
          video.preload = 'auto'
          video.addEventListener('loadedmetadata', () => resolve())
        })
      })

      await Promise.all(loadPromises)
      setIsReady(true)
    }

    waitForVideos()
  }, [show, hide])


  if (!isReady) return null // We already show the overlay, no need to render anything else

  return <>{children}</>
}
