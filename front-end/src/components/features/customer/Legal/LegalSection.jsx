export default function LegalSection({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-10 h-10 bg-warm-900/45 text-primary rounded-xl flex items-center justify-center border border-gray-800/80">
        <Icon size={20} />
      </div>

      <div>
        <h3 className="text-base font-semibold text-white mb-2">{title}</h3>

        <p className="text-xs sm:text-sm text-warm-400 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
