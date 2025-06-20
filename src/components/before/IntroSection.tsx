'use client'

import { motion } from 'framer-motion'

export default function IntroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-black text-white">
      <motion.h2
        className="text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Contexte de la catastrophe
      </motion.h2>
      <motion.p
        className="max-w-3xl text-lg text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        En août 2023, une série de perturbations météorologiques a balayé la région, provoquant des inondations, des vents violents et des coupures de courant majeures. Malgré les alertes initiales, la population nl&apos;était pas suffisamment préparée à l’ampleur du phénomène.
        <br /><br />
        Ce projet immersif retrace les événements clés, les décisions prises en urgence et les conséquences humaines et matérielles de cette crise.
      </motion.p>
    </section>
  )
}
