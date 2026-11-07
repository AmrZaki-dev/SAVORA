import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmationHeader() {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
        <CheckCircle2 size={40} className="text-emerald-500" />
      </div>

      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-warm-900">
        Order Confirmed!
      </h1>

      <p className="text-warm-500 mt-3 text-lg">
        Thank you for your order. We're preparing your food with love!
      </p>
    </div>
  );
}
