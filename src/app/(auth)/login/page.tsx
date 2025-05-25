import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - LingoFuel",
  description: "Log in to your LingoFuel account.",
};

export default function LoginPage() {
  return <LoginForm />;
}
