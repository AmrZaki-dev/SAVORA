export default function HappyCustomers({ avatars }) {
  return (
    <div className="absolute -bottom-10 right-4 sm:right-8 bg-primary rounded-2xl shadow-xl px-5 py-4 w-[210px] sm:w-[230px]">
      <p className="font-playfair text-3xl sm:text-4xl font-bold text-white leading-none">
        500+
      </p>

      <p className="text-white/90 text-sm font-medium mt-1">Happy Customers</p>

      <div className="flex -space-x-3 mt-3">
        {avatars.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Happy customer"
            className="w-9 h-9 rounded-full border-2 border-primary object-cover"
          />
        ))}
      </div>
    </div>
  );
}
