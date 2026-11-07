import { Link, Outlet } from "react-router-dom";
import { ASSETS } from "../../constants/assets";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#080706] text-white flex items-center justify-center px-4 py-4 overflow-hidden">
      <div className="w-full max-w-[1500px] grid grid-cols-1 lg:grid-cols-[0.75fr_1fr_0.75fr] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d0b09]">
        {/* Left - Brand */}

        <div className="hidden lg:flex relative items-center justify-center p-10 overflow-hidden border-r border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#17120d] via-[#0d0b09] to-[#090807]" />
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative z-10 text-center">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <img
                src={ASSETS.Logo}
                alt="SAVORA"
                className="w-36 xl:w-44 mx-auto mb-6 drop-shadow-2xl"
              />
              <h2 className="font-playfair text-4xl xl:text-5xl font-bold tracking-tight text-secondary">
                SAVORA
              </h2>
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="w-10 h-px bg-secondary/50" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/70">
                  Restaurant
                </span>
                <span className="w-10 h-px bg-secondary/50" />
              </div>
            </Link>
            <p className="mt-8 text-sm text-white/40 max-w-xs mx-auto leading-relaxed">
              Taste the moment. Experience flavors crafted with passion.
            </p>
          </div>
        </div>

        {/* Center - Auth Content */}

        <main className="flex items-center justify-center p-5 sm:p-8 md:p-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>

        {/* Right - Slogan */}

        <div className="hidden lg:flex relative items-center justify-center p-10 overflow-hidden border-l border-white/10">
          <div className="absolute inset-0 bg-gradient-to-bl from-[#17120d] via-[#0d0b09] to-[#090807]" />
          <div className="absolute top-20 right-10 w-44 h-44 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-52 h-52 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative z-10 text-center">
            <span className="block font-bold text-5xl xl:text-6xl tracking-tight text-white">
              GOOD
            </span>
            <span className="block font-bold text-5xl xl:text-6xl tracking-tight text-secondary mt-1">
              FOOD
            </span>
            <span className="block font-bold text-5xl xl:text-6xl tracking-tight text-white mt-1">
              GOOD
            </span>
            <span className="block font-bold text-5xl xl:text-6xl tracking-tight text-secondary mt-1">
              MOOD
            </span>
            <div className="w-20 h-1 bg-secondary rounded-full mx-auto mt-7" />
            <p className="font-playfair italic text-secondary text-xl mt-7">
              Taste the moment
            </p>
          </div>
        </div>

        {/* Mobile Brand + Slogan */}

        <div className="lg:hidden text-center pb-7 px-5">
          <p className="font-bold text-xl tracking-widest text-white/80">
            GOOD <span className="text-secondary">FOOD</span>
            {" · "}
            GOOD <span className="text-secondary">MOOD</span>
          </p>
        </div>
      </div>
    </div>
  );
}
