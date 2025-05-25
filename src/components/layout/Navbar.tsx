"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const { translate } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading && !isAuthenticated && (pathname === '/login' || pathname === '/signup')) { // Avoid navbar flash on auth pages during initial load
     return null;
  }
  
  if (pathname === '/login' || pathname === '/signup') { // Don't show full navbar on auth pages
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
           <LanguageSwitcher />
        </div>
      </header>
    );
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2" aria-label="Home">
          <Logo />
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
          {isAuthenticated && (
            <Link href="/dashboard" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"}`}>
              {translate("dashboard", "Dashboard")}
            </Link>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted"></div>
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://placehold.co/40x40.png?text=${user.email[0].toUpperCase()}`} alt={user.email} data-ai-hint="abstract avatar" />
                    <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {translate("user", "User")}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>{translate("dashboard", "Dashboard")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{translate("logout", "Logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" className={pathname === "/login" ? "text-primary" : ""}>
                <Link href="/login">{translate("login", "Login")}</Link>
              </Button>
              <Button asChild className={pathname === "/signup" ? "bg-primary/90" : ""}>
                <Link href="/signup">{translate("signup", "Sign Up")}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
