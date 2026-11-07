import { BookOpen, Handshake } from "lucide-react";

const values = [
  {
    icon: BookOpen,
    title: "Our Story",
    text: "Our restaurant started with a simple idea: bring people together through delicious food and a memorable dining experience.",
    text2:
      "From our first day until today, we have continued to grow while staying true to our passion for authentic flavors.",
  },
  {
    icon: Handshake,
    title: "Our Philosophy",
    text: "We believe that great food is more than just a meal. It is about the people, the atmosphere, and the moments shared around the table.",
    text2:
      "Every dish is prepared with care, passion, and attention to detail.",
  },
];

export default function AboutStory() {
  return (
    <section className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8">
      {values.map(({ icon: Icon, title, text, text2 }) => (
        <div
          key={title}
          className="group relative rounded-3xl border border-secondary/40 bg-gradient-to-br from-secondary/15 via-[#17130d] to-primary/10 p-7 text-center shadow-[0_0_30px_rgba(255,170,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,170,0,0.2)] sm:p-9"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10">
            <Icon size={42} strokeWidth={1.5} className="text-secondary" />
          </div>

          <h2 className="mt-6 font-playfair text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h2>

          <p className="mt-5 text-sm leading-7 text-warm-200 sm:text-base">
            {text}
          </p>

          <p className="mt-4 text-sm leading-7 text-warm-300 sm:text-base">
            {text2}
          </p>
        </div>
      ))}
    </section>
  );
}
