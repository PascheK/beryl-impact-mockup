// During/OutroSection.tsx
'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import BulletPointCard from '@/components/BulletPointCard'

export default function OutroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-12 text-center bg-gray-100 text-black">
      <SectionHeader title="Stabilization Achieved" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-8"
      >
        <BulletPointCard
          title="Results Achieved"
          points={[
            'Critical infrastructure reactivated: partial restoration of electricity and road access.',
            'Safe zones established and medical assistance operational across key regions.',
            'Clear communication channels ensured timely updates to the public and stakeholders.'
          ]}
        />
      </motion.div>
    </section>
  )
}
