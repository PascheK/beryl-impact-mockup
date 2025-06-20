'use client'

import FullScrollSection from '../FullScrollSection'
import Overlay from '../Overlay'
import IntroSection from './IntroSection'
import OutroSection from './OutroSection'

type Props = {
  isProgrammaticScroll: React.RefObject<boolean>
  onBack: () => void
}

export default function AfterSection({ isProgrammaticScroll, onBack }: Props) {
  

  return (
    <div id="after-section">
<FullScrollSection
  isProgrammaticScroll={isProgrammaticScroll}
  videoSrc="/videos/test.mp4"
  scrollSpeed={500}
  onScrollBack={() => onBack()}
    introSection={
      <IntroSection />
    }
    outroSection={
      <OutroSection />
    }
  overlays={[
<Overlay
  key="after-1"
  appear={1}
  disappear={4}
  align="top left"
  className="bg-green-700/85 px-4 py-2 rounded-lg shadow-md text-white"
>
  <div className="flex items-center gap-2">
    <span>✅</span>
    <p className="text-sm">Bilan initial : 98% des habitants localisés et en sécurité.</p>
  </div>
</Overlay>,

<Overlay
  key="after-2"
  appear={4}
  disappear={7}
  align="center"
  className="bg-white/90 text-black px-6 py-4 rounded-xl shadow-xl backdrop-blur-md"
>
  <p className="font-medium text-base">Une cellule de soutien psychologique est disponible 24h/24.</p>
</Overlay>,

<Overlay
  key="after-3"
  appear={7}
  disappear={10}
  align="bottom right"
  className="bg-blue-800/90 text-white px-4 py-3 rounded-lg text-sm shadow-md"
>
  <div className="flex flex-col gap-1">
    <span>🏥 Réouverture partielle de l’hôpital cantonal</span>
    <span className="opacity-80 text-xs">Urgences à nouveau opérationnelles</span>
  </div>
</Overlay>,

<Overlay
  key="after-4"
  appear={10}
  disappear={13}
  align="bottom left"
  className="bg-orange-600/90 text-white px-4 py-2 rounded-lg shadow"
>
  <div className="flex items-center gap-2">
    <span>🧹</span>
    <p className="text-sm">Début des opérations de nettoyage et de remise en état.</p>
  </div>
</Overlay>,

<Overlay
  key="after-5"
  appear={13}
  disappear={16}
  align="center"
  className="bg-black/75 text-white px-5 py-3 rounded-xl shadow-md text-sm"
>
  <div className="flex flex-col gap-1 text-center">
    <span className="font-semibold">Merci aux bénévoles 💙</span>
    <span className="opacity-70">Votre mobilisation a été essentielle</span>
  </div>
</Overlay>,

<Overlay
  key="after-6"
  appear={16}
  disappear={19}
  align="center"
  className="bg-purple-800/90 text-white px-6 py-4 rounded-lg shadow-xl text-base font-medium"
>
  📢 Prochaine réunion de coordination : lundi 10h à la salle communale
</Overlay>,


  ]}
/>    </div>
  )
}
