"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

export function Navbar() {
  const pathname = usePathname();
  const { user, clearUser } = useUserStore();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    clearUser();
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link
              href="/"
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              BudgetTracker App
            </Link>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/")
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                }`}
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/dashboard")
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-muted-foreground"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/transaction"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/transaction")
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-muted-foreground"
                    }`}
                  >
                    Transaction
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/login")
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-muted-foreground"
                  }`}
                >
                  Login
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button variant="default" size="sm" onClick={handleLogin}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                onClick={handleLinkClick}
                className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                  isActive("/")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground"
                }`}
              >
                Home
              </Link>

              {user && (
                <>
                  <Link
                    href="/dashboard"
                    onClick={handleLinkClick}
                    className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                      isActive("/dashboard")
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/transaction"
                    onClick={handleLinkClick}
                    className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                      isActive("/transaction")
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground"
                    }`}
                  >
                    Transaction
                  </Link>
                </>
              )}

              <div className="pt-4 pb-2">
                {user ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full bg-transparent"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleLogin}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
