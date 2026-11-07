import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/organisms/Navbar";
import Footer from "../../components/common/organisms/Footer";

export default function CustomerLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-warm-50">
      <Navbar />
      <main className="flex-1">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
}
