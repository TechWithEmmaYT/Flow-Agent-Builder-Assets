import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import AppPreview from "./app-preview";

const Hero = () => {
  return (
    <section
      className={cn(
        "relative mt-3 overflow-hidden rounded-3xl border backdrop-blur-sm",
        "px-6 py-10"
      )}
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-5 flex items-center justify-center">
          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-300 shadow-sm backdrop-blur-md">
            ✨ The Visual Workflow Builder for AI
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className={cn(
            "relative text-balance font-extrabold tracking-tight leading-[1.1]",
            "text-5xl sm:text-6xl md:text-7xl", // Much larger text
            "text-foreground"
          )}
        >
          Build AI Agents with
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-400 animate-gradient-x pb-2">
            Visual Workflows
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-4 mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Drag, drop, and connect. Create powerful AI agents that integrate with
          your tools and data—no coding required.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <LoginLink>
            <Button
              size="lg"
              className={cn(
                "rounded-full px-8 py-6 text-base font-semibold shadow-xl transition-all hover:scale-105"
              )}
            >
              Start Building For Free
            </Button>
          </LoginLink>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-base hover:bg-muted/50 border-muted-foreground/20"
          >
            <Link href="/learn-more">View Demo</Link>
          </Button>
        </div>
      </div>

      <AppPreview />
    </section>
  );
};

export default Hero;
