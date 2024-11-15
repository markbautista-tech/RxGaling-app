import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import useSignUp from "./hooks/useSignUp";
import addClinicUser from "@/utils/data/add/addClinicUser";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await addClinicUser(data.email, data.password);

      if (response) {
        toast.success("Signed-up successfully.");
        navigate("/registered");
      }

      console.log("Form submitted:", data);
      console.log(response);
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error(error);
    }
  };

  return (
    <>
      <div className="bg-gray-300 h-screen flex-center-all flex-col gap-5">
        <div>
          <img
            src="src/assets/logo-rxgaling.svg"
            alt="Logo"
            className="w-20 h-20 lg:w-24 lg:h-24"
          />
        </div>
        <Card className="w-full max-w-md mx-[16px] shadow-lg">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create your account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 italic">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 italic">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 italic">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="show_pass"
                  onCheckedChange={(checked) => setShowPassword(checked)}
                />
                <Label
                  htmlFor="show_pass"
                  className="font-semibold text-gray-700"
                >
                  Show Password
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full lg:text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center"></CardFooter>
        </Card>
      </div>
    </>
  );
}
