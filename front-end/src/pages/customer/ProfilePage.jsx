import { useAuth } from "../../context/AuthContext";

import {
  ProfileHeader,
  ProfileInfo,
} from "../../components/features/customer/Profile";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <main className="min-h-screen bg-warm-50 px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-10 md:pb-14">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 md:mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
            Account
          </span>

          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-warm-900 mt-2">
            My Profile
          </h1>

          <p className="text-warm-500 mt-3 text-sm sm:text-base">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <section className="bg-white rounded-3xl border border-warm-200 shadow-sm overflow-hidden">
          <ProfileHeader user={user} />

          <ProfileInfo user={user} />
        </section>
      </div>
    </main>
  );
}
