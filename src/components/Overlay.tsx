'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

export type OverlayProps = {
  appear: number
  disappear?: number
  currentTime?: number
  align?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 
          'top left' | 'top right' | 'bottom left' | 'bottom right'
  className?: string
  children: ReactNode
}

function getPositionClass(align?: string): string {
  switch (align) {
    case 'top':
      return 'inset-0 flex items-center justify-center md:top-10 md:left-1/2 md:-translate-x-1/2 md:inset-auto md:flex-none'
    case 'bottom':
      return 'inset-0 flex items-center justify-center md:bottom-10 md:left-1/2 md:-translate-x-1/2 md:inset-auto md:flex-none'
    case 'left':
      return 'inset-0 flex items-center justify-center md:left-10 md:top-1/2 md:-translate-y-1/2 md:inset-auto md:flex-none'
    case 'right':
      return 'inset-0 flex items-center justify-center md:right-10 md:top-1/2 md:-translate-y-1/2 md:inset-auto md:flex-none'
    case 'top left':
      return 'inset-0 flex items-center justify-center md:top-10 md:left-10 md:inset-auto md:flex-none'
    case 'top right':
      return 'inset-0 flex items-center justify-center md:top-10 md:right-10 md:inset-auto md:flex-none'
    case 'bottom left':
      return 'inset-0 flex items-center justify-center md:bottom-10 md:left-10 md:inset-auto md:flex-none'
    case 'bottom right':
      return 'inset-0 flex items-center justify-center md:bottom-10 md:right-10 md:inset-auto md:flex-none'
    case 'center':
    default:
      return 'inset-0 flex items-center justify-center'
  }
}


export default function Overlay({
  appear,
  disappear,
  currentTime,
  align = 'center',
  className = '',
  children,
}: OverlayProps) {
  const isVisible =
    currentTime !== undefined &&
    currentTime >= appear &&
    (disappear === undefined || currentTime < disappear)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className={`absolute ${getPositionClass(align)} ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
