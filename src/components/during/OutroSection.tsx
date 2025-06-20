'use client'

import { motion } from 'framer-motion'

export default function OutroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-12 text-center bg-gray-100 text-black">
      <motion.h3
        className="text-3xl font-semibold mb-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Un Cap Maintenu
      </motion.h3>
      <motion.p
        className="max-w-2xl text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Malgré les perturbations, les équipes ont su maintenir le cap, gérer les priorités et assurer la continuité essentielle. C’est dans l’adversité que l’organisation révèle sa vraie solidité.
      </motion.p>
    </section>
  )
}
