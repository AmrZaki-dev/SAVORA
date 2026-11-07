const gallery = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
];

export default function AboutGallery() {
  return (
    <section className="mt-24 md:mt-28">
      <h2 className="text-center font-playfair text-3xl font-bold text-secondary sm:text-4xl md:text-5xl">
        Our Restaurant
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
        {gallery.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-full border-4 border-secondary/60 shadow-[0_0_25px_rgba(255,170,0,0.25)]"
          >
            <img
              src={image}
              alt={`Savora restaurant ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-secondary/10" />
          </div>
        ))}
      </div>
    </section>
  );
}
