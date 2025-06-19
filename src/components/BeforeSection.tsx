import ScrollVideoSection from '@/components/ScrollVideoSection'
import Overlay from '@/components//Overlay'

export default function BeforeSection() {
  return (
<div className="bg-gray-900">
  <ScrollVideoSection src="/videos/test.mp4" scrollSpeed={400}>
    <Overlay appear={2} disappear={4} align='top'>
      🌪️ Alerte météo
    </Overlay>
    <Overlay appear={5} align='bottom right'>
      🚨 Évacuation en cours
    </Overlay>
  </ScrollVideoSection>
</div>

  )
}
