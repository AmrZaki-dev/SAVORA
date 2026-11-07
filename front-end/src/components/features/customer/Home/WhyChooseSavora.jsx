import { ASSETS } from "../../../../constants/assets";
import FeatureItem from "./FeatureItem";
import HappyCustomers from "./HappyCustomers";

export default function WhyChooseSavora({ features, happyCustomerAvatars }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
      <div className="bg-secondary rounded-3xl shadow-lg relative overflow-hidden px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Text Content */}
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Why Choose Savora
            </span>

            <h2 className="font-playfair text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-warm-900 mt-3 leading-tight">
              We Serve More
              <br />
              Than Just Food
            </h2>

            <p className="mt-5 text-warm-600 text-sm leading-relaxed max-w-lg">
              At Savora, we believe that great food brings people together. We
              use the freshest ingredients, cook with love, and serve with a
              smile.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {features.map((feature) => (
                <FeatureItem key={feature.title} {...feature} />
              ))}
            </div>
          </div>

          {/* Restaurant Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={ASSETS.Savora1}
                alt="Savora restaurant interior"
                className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover"
              />

              <div className="absolute top-5 right-5 flex flex-col items-center">
                <img
                  src={ASSETS.Logo}
                  alt="Savora"
                  className="w-24 sm:w-28 opacity-95"
                />
              </div>
            </div>

            <HappyCustomers avatars={happyCustomerAvatars} />
          </div>
        </div>
      </div>
    </section>
  );
}
