import Overlay from "./Overlay";
import ScrollVideoSection from "./ScrollVideoSection";

export default function DuringSection() {
  return (
<div className="bg-gray-900">
  <ScrollVideoSection src="/videos/test.mp4" scrollSpeed={400}>
    <Overlay appear={2} disappear={4} className="top-1/4 left-10">
      🌪️ Alerte météo
    </Overlay>
    <Overlay appear={5} className="bottom-10 right-10">
      🚨 Évacuation en cours
    </Overlay>
  </ScrollVideoSection>
</div>
  );
}
