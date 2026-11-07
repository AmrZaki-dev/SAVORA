import { ChefHat, Leaf } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "Fresh, carefully selected ingredients are at the heart of every dish we serve.",
  },
  {
    icon: ChefHat,
    title: "Expert Chefs",
    description:
      "Our talented chefs bring passion, creativity, and experience to every plate.",
  },
];

export default function AboutFeatures() {
  return (
    <section className="mt-24 md:mt-28">
      <h2 className="text-center font-playfair text-3xl font-bold text-secondary sm:text-4xl md:text-5xl">
        Fresh Ingredients & Expert Chefs
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="relative rounded-3xl border border-secondary/40 bg-gradient-to-br from-secondary/15 via-[#17130d] to-primary/10 p-7 text-center shadow-[0_0_30px_rgba(255,170,0,0.12)] sm:p-9"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10">
              <Icon size={42} strokeWidth={1.5} className="text-secondary" />
            </div>

            <h3 className="mt-6 font-playfair text-2xl font-bold text-white">
              {title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-warm-200 sm:text-base">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
