import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

import FormField from "../../../common/molecules/FormField";
import Input from "../../../common/atoms/Input";
import Button from "../../../common/atoms/Button";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

export default function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="bg-[#11100e]/80 border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <FormField
          label="Email Address"
          htmlFor="email"
          error={errors.email?.message}
          theme="dark"
        >
          <Input
            id="email"
            type="email"
            theme="dark"
            hasError={!!errors.email}
            {...register("email")}
            placeholder="Enter your email"
          />
        </FormField>

        {/* Password */}
        <FormField
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
          theme="dark"
        >
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              theme="dark"
              hasError={!!errors.password}
              {...register("password")}
              placeholder="Enter your password"
              className="pr-11"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-secondary transition-colors cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </FormField>

        {/* Submit */}
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          loading={isSubmitting}
          fullWidth
          rounded={false}
          className="h-12 shadow-lg shadow-secondary/10"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
