import {
  AboutHero,
  AboutIntro,
  AboutStory,
  AboutFeatures,
  AboutGallery,
} from "../../components/features/customer/About";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />

        <div className="absolute right-0 top-[700px] h-80 w-80 rounded-full bg-secondary/10 blur-[130px]" />

        <div className="absolute bottom-0 left-1/2 h-80 w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-36 lg:px-8">
        <AboutHero />

        <AboutIntro />

        <AboutStory />

        <AboutFeatures />

        <AboutGallery />
      </div>
    </main>
  );
}
