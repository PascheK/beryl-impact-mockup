// context/LoadingOverlayContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'

type LoadingOverlayContextType = {
  show: () => void
  hide: () => void
  isVisible: boolean
}

const LoadingOverlayContext = createContext<LoadingOverlayContextType | null>(null)

export function LoadingOverlayProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)

  const show = () => setIsVisible(true)
  const hide = () => setIsVisible(false)

  return (
    <LoadingOverlayContext.Provider value={{ show, hide, isVisible }}>
      {children}
    </LoadingOverlayContext.Provider>
  )
}

export function useLoadingOverlay() {
  const context = useContext(LoadingOverlayContext)
  if (!context) throw new Error('useLoadingOverlay must be used within LoadingOverlayProvider')
  return context
}
