'use client'

import { motion } from 'framer-motion'

export default function IntroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-12 text-center bg-white text-black">
      <motion.h2
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Analyse Post-Événement
      </motion.h2>
      <motion.p
        className="max-w-3xl text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Après la tempête, vient le moment dl&apos;évaluer, de comprendre et dl&apos;améliorer. Les retours dl&apos;expérience sont une opportunité précieuse pour renforcer les processus et prévenir les prochaines crises.
      </motion.p>
    </section>
  )
}
