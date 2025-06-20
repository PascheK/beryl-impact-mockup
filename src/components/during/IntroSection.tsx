'use client'

import { motion } from 'framer-motion'

export default function IntroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-12 text-center bg-white text-black">
      <motion.h2
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Gestion en Temps Réel
      </motion.h2>
      <motion.p
        className="max-w-3xl text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Pendant la crise, chaque seconde compte. Coordination, réactivité et clarté des communications sont les piliers d’une gestion de crise efficace, garantissant la sécurité et la continuité des opérations.
      </motion.p>
    </section>
  )
}
