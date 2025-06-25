'use client'

import FullScrollSection from '@/components/common/FullScrollSection'
import ScrollSectionTrigger from '@/components/common/ScrollSectionTrigger'
import IntroSection from './IntroSection'
import OutroSection from './OutroSection'
import { useTimedOverlays } from '@/hooks/useTimedOverlays'

export type DuringSectionProps = {
  onNext: () => void
  onBack: () => void
}

export default function DuringSection({ onNext, onBack }: DuringSectionProps) {
  const overlayItems = [
    {
      key: 'during-1',
      appear: 1,
      disappear: 4,
      align: 'top' as const,
      type: 'error' as const,
      content: (
        <p className="text-sm font-semibold">
          🚨 Hurricane Beryl made landfall causing widespread power outages and structural damage.
        </p>
      ),
      withIcon: false,
    },
    {
      key: 'during-2',
      appear: 4,
      disappear: 7,
      align: 'bottom right' as const,
      type: 'info' as const,
      content: (
        <div className="flex flex-col text-sm">
          <span className="font-medium">📍 Real-time assessments launched</span>
          <span className="opacity-80">Initial field data captured via drones and mobile teams.</span>
        </div>
      ),
      withIcon: false,
    },
    {
      key: 'during-3',
      appear: 7,
      disappear: 10,
      align: 'top left' as const,
      type: 'success' as const,
      content: (
        <p className="text-sm">👷 Emergency responders deployed in affected areas for structural inspections.</p>
      ),
      withIcon: false,
    },
    {
      key: 'during-4',
      appear: 10,
      disappear: 13,
      align: 'center' as const,
      type: 'info' as const,
      content: (
        <p className="font-semibold text-base">
          📡 Satellite imagery analysis in progress to guide targeted relief.
        </p>
      ),
      withIcon: false,
    },
    {
      key: 'during-5',
      appear: 13,
      disappear: 16,
      align: 'bottom left' as const,
      type: 'warning' as const,
      content: (
        <p className="text-sm">
          ⚠️ Road blockages and debris reported across Saint Vincent and the Grenadines.
        </p>
      ),
      withIcon: false,
    },
    {
      key: 'during-6',
      appear: 16,
      disappear: 19,
      align: 'top right' as const,
      type: 'error' as const,
      content: (
        <span className="text-xs">
          📞 Emergency communication lines activated for civilian reporting and aid coordination.
        </span>
      ),
      withIcon: false,
    },
  ]

  const overlays = useTimedOverlays(overlayItems)

  return (
    <>
      <ScrollSectionTrigger
        onTrigger={onBack}
        text="Go back to the previous section"
        direction="up"
      />
      <FullScrollSection
        videoSrc="/videos/test.mp4"
        sectionId="during-section"
        scrollSpeed={500}
        introSection={<IntroSection />}
        outroSection={<OutroSection />}
        overlays={overlays}
      />
      <ScrollSectionTrigger
        onTrigger={onNext}
        text="Continue to the recovery section"
        direction="down"
      />
    </>
  )
}
