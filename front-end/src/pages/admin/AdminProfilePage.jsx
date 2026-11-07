import { useAuth } from "../../context/AuthContext";

import {
  AdminProfileHeader,
  AdminAccountInfo,
} from "../../components/features/admin/AdminProfile";

export default function AdminProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  const initials = user.name?.charAt(0)?.toUpperCase() || "A";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <span className="text-secondary text-sm font-semibold uppercase tracking-[0.2em]">
          Account
        </span>

        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-warm-100 mt-2">
          My Profile
        </h1>

        <p className="text-warm-500 mt-3 text-sm sm:text-base">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile */}
      <div className="relative overflow-hidden bg-gray-900 border border-gray-800 rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative p-6 md:p-8">
          <AdminProfileHeader user={user} initials={initials} />

          <div className="h-px bg-gray-800 my-8" />

          <AdminAccountInfo user={user} />
        </div>
      </div>
    </div>
  );
}
