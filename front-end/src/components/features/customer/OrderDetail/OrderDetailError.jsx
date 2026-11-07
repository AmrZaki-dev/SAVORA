import { Link } from "react-router-dom";

export default function OrderDetailError() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-8 md:pb-12 text-center">
      <h2 className="text-2xl font-bold text-warm-900">Order not found</h2>

      <Link to="/my-orders" className="btn-primary mt-6 inline-block">
        My Orders
      </Link>
    </div>
  );
}
