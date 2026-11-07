export default function FeatureItem({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-2">
      <div className="shrink-0 w-12 h-12 bg-warm-100 text-primary rounded-xl flex items-center justify-center">
        <Icon size={22} />
      </div>

      <div>
        <h3 className="font-semibold text-warm-900 text-sm sm:text-base">
          {title}
        </h3>

        <p className="mt-1 text-warm-500 text-xs leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
