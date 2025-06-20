'use client'
import { AlertTriangle } from 'lucide-react'
import FullScrollSection from '../FullScrollSection'
import Overlay from '../Overlay'
import IntroSection from './IntroSection'
import OutroSection from './OutroSection'

type Props = {
isProgrammaticScroll: React.RefObject<boolean>

  onNext: () => void
  autoScroll?: boolean
}

export default function BeforeSection({isProgrammaticScroll, onNext }: Props) {
  return (
    <div id="before-section">
<FullScrollSection
  isProgrammaticScroll={isProgrammaticScroll}
  videoSrc="/videos/test.mp4"
  scrollSpeed={500}
  onScrollEnd={() => onNext()}
  introSection={
    <IntroSection />
  }
  outroSection={
    <OutroSection />
  }
  overlays={[
  <Overlay
    key="before-1"
    appear={1}
    disappear={3}
    align="top left"
    className="bg-blue-900/80 p-4 rounded-lg shadow-lg"
  >
    <div className="flex items-center gap-2">
      <AlertTriangle className="text-yellow-400 w-5 h-5" />
      <p className="text-sm text-white font-medium">Préparation en cours : vérification des stocks dl&apos;urgence.</p>
    </div>
  </Overlay>,

  <Overlay
    key="before-2"
    appear={3}
    disappear={5}
    align="bottom right"
    className="bg-green-800/90 px-5 py-3 rounded-md"
  >
    <div className="text-white text-sm">
      ✅ Tous les points de rassemblement ont été validés.
    </div>
  </Overlay>,

  <Overlay
    key="before-3"
    appear={5}
    disappear={7}
    align="center"
    className="bg-white/90 text-black p-6 rounded-xl shadow-xl backdrop-blur-md"
  >
    <p className="font-semibold text-base">Briefing en cours avec les équipes locales</p>
  </Overlay>
  ]}
/>
    </div>
  )
}
