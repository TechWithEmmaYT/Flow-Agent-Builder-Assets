import AppPreview from "./_common/app-preview";
import Hero from "./_common/hero";
import Navbar from "./_common/navbar";

export default function Page() {
  return (
    <div className="min-h-dvh w-full relative">
      <div
        className="
          absolute inset-0 z-0
          bg-[radial-gradient(120%_120%_at_50%_80%,#ffffff_40%,#6366f1_100%)]
          dark:bg-[radial-gradient(120%_120%_at_50%_80%,#18181b_40%,#6366f1_100%)]
        "
      >
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(226,232,240,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(226,232,240,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.85) 70%, transparent 100%)",
            maskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.85) 70%, transparent 100%)",
          }}
        />

        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(51,65,85,0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(51,65,85,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.8) 65%, transparent 100%)",
            maskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.8) 65%, transparent 100%)",
          }}
        />
        {/* Overlay for extra depth */}
        <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm pointer-events-none" />
      </div>

      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Navbar />
          <Hero />
        </div>
      </div>
    </div>
  );
}
