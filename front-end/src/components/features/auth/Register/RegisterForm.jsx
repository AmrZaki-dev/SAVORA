import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

import FormField from "../../../common/molecules/FormField";
import Input from "../../../common/atoms/Input";
import Button from "../../../common/atoms/Button";

const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-[#11100e]/80 p-5 shadow-2xl backdrop-blur-sm sm:p-7">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <FormField
          label="Full Name"
          htmlFor="name"
          error={errors.name?.message}
          theme="dark"
        >
          <Input
            id="name"
            type="text"
            theme="dark"
            hasError={!!errors.name}
            {...register("name")}
            placeholder="Enter your full name"
          />
        </FormField>

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
              placeholder="At least 6 characters"
              className="pr-11"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent text-white/40 transition-colors hover:text-secondary"
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
          Sign Up
        </Button>
      </form>
    </div>
  );
}
