import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { ASSETS } from "../../../constants/assets";

export default function Navbar() {
  const {
    isAuthenticated,
    isAdmin,
    user,
    logout,
    loading: authLoading,
  } = useAuth();

  const { cartCount } = useCart();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    logout();

    // Clear React Query cache so previous user's
    // server data is not available to the next user.
    queryClient.clear();

    setUserMenuOpen(false);
    setMobileOpen(false);

    navigate("/", { replace: true });
  };

  return (
    <header
      className={`fixed top-5 left-1/2 -translate-x-1/2 w-[95%] z-50 rounded-3xl transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <img
              src={ASSETS.Logo}
              alt="Savora Logo"
              className="w-14 lg:w-16 object-contain"
            />

            <div className="flex flex-col justify-center gap-1">
              <h1 className="font-playfair text-2xl md:text-3xl font-bold tracking-tight text-yellow-400 leading-none">
                SA<span className="text-red-600">V</span>OR
                <span className="text-red-600">A</span>
              </h1>

              <h2 className="text-[0.625rem] md:text-xs uppercase tracking-[0.25em] text-black font-medium">
                Restaurant
              </h2>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/menu" className="nav-link">
              Menu
            </Link>

            <Link to="/about" className="nav-link">
              About
            </Link>

            {isAuthenticated && (
              <Link to="/my-orders" className="nav-link">
                My Orders
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 text-warm-600 hover:text-primary hover:bg-warm-100 rounded-full transition-all duration-200"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Authentication */}
            {authLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-10 w-24 rounded-full bg-warm-100 animate-pulse" />
                <div className="h-10 w-20 rounded-full bg-warm-100 animate-pulse" />
              </div>
            ) : isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-warm-100 hover:bg-warm-200 border border-warm-200 transition-all duration-200"
                >
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <span className="text-sm font-medium text-warm-700 max-w-25 truncate">
                    {user?.name}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`text-warm-500 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <>
                    {/* Overlay */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-warm-200 py-2 z-50 overflow-hidden">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-warm-100 bg-warm-50">
                        <p className="text-sm font-semibold text-warm-900 truncate">
                          {user?.name}
                        </p>

                        <p className="text-xs text-warm-500 truncate mt-0.5">
                          {user?.email}
                        </p>
                      </div>

                      {/* Admin Dashboard */}
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-warm-700 hover:bg-warm-50 hover:text-primary transition-colors"
                        >
                          <LayoutDashboard size={17} />
                          Admin Dashboard
                        </Link>
                      )}

                      {/* Profile */}
                      {!isAdmin && (
                        <Link
                          to="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-warm-700 hover:bg-warm-50 hover:text-primary transition-colors"
                        >
                          <User size={17} />
                          Profile
                        </Link>
                      )}

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-secondary hover:bg-secondary-dark text-warm-950 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-1">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-warm-600 hover:text-primary transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={22} />

              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="p-2 text-warm-700 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-warm-200 py-4">
            <div className="flex flex-col gap-1">
              <Link
                to="/menu"
                onClick={() => setMobileOpen(false)}
                className="mobile-nav-link"
              >
                Menu
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="mobile-nav-link"
              >
                About
              </Link>

              {authLoading ? (
                <div className="px-3 py-2">
                  <div className="h-10 w-32 rounded-full bg-warm-100 animate-pulse" />
                </div>
              ) : isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-warm-100 hover:bg-warm-200 border border-warm-200 transition-all duration-200"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <span className="text-sm font-medium text-warm-700 max-w-25 truncate">
                      {user?.name}
                    </span>

                    <ChevronDown
                      size={16}
                      className={`text-warm-500 transition-transform duration-200 ${
                        userMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="mt-2 bg-white rounded-2xl shadow-lg border border-warm-200 overflow-hidden">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-warm-100 bg-warm-50">
                        <p className="text-sm font-semibold text-warm-900 truncate">
                          {user?.name}
                        </p>

                        <p className="text-xs text-warm-500 truncate mt-0.5">
                          {user?.email}
                        </p>
                      </div>

                      {/* Admin Dashboard */}
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setMobileOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-warm-700 hover:bg-warm-50 hover:text-primary transition-colors"
                        >
                          <LayoutDashboard size={17} />
                          Admin Dashboard
                        </Link>
                      )}

                      {/* Profile */}
                      {!isAdmin && (
                        <Link
                          to="/profile"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setMobileOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-warm-700 hover:bg-warm-50 hover:text-primary transition-colors"
                        >
                          <User size={17} />
                          Profile
                        </Link>
                      )}

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="bg-secondary hover:bg-secondary-dark text-warm-950 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
