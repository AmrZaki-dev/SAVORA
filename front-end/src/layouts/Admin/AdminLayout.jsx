import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { ASSETS } from "../../constants/assets";

const sidebarLinks = [
  {
    to: "/admin",
    icon: LayoutDashboard,
    label: "Dashboard",
    exact: true,
  },
  {
    to: "/admin/menu",
    icon: UtensilsCrossed,
    label: "Menu Management",
  },
  {
    to: "/admin/orders",
    icon: ClipboardList,
    label: "Orders Management",
  },
  {
    to: "/admin/profile",
    icon: User,
    label: "Profile",
  },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (link) => {
    if (link.exact) {
      return location.pathname === link.to;
    }

    return location.pathname.startsWith(link.to);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {/* Sidebar */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72
          bg-gray-900 border-r border-gray-800/50
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}

          <div className="flex items-center justify-between px-6 h-20 border-b border-gray-800/50">
            <Link to="/admin" className="flex items-center gap-2">
              <img
                src={ASSETS.Logo}
                alt="Savora"
                className="w-14 h-14 object-contain"
              />

              <div className="flex justify-center items-center gap-2">
                <span className="font-playfair text-2xl font-bold text-secondary tracking-tight leading-none">
                  SA
                  <span className="text-primary">V</span>
                  OR
                  <span className="text-primary">A</span>
                </span>

                <span className="text-[10px] uppercase tracking-[0.2em] text-white mt-1">
                  Admin
                </span>
              </div>
            </Link>

            {/* Mobile Close */}

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const active = isActive(link);
              const Icon = link.icon;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group relative flex items-center gap-3
                    px-4 py-3 rounded-xl
                    text-sm font-medium
                    transition-all duration-300 ease-out
                    ${
                      active
                        ? "bg-warm-100 text-primary shadow-md shadow-black/10"
                        : "text-white hover:bg-warm-50/30 hover:translate-x-1"
                    }
                  `}
                >
                  {/* Active Indicator */}

                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-primary rounded-r-full" />
                  )}

                  {/* Icon */}

                  <Icon
                    size={20}
                    className={`
                      shrink-0 transition-all duration-300
                      ${
                        active
                          ? "text-primary scale-110"
                          : "text-gray-500 group-hover:text-primary group-hover:scale-110"
                      }
                    `}
                  />

                  {/* Label */}

                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    {link.label}
                  </span>

                  {/* Arrow */}

                  {active && (
                    <ChevronRight
                      size={16}
                      className="ml-auto text-primary transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}

          <div className="px-4 pb-6 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800/60 transition-all"
            >
              <ChevronRight size={20} className="rotate-180" />
              Back to Website
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}

        <header className="flex items-center justify-between h-20 px-4 sm:px-8 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm shrink-0">
          {/* Page Title */}

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <h1 className="text-lg font-semibold text-primary-light">
              {sidebarLinks.find((link) => isActive(link))?.label ||
                "Dashboard"}
            </h1>
          </div>

          {/* Admin Info */}

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{user?.name}</p>

              <p className="text-xs text-gray-500">Administrator</p>
            </div>

            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Page Content */}

        <main
          id="admin-main-content"
          className="flex-1 overflow-y-auto p-4 sm:p-8 bg-warm-800/50"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
