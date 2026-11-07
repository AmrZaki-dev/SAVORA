import { Link } from "react-router-dom";

export default function OrderConfirmationError() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 className="text-2xl font-bold text-warm-900">Order not found</h2>

      <Link to="/menu" className="btn-primary mt-6 inline-block">
        Back to Menu
      </Link>
    </div>
  );
}
