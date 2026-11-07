import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import NotFoundPage from "../pages/NotFoundPage";
import ScrollToTop from "../components/ScrollToTop";

import CustomerLayout from "../layouts/Customer/CustomerLayout";
import AdminLayout from "../layouts/Admin/AdminLayout";
import AuthLayout from "../layouts/Auth/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import GuestRoute from "./GuestRoute";

// Customer pages
const HomePage = lazy(() => import("../pages/customer/HomePage"));
const MenuPage = lazy(() => import("../pages/customer/MenuPage"));
const ProductDetailPage = lazy(
  () => import("../pages/customer/ProductDetailPage"),
);
const CartPage = lazy(() => import("../pages/customer/CartPage"));
const CheckoutPage = lazy(() => import("../pages/customer/CheckoutPage"));
const OrderConfirmationPage = lazy(
  () => import("../pages/customer/OrderConfirmationPage"),
);
const MyOrdersPage = lazy(() => import("../pages/customer/MyOrdersPage"));
const OrderDetailPage = lazy(() => import("../pages/customer/OrderDetailPage"));
const ProfilePage = lazy(() => import("../pages/customer/ProfilePage"));
const AboutPage = lazy(() => import("../pages/customer/AboutPage"));
const PrivacyPage = lazy(() => import("../pages/customer/PrivacyPage"));
const TermsPage = lazy(() => import("../pages/customer/TermsPage"));

// Auth pages
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));

// Admin pages
const DashboardPage = lazy(() => import("../pages/admin/DashboardPage"));
const MenuManagementPage = lazy(
  () => import("../pages/admin/MenuManagementPage"),
);
const AddMenuItemPage = lazy(() => import("../pages/admin/AddMenuItemPage"));
const EditMenuItemPage = lazy(() => import("../pages/admin/EditMenuItemPage"));
const OrdersManagementPage = lazy(
  () => import("../pages/admin/OrdersManagementPage"),
);
const AdminOrderDetailPage = lazy(
  () => import("../pages/admin/AdminOrderDetailPage"),
);
const AdminProfilePage = lazy(() => import("../pages/admin/AdminProfilePage"));

function LoadingPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#1f3478]" />
    </div>
  );
}

const publicCustomerRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/menu", element: <MenuPage /> },
  { path: "/menu/:id", element: <ProductDetailPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "/terms", element: <TermsPage /> },
];

const protectedCustomerRoutes = [
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/order-confirmation/:id", element: <OrderConfirmationPage /> },
  { path: "/my-orders", element: <MyOrdersPage /> },
  { path: "/orders/:id", element: <OrderDetailPage /> },
  { path: "/profile", element: <ProfilePage /> },
];

const guestRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];

const adminRoutes = [
  { index: true, element: <DashboardPage /> },
  { path: "menu", element: <MenuManagementPage /> },
  { path: "menu/add", element: <AddMenuItemPage /> },
  { path: "menu/edit/:id", element: <EditMenuItemPage /> },
  { path: "orders", element: <OrdersManagementPage /> },
  { path: "orders/:id", element: <AdminOrderDetailPage /> },
  { path: "profile", element: <AdminProfilePage /> },
];

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* Customer area: public pages + protected user pages */}
          <Route element={<CustomerLayout />}>
            {publicCustomerRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            <Route element={<ProtectedRoute />}>
              {protectedCustomerRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </Route>

          {/* Auth area: users already logged in cannot access these pages */}
          <Route element={<AuthLayout />}>
            <Route element={<GuestRoute />}>
              {guestRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </Route>

          {/* Admin area: only staff/admin can use these routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            {adminRoutes.map(({ index, path, element }) =>
              index ? (
                <Route key="admin-index" index element={element} />
              ) : (
                <Route key={path} path={path} element={element} />
              ),
            )}
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
