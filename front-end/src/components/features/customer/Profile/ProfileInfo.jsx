import { User, Mail, Shield, Calendar, Pencil } from "lucide-react";

import { formatDate } from "../../../../utils/formatters";
import ProfileInfoRow from "./ProfileInfoRow";

export default function ProfileInfo({ user }) {
  return (
    <div className="px-6 sm:px-10 py-8 md:py-10">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-7">
        <div>
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-warm-900">
            Personal Information
          </h3>

          <p className="text-sm text-warm-500 mt-1">Your account details</p>
        </div>

        {/* Desktop Edit Button */}
        <button
          type="button"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-warm-200 text-warm-700 hover:border-primary hover:text-primary hover:bg-warm-50 transition-all duration-200 text-sm font-medium"
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>

      {/* Information Rows */}
      <div className="divide-y divide-warm-100 border border-warm-100 rounded-2xl overflow-hidden">
        <ProfileInfoRow icon={User} label="Full Name" value={user.name} />

        <ProfileInfoRow icon={Mail} label="Email" value={user.email} />

        <ProfileInfoRow icon={Shield} label="Account Role" value={user.role} />

        {user.createdAt && (
          <ProfileInfoRow
            icon={Calendar}
            label="Member Since"
            value={formatDate(user.createdAt)}
          />
        )}
      </div>

      {/* Mobile Edit Button */}
      <button
        type="button"
        className="sm:hidden w-full mt-6 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-warm-200 text-warm-700 hover:border-primary hover:text-primary hover:bg-warm-50 transition-all duration-200 text-sm font-medium"
      >
        <Pencil size={16} />
        Edit Profile
      </button>
    </div>
  );
}
