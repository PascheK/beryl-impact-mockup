'use client'

import FullScrollSection from '../FullScrollSection'
import Overlay from '../Overlay'
import IntroSection from './IntroSection'
import OutroSection from './OutroSection'

type Props = {
isProgrammaticScroll: React.RefObject<boolean>

  onNext: () => void
  onBack: () => void
}

export default function DuringSection({ onNext,onBack, isProgrammaticScroll }: Props) {


  return (
    <div  id="during-section">
      <FullScrollSection
        isProgrammaticScroll={isProgrammaticScroll}
        videoSrc="/videos/test.mp4"
        scrollSpeed={500}
        onScrollEnd={() =>onNext()}
        onScrollBack={() => onBack()}
        introSection={
          <IntroSection/>
        }
        outroSection={
         <OutroSection />
        }
        overlays={[
<Overlay
  key="during-1"
  appear={1}
  disappear={4}
  align="top"
  className="bg-red-700/90 p-4 rounded-xl shadow-xl backdrop-blur text-white"
>
  <div className="flex items-center gap-2">
    <span className="text-yellow-300">🚨</span>
    <p className="text-sm font-semibold">Alerte maximale : conditions météorologiques extrêmes en cours.</p>
  </div>
</Overlay>,

<Overlay
  key="during-2"
  appear={4}
  disappear={7}
  align="bottom right"
  className="bg-blue-900/85 px-5 py-3 rounded-lg text-white shadow-md"
>
  <div className="flex flex-col text-sm">
    <span className="font-medium">🌧️ Rafales atteignant 130 km/h</span>
    <span className="opacity-80">Secteur Est particulièrement touché</span>
  </div>
</Overlay>,

<Overlay
  key="during-3"
  appear={7}
  disappear={10}
  align="top left"
  className="bg-green-800/90 px-4 py-2 rounded-md shadow-lg text-white"
>
  <div className="flex items-center gap-2">
    <span>👩‍🚒</span>
    <p className="text-sm">Équipes de secours déployées dans les zones critiques</p>
  </div>
</Overlay>,

<Overlay
  key="during-4"
  appear={10}
  disappear={13}
  align="center"
  className="bg-white/90 text-black p-6 rounded-xl shadow-xl backdrop-blur-md"
>
  <p className="font-semibold text-base">Diffusion d’un message officiel en cours...</p>
</Overlay>,

<Overlay
  key="during-5"
  appear={13}
  disappear={16}
  align="bottom left"
  className="bg-orange-700/80 px-4 py-2 rounded-lg shadow-md text-white"
>
  <div className="flex items-center gap-2">
    <span>📢</span>
    <p className="text-sm">Message d’évacuation : veuillez quitter les lieux immédiatement</p>
  </div>
</Overlay>,

<Overlay
  key="during-6"
  appear={16}
  disappear={19}
  align="top right"
  className="bg-black/75 text-white px-4 py-3 rounded-lg shadow-md text-xs"
>
  📞 Assistance d’urgence : composez le 117 pour signaler toute situation critique
</Overlay>,

        ]}
      />
    </div>
  )
}
