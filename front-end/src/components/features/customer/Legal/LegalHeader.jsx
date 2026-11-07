export default function LegalHeader({ title, description }) {
  return (
    <section className="text-center mb-12 md:mb-16">
      <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-secondary">
        {title}
      </h1>

      <div className="w-20 h-1 bg-primary mx-auto mt-5 rounded-full" />

      <p className="mt-4 text-warm-400 text-sm max-w-md mx-auto">
        {description}
      </p>
    </section>
  );
}
