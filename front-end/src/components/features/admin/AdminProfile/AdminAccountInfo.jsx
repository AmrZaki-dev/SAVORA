import { User, Mail, Shield, Calendar } from "lucide-react";

import { formatDate } from "../../../../utils/formatters";

export default function AdminAccountInfo({ user }) {
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">
          Account Information
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Your administrator account details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileInfo icon={User} label="Administrator Name" value={user.name} />

        <ProfileInfo icon={Mail} label="Email Address" value={user.email} />

        <ProfileInfo
          icon={Shield}
          label="Access Level"
          value={user.role}
          capitalize
        />

        {user.createdAt && (
          <ProfileInfo
            icon={Calendar}
            label="Account Created"
            value={formatDate(user.createdAt)}
          />
        )}
      </div>
    </div>
  );
}

function ProfileInfo({ icon: Icon, label, value, capitalize = false }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-950/70 border border-gray-800 hover:border-primary/30 transition-colors">
      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-primary" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
          {label}
        </p>

        <p
          className={`text-white font-medium mt-1 truncate ${
            capitalize ? "capitalize" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
