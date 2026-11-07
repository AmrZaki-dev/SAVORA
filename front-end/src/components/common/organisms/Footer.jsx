import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ASSETS } from "../../../constants/assets";
import { useAuth } from "../../../context/AuthContext";

export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="bg-gradient-to-b from-warm-900 via-warm-950 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16 py-14 md:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-2">
              <img
                src={ASSETS.Logo}
                alt="SAVORA Logo"
                className="w-16 sm:w-20 object-contain"
              />

              <div className="flex flex-col gap-1 text-left">
                <h2 className="font-playfair text-2xl sm:text-3xl font-bold tracking-tight text-yellow-400 leading-none">
                  SA<span className="text-red-600">V</span>OR
                  <span className="text-red-600">A</span>
                </h2>

                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-white font-medium">
                  Restaurant
                </span>
              </div>
            </Link>

            <p className="mt-6 text-sm sm:text-base text-warm-400 leading-relaxed max-w-md mx-auto md:mx-0">
              Discover flavor in every bite. Fresh ingredients, perfectly
              cooked, served with love in an unforgettable dining experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>

            <ul className="flex flex-row md:flex-col justify-center items-center md:items-start gap-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-warm-400 hover:text-secondary transition-colors duration-200"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/menu"
                  className="text-sm text-warm-400 hover:text-secondary transition-colors duration-200"
                >
                  Our Menu
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-sm text-warm-400 hover:text-secondary transition-colors duration-200"
                >
                  Cart
                </Link>
              </li>

              {isAuthenticated && (
                <li>
                  <Link
                    to="/my-orders"
                    className="text-sm text-warm-400 hover:text-secondary transition-colors duration-200"
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Company
            </h3>

            <ul className="flex flex-row md:flex-col justify-center items-center md:items-start gap-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-warm-400 hover:text-secondary transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-warm-400 hover:text-secondary transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-sm text-warm-400 hover:text-secondary transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h3>

            <ul className="flex flex-col items-center md:items-start gap-3 text-[13px] text-warm-400">
              <li className="flex items-start gap-2">
                <MapPin size={17} className="text-secondary shrink-0 mt-0.5" />
                <span>El-Hagar St., Cairo, Egypt</span>
              </li>

              <li className="flex items-center gap-2">
                <Phone size={17} className="text-secondary shrink-0" />
                <span>+20 123 456 7890</span>
              </li>

              <li className="flex items-start gap-2">
                <Mail size={17} className="text-secondary shrink-0 mt-0.5" />
                <span className="break-all">hello@SAVORA.com</span>
              </li>
            </ul>

            {/* Opening Hours */}
            <div className="mt-6">
              <div className="flex justify-center md:justify-start items-center gap-2 mb-2">
                <Clock size={17} className="text-secondary" />

                <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                  Opening Hours
                </h4>
              </div>

              <p className="text-[13px] text-warm-400 text-center md:text-left">
                Daily: 11:00 AM — 11:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/50 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-center md:text-left">
            <p className="text-xs sm:text-sm text-white/70">
              &copy; {new Date().getFullYear()} SAVORA Restaurant. All rights
              reserved.
            </p>

            <p className="text-xs sm:text-sm text-white/70">
              Crafted with passion for great food
            </p>

            <p className="text-xs sm:text-sm text-white/70">
              Designed & Developed with passion by AmrShalaby & AmrMohamed
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
