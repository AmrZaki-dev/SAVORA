import {
  Scale,
  FileText,
  CreditCard,
  Truck,
  ShieldAlert,
  RefreshCw,
} from "lucide-react";

import LegalHeader from "../../components/features/customer/Legal/LegalHeader";
import LegalSection from "../../components/features/customer/Legal/LegalSection";
import LegalContact from "../../components/features/customer/Legal/LegalContact";

const sections = [
  {
    icon: Scale,
    title: "1. Acceptance of Terms",
    text: "By accessing Savora's website and services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our platform.",
  },
  {
    icon: FileText,
    title: "2. Use of Service",
    text: "You are permitted to use our services for personal, non-commercial food ordering. You must not misuse, disrupt, or attempt unauthorized access to our web systems.",
  },
  {
    icon: CreditCard,
    title: "3. Orders & Payments",
    text: "All orders placed are subject to acceptance and availability. Prices are listed on the menu and payment must be made in full at the checkout stage via our secure payment partners.",
  },
  {
    icon: Truck,
    title: "4. Delivery & Pickup",
    text: "We strive to deliver your meals within the estimated timeframes; however, delays can happen due to traffic, weather, or unexpected high demand. Delivery coordinates must be accurate.",
  },
  {
    icon: ShieldAlert,
    title: "5. Limitation of Liability",
    text: "Savora Restaurant shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of, or inability to use, our services.",
  },
  {
    icon: RefreshCw,
    title: "6. Changes to Terms",
    text: "We reserve the right to update or modify these Terms and Conditions at any time without prior notice. The updated version will be effective immediately upon posting on this page.",
  },
];

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 blur-[120px] rounded-full" />

        <div className="absolute top-[500px] right-0 w-80 h-80 bg-secondary/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-24">
        <LegalHeader
          title="Terms & Conditions"
          description="Last updated: August 2026. Please read our terms and conditions of service."
        />

        <section className="space-y-10">
          <div className="bg-gray-900/40 border border-gray-800/60 rounded-3xl p-6 sm:p-8 space-y-6">
            <p className="text-sm text-warm-300 leading-relaxed">
              Welcome to Savora Restaurant. These Terms & Conditions govern your
              relationship with us and outline the guidelines for accessing our
              platform, ordering, and communicating with our team.
            </p>

            <div className="grid grid-cols-1 gap-8 pt-4">
              {sections.map((section) => (
                <LegalSection
                  key={section.title}
                  icon={section.icon}
                  title={section.title}
                  text={section.text}
                />
              ))}
            </div>
          </div>

          <LegalContact>
            If you have any questions regarding these Terms & Conditions, please
            contact our support at{" "}
            <span className="text-primary font-medium">
              support@savora-restaurant.com
            </span>
            .
          </LegalContact>
        </section>
      </div>
    </main>
  );
}
