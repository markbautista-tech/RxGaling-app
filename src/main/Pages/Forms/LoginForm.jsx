import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { fetchAuth, login } from "@/utils/data/login";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import LoadingUI from "@/main/components/loadingUI";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    user,
    loading,
    setUser,
    role,
    setRole,
    setEmail,
    pharmacyId,
    clinicId,
  } = useUser();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      if (role === "admin") {
        navigate("/admin");
      } else if (clinicId) {
        navigate("/clinic-app");
      } else if (pharmacyId) {
        navigate("/pharmacy-app");
      } else {
        toast.error("You are not assigned to a clinic or pharmacy.");
      }
    }
  }, [navigate, user, role, clinicId, pharmacyId]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setError("");
    try {
      const response = await login(data.email, data.password);
      const loginError = response.message;

      if (loginError) {
        toast.error(loginError);
        return;
      }

      const userRole = response.role || response.user?.user_metadata?.role;

      if (response.error) {
        toast.error(response.error);
        return;
      }

      if (response.clinic_id || userRole === "admin") {
        setUser(response);
        setRole(userRole);
        setEmail(data.email);

        toast.success("Login Successfully!");

        if (userRole === "admin") {
          navigate("/admin");
        } else if (response.clinic_id) {
          navigate("/clinic-app");
        } else {
          navigate("/");
        }
      } else {
        toast.error("You are currently not in any clinics or pharmacies.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    }
  };

  if (loading) return <LoadingUI />;

  return (
    <div className="bg-gray-300 h-screen flex-center-all flex-col gap-5">
      <div>
        <img
          src="/logo-rxgaling.svg"
          alt="Logo"
          className="w-20 h-20 lg:w-24 lg:h-24"
        />
      </div>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
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
                placeholder="Enter your password"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="text-sm text-red-500 italic">
                  {errors.password.message}
                </p>
              )}
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
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
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" className="text-sm text-muted-foreground">
            Forgot password?
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
