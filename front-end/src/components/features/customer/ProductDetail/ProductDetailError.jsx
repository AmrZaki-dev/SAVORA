import { Link } from "react-router-dom";

export default function ProductDetailError() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="text-6xl mb-4">😕</div>

      <h2 className="text-2xl font-bold text-warm-900 mb-2">Item Not Found</h2>

      <p className="text-warm-500 mb-6">
        The menu item you're looking for doesn't exist.
      </p>

      <Link to="/menu" className="btn-primary">
        Back to Menu
      </Link>
    </div>
  );
}
