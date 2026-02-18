"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";

function Navbar() {
  const { isAuthenticated } = useKindeBrowserClient();
  return (
    <header>
      
      <nav
        className={cn(
          "mx-auto mt-px flex items-center justify-between gap-3",
          "rounded-full border bg-white/70 px-4 py-2 shadow-sm backdrop-blur-md",
          "dark:bg-black/30"
        )}
        aria-label="Primary"
      >
        <Logo />
        <ul className="hidden items-center gap-6 text-sm xl:text-base font-normal md:flex">
          <li>
            <Link
              href="#pricing"
              className="transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              Contact us
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Link href="/workflow">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <LoginLink>
              <Button>Sign In</Button>
            </LoginLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
