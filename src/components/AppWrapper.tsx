'use client'

import { useEffect, useState } from 'react'

// List of videos to preload
const videoSources = ['/videos/test.mp4']

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)

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
  }, [])


  // Don't render children until the initial assets are preloaded
  if (!isReady) return null
  return <>{children}</>
}
