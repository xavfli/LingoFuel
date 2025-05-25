"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/icons/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const { translate } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading || (!loading && isAuthenticated)) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading LingoFuel...</p>
      </div>
    );
  }

  return (
    <div className="container flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
      <Logo size={64} />
      <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
        {translate('welcomeTo', 'Welcome to')} LingoFuel
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        {translate('appDescriptionShort', 'Track your fuel consumption, get smart driving tips, and save money. All in your preferred language.')}
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button asChild size="lg">
          <Link href="/login">
            {translate('getStartedLogin', 'Log in to get started')}
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
           <Link href="/signup">
            {translate('signup', 'Sign Up')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
