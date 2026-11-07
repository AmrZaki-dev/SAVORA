import { CheckCircle } from "lucide-react";

export default function ProfileHeader({ user }) {
  return (
    <div className="bg-gradient-to-r from-warm-900 via-warm-900 to-warm-800 px-6 sm:px-10 py-8 md:py-10">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Avatar */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold shadow-xl ring-4 ring-white/10">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* User Info */}
        <div className="text-center sm:text-left">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white">
            {user.name}
          </h2>

          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
            <span className="px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-semibold capitalize">
              {user.role}
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium">
              <CheckCircle size={13} />
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
