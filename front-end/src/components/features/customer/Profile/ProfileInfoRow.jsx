export default function ProfileInfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 px-4 sm:px-6 py-5">
      <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-secondary" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">
          {label}
        </p>

        <p className="text-base sm:text-lg font-medium text-warm-900 mt-1 break-all">
          {value}
        </p>
      </div>
    </div>
  );
}
