// components/LoadingOverlay.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLoadingOverlay } from '@/context/LoadingOverlayContext'
type Props = {
  text?: string
}

export default function LoadingOverlay({ text = 'Loading...' }: Props) {
  const { isVisible } = useLoadingOverlay()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >

        <p className="text-2xl font-semibold">{text}</p>
        <div className="w-24 h-1 bg-white animate-pulse mx-auto" />        
        </motion.div>
      )}
    </AnimatePresence>
  )
}
