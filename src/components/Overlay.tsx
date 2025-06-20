'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

export type OverlayProps = {
  appear: number
  disappear?: number
  currentTime?: number
  align?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'center'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'
  className?: string
  children: ReactNode
}

function getPositionClass(align?: string): string {
  const base = 'absolute p-4 sm:p-6 md:p-8 max-w-md w-full'

  const map: Record<string, string> = {
    top: 'top-6 left-1/2 -translate-x-1/2',
    bottom: 'bottom-6 left-1/2 -translate-x-1/2',
    left: 'left-6 top-1/2 -translate-y-1/2',
    right: 'right-6 top-1/2 -translate-y-1/2',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top left': 'top-6 left-6',
    'top right': 'top-6 right-6',
    'bottom left': 'bottom-6 left-6',
    'bottom right': 'bottom-6 right-6',
  }

  return `${base} ${map[align ?? 'center'] || map['center']}`
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
          className={`${getPositionClass(align)} ${className} z-50 backdrop-blur-sm bg-black/70 text-white rounded-xl shadow-lg`}
        >
          <div className="text-center space-y-3 text-sm sm:text-base md:text-lg leading-relaxed">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
