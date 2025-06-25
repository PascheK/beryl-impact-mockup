'use client'

import FullScrollSection from '@/components/FullScrollSection'
import IntroSection from './IntroSection'
import OutroSection from './OutroSection'
import ScrollSectionTrigger from '@/components/ScrollSectionTrigger'
import { renderOverlays } from '@/utils/overlayUtils'
import { useMemo } from 'react'

type Props = {
  onNext: () => void
}

export default function BeforeSection({ onNext }: Props) {
  const overlays = useMemo(
    () =>
      renderOverlays([
        {
          key: 'before-1',
          appear: 1,
          disappear: 3,
          align: 'top left',
          type: 'info',
          content: (
            <p className="text-sm">
              📝 Coordination initiated with local authorities and emergency agencies ahead of landfall.
            </p>
          ),
          withIcon: false,
        },
        {
          key: 'before-2',
          appear: 3,
          disappear: 5,
          align: 'bottom right',
          type: 'success',
          content: (
            <p className="text-sm">
              ✅ Emergency shelters inspected and stocked with essential supplies.
            </p>
          ),
          withIcon: false,
        },
        {
          key: 'before-3',
          appear: 5,
          disappear: 7,
          align: 'top right',
          type: 'warning',
          content: (
            <p className="text-sm">
              ⚠️ Public briefing issued: residents advised to secure homes and prepare for prolonged outages.
            </p>
          ),
          withIcon: false,
        },
        {
          key: 'before-4',
          appear: 7,
          disappear: 10,
          align: 'center',
          type: 'error',
          content: (
            <p className="text-sm font-medium">
              📡 Communications tested between command centers to ensure readiness.
            </p>
          ),
          withIcon: false,
        },
        {
          key: 'before-5',
          appear: 10,
          disappear: 13,
          align: 'bottom left',
          type: 'info',
          content: (
            <p className="text-sm">
              🧭 Evacuation routes identified and shared with community leaders.
            </p>
          ),
          withIcon: false,
        },
      ]),
    []
  )

  return (
    <>
      <FullScrollSection
        videoSrc="/videos/test.mp4"
        sectionId="before-section"
        scrollSpeed={500}
        introSection={<IntroSection />}
        outroSection={<OutroSection />}
        overlays={overlays}
      />
      <ScrollSectionTrigger
        onTrigger={onNext}
        text="Continue to the during section"
        direction="down"
      />
    </>
  )
}
