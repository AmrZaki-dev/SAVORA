import { CheckCircle } from "lucide-react";

export default function AdminProfileHeader({ user, initials }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
      <div className="h-20 w-20 rounded-full border-3 border-warm-700/70 bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary/20 shrink-0">
        {initials}
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {user.name}
          </h2>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold capitalize">
            <CheckCircle size={13} />
            {user.role}
          </span>
        </div>

        <p className="text-gray-500 text-sm mt-2">Administrator Profile</p>
      </div>
    </div>
  );
}
