import { Link } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { ASSETS } from "../constants/assets";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#080706] text-white flex items-center justify-center px-4 py-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-10px] w-120 h-120 rounded-full bg-primary/50 blur-3xl animate-float-one" />
      <div className="absolute bottom-[-120px] right-[-20px] w-120 h-120 rounded-full bg-primary/50 blur-3xl animate-float-two" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Logo */}
        <Link to="/" className="inline-flex flex-col items-center mb-8">
          <img
            src={ASSETS.Logo}
            alt="SAVORA"
            className="w-24 sm:w-28 mb-3 drop-shadow-2xl"
          />

          <span className="font-playfair text-2xl font-bold text-secondary tracking-tight">
            SAVORA
          </span>

          <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 mt-1">
            Restaurant
          </span>
        </Link>

        {/* 404 */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-playfair font-bold text-[180px] sm:text-[240px] leading-none text-white/30 select-none">
              404
            </span>
          </div>

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                <SearchX size={30} className="text-secondary" />
              </div>
            </div>

            <p className="font-playfair italic text-secondary text-lg mb-2">
              Oops!
            </p>

            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-5">
              Page Not Found
            </h1>

            <p className="text-white/70 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
              The page you're looking for doesn't exist or may have been moved.
              Let's get you back to something delicious.
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-8">
              <span className="w-12 h-px bg-secondary/30" />
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="w-12 h-px bg-secondary/30" />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-secondary text-black font-bold hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <Home size={18} />
                Back to Home
              </Link>

              <Link
                to="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white font-medium hover:bg-white/[0.07] hover:border-secondary/30 transition-all"
              >
                Explore Menu
                <ArrowLeft size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="mt-10 text-xs text-white/60">
          Taste the moment · Experience SAVORA
        </p>
      </div>
    </div>
  );
}
