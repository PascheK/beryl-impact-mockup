'use client'

import FullScrollSection from '../FullScrollSection'
import ScrollSectionTrigger from '../ScrollSectionTrigger'
import IntroSection from './IntroSection'
import OutroSection from './OutroSection'
import { renderOverlays } from '@/utils/overlayUtils'

type Props = {
  onBack: () => void
}

export default function AfterSection({ onBack }: Props) {
  return (
    <>
      <ScrollSectionTrigger
        onTrigger={onBack}
        text="Go back to the previous section"
        direction="up"
      />
      <FullScrollSection
        videoSrc="/videos/test.mp4"
        sectionId="after-section"
        scrollSpeed={500}
        introSection={<IntroSection />}
        outroSection={<OutroSection />}
        overlays={renderOverlays([
          {
            key: 'after-1',
            appear: 1,
            disappear: 4,
            align: 'top left',
            type: 'success',
            content: (
              <p className="text-sm">
                ✅ Initial assessment: majority of critical infrastructure remains operational.
              </p>
            ),
            withIcon: false,
          },
          {
            key: 'after-2',
            appear: 4,
            disappear: 7,
            align: 'center',
            type: 'info',
            content: (
              <p className="text-sm font-medium">
                🧑‍💼 Damage evaluation teams deployed across affected regions.
              </p>
            ),
            withIcon: false,
          },
          {
            key: 'after-3',
            appear: 7,
            disappear: 10,
            align: 'bottom right',
            type: 'warning',
            content: (
              <div className="text-sm">
                🏚️ Over 2,000 structures identified with roof or wall damage.
              </div>
            ),
            withIcon: false,
          },
          {
            key: 'after-4',
            appear: 10,
            disappear: 13,
            align: 'top right',
            type: 'error',
            content: (
              <div className="text-sm">
                🧹 Debris clearance underway — priority on major roads and public areas.
              </div>
            ),
            withIcon: false,
          },
          {
            key: 'after-5',
            appear: 13,
            disappear: 16,
            align: 'bottom left',
            type: 'success',
            content: (
              <div className="text-sm">
                🙌 Community volunteers actively supporting relief distribution efforts.
              </div>
            ),
            withIcon: false,
          },
          {
            key: 'after-6',
            appear: 16,
            disappear: 19,
            align: 'center',
            type: 'info',
            content: (
              <p className="text-sm font-semibold text-center">
                📊 Post-event data collection in progress to support long-term recovery planning.
              </p>
            ),
            withIcon: false,
          },
        ])}
      />
    </>
  )
}
