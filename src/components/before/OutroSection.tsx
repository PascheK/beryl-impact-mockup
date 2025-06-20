'use client'

import { motion } from 'framer-motion'

export default function OutroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-12 text-center bg-gray-100 text-black">
      <motion.h3
        className="text-3xl font-semibold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Résilience par la Préparation
      </motion.h3>
      <motion.p
        className="max-w-2xl text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Grâce à une planification proactive, les équipes disposent des outils nécessaires pour réagir rapidement et efficacement. La résilience ne s’improvise pas, elle se construit.
      </motion.p>
    </section>
  )
}
