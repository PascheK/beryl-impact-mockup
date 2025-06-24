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
  const base = 'absolute p-4 sm:p-6 w-full max-w-xs sm:max-w-md lg:max-w-xl flex flex-col items-center justify-center'

  const positionMap: Record<string, string> = {
    top: 'top-4 left-1/2 -translate-x-1/2 sm:left-1/2',
    bottom: 'bottom-14 left-1/2 -translate-x-1/2 sm:left-1/2',
    left: 'top-1/2 left-4 -translate-y-1/2 sm:top-1/2',
    right: 'top-1/2 right-4 -translate-y-1/2 sm:top-1/2',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top left': 'top-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0',
    'top right': 'top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0',
    'bottom left': 'bottom-14 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0',
    'bottom right': 'bottom-14 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0',
  }


  const alignment = align ?? 'center'

  return `${base} ${positionMap[alignment] || positionMap['center']}`
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
          <div className="text-center space-y-3 text-xs sm:text-sm md:text-base leading-relaxed">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
