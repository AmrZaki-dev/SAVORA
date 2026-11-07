import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ASSETS } from "../../../../constants/assets";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-warm-950">
      <div className="absolute inset-0">
        <img
          src={ASSETS.hero}
          alt="Delicious food"
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-warm-950/100 via-warm-950/0 to-warm-950/0" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-secondary/15 text-secondary rounded-full text-sm font-medium mb-5 backdrop-blur-sm border border-secondary/30">
            ✦ WELCOME TO SAVORA
          </span>

          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
            Good<span className="text-primary"> Food</span>
            <br />
            Good<span className="text-primary"> Mood</span>
          </h2>

          <p className="mt-5 text-sm md:text-base lg:text-lg text-warm-200 leading-relaxed max-w-lg">
            Discover flavor in every bite. Fresh ingredients, perfectly cooked,
            served with love to create an unforgettable dining experience.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2"
            >
              Explore Menu
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
