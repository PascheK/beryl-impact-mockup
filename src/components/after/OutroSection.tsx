'use client'

import { motion } from 'framer-motion'

export default function OutroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-12 text-center bg-gray-100 text-black">
      <motion.h3
        className="text-3xl font-semibold mb-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Grandir de ll&apos;Expérience
      </motion.h3>
      <motion.p
        className="max-w-2xl text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Chaque crise apporte son lot d’enseignements. Intégrer ces leçons permet non seulement de renforcer la résilience, mais aussi d’améliorer l’efficacité à long terme de toute l’organisation.
      </motion.p>
    </section>
  )
}
