export default function AboutIntro() {
  return (
    <section className="relative rounded-3xl border border-secondary/40 bg-gradient-to-br from-secondary/15 via-black/70 to-primary/10 p-7 text-center shadow-[0_0_35px_rgba(255,170,0,0.12)] sm:p-10 md:p-12">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-secondary/5 blur-xl" />

      <div className="relative">
        <h2 className="font-playfair text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          More Than Just Food
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-sm leading-8 text-warm-200 sm:text-base md:text-lg">
          Savora is more than just a restaurant. We are passionate about
          creating delicious food, unforgettable moments, and a warm atmosphere
          where everyone feels welcome.
        </p>

        <div className="mt-7 flex items-center justify-center gap-6 text-secondary">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
      </div>
    </section>
  );
}
