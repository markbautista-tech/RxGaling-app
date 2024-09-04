import Header from "./header";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(1, "Enter a password!"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  // form submission handler
  const onSubmit = async (data) => {
    setTimeout(() => {
      alert("here");
    });
  };

  return (
    <>
      {/* <Header /> */}
      <div className="flex h-screen w-screen">
        <div className="bg-gray-300 w-2/3"></div>
        <div className="bg-gray-400 w-1/3 flex-center-all">
          {/* <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-3">
            <div className="space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                {...register("email")}
                placeholder="abc@example.com"
              />
              {errors.email && (
                <p className="text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-3">
              <Label htmlFor="password">Password</Label>
              <Input type="password" {...register("password")} />
              {errors.password && (
                <p className="text-destructive">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form> */}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
