export default function HeroSection() {
  return (
    <section
      id="hero"
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: 'url(/hero.jpg)', // mets une image dans public/ ou utilise une couleur de fond
      }}
    >
      <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
        Ouragan Beryl
      </h1>
      <p className="text-lg text-white max-w-2xl drop-shadow">
        Découvrez l’impact de l’ouragan sur les Caraïbes : avant, pendant, après.
      </p>
    </section>
  );
}
