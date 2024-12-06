import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Pill } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-center py-5">
            <img src="/logo-rxgaling.svg" alt="Logo" className="w-28 h-28" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to RxGaling
          </h1>
          <p className="text-xl text-gray-600">
            Your integrated healthcare platform
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Stethoscope className="h-6 w-6 text-blue-500" />
                Clinic Login
              </CardTitle>
              <CardDescription>
                Access your clinic dashboard and patient records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/user-login">
                <Button className="w-full">Login to Clinic</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Pill className="h-6 w-6 text-green-500" />
                Pharmacy Login
              </CardTitle>
              <CardDescription>
                Manage prescriptions and inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/pharmacy-user-login">
                <Button className="w-full">Login to Pharmacy</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
