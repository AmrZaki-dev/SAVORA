import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CartEmpty() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 text-center sm:px-6 md:pb-12 md:pt-32 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-7xl">🛒</div>

        <h1 className="mb-3 font-playfair text-3xl font-bold text-warm-900">
          Your Cart is Empty
        </h1>

        <p className="mb-8 text-warm-500">
          Looks like you haven't added anything to your cart yet. Browse our
          menu to find something delicious!
        </p>

        <Link to="/menu" className="btn-primary inline-flex items-center gap-2">
          Browse Menu
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
