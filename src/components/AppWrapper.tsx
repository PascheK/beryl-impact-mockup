'use client'

import { useEffect, useState } from 'react'
import LoadingOverlay from '@/components/LoadingOverlay'
import { useLoadingOverlay } from '@/context/LoadingOverlayContext'

// List of videos to preload
const videoSources = ['/videos/test.mp4']

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const { show, hide } = useLoadingOverlay()
  useEffect(() => {
    show() 
    // Function to preload all video sources
    const waitForVideos = async () => {
      const loadPromises = videoSources.map((src) => {
        return new Promise<void>((resolve) => {
          const video = document.createElement('video')
          video.src = src
          video.preload = 'auto'
          video.addEventListener('loadedmetadata', () => resolve())
        })
      })

      // Wait for all videos to be ready
      await Promise.all(loadPromises)
      hide() // Hide loading overlay after preloading
      setIsReady(true)
    }

    waitForVideos()
  }, [show, hide])

  // Show loading screen while assets are being preloaded
  if (!isReady) return <LoadingOverlay text='loading..'/>
  // Render the wrapped content once ready
  return <>{children}</>
}
