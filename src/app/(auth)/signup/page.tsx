import { SignupForm } from "@/components/auth/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - LingoFuel",
  description: "Create your LingoFuel account.",
};

export default function SignupPage() {
  return <SignupForm />;
}
