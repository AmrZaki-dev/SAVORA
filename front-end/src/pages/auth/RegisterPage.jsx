import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

import RegisterForm from "../../components/features/auth/Register/RegisterForm";

export default function RegisterPage() {
  const { register: registerUser, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const onSubmit = async (data) => {
    try {
      const user = await registerUser(
        data.name.trim(),
        data.email.trim(),
        data.password,
      );

      toast.success(`Welcome, ${user.name}! Your account has been created.`, {
        style: {
          borderRadius: "12px",
          background: "#1a1a1a",
          color: "#fff",
        },
      });

      navigate(from, { replace: true });
    } catch (err) {
      if (!err._toasted) {
        const message =
          err.response?.data?.message ||
          "Registration failed. Please try again.";

        toast.error(message);
      }
    }
  };

  if (isAuthenticated) {
    return null;
  }

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
      <div className="mb-8 text-center">
        <p className="mb-2 font-playfair text-lg italic text-secondary">
          Join Savora!
        </p>

        <h1 className="font-playfair text-3xl font-bold text-white sm:text-4xl">
          Create your account
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-white/50">
          Sign up to enjoy exclusive offers, track your orders
          <br className="hidden sm:block" />
          and much more.
        </p>
      </div>

      {/* Register Form */}
      <RegisterForm onSubmit={onSubmit} />

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-white/50">
        Already have an account?{" "}
        <Link
          to="/login"
          state={{
            from: location.state?.from,
          }}
          className="font-semibold text-secondary transition-colors hover:text-secondary/80"
        >
          Login
        </Link>
      </p>
    </>
  );
}
