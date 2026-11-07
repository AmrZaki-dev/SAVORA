import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

import LoginForm from "../../components/features/auth/Login/LoginForm";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  const onSubmit = async (data) => {
    try {
      const user = await login(data.email, data.password);

      toast.success(`Welcome back, ${user.name}!`, {
        style: {
          borderRadius: "12px",
          background: "#1a1a1a",
          color: "#fff",
        },
      });

      if (user.role === "admin" && from === "/") {
        navigate("/admin", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (!err._toasted) {
        const message =
          err.response?.data?.message || "Invalid email or password.";

        toast.error(message);
      }
    }
  };

  return (
    <>
      {/* Mobile Brand */}
      <div className="lg:hidden text-center mb-8">
        <Link to="/" className="inline-flex flex-col items-center">
          <span className="font-playfair text-2xl font-bold text-secondary tracking-tight">
            SAVORA
          </span>

          <span className="text-[9px] uppercase tracking-[0.28em] text-white/60 mt-1">
            Restaurant
          </span>
        </Link>
      </div>

      {/* Welcome */}
      <div className="text-center mb-8">
        <p className="font-playfair italic text-secondary text-lg mb-2">
          Welcome Back!
        </p>

        <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-white">
          Login to your account
        </h1>

        <p className="text-white/50 text-sm mt-3 leading-relaxed">
          Login to continue enjoying your favorite meals
          <br className="hidden sm:block" />
          and faster checkout.
        </p>
      </div>

      {/* Login Form */}
      <LoginForm onSubmit={onSubmit} />

      {/* Register Link */}
      <p className="text-center text-sm text-white/50 mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-secondary font-semibold hover:text-secondary/80 transition-colors"
        >
          Sign Up
        </Link>
      </p>
    </>
  );
}
