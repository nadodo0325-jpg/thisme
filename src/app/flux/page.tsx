import SwipeDeck from "@/features/swipe/components/SwipeDeck";

export default function FluxPage() {
  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white
        overflow-hidden
        relative
        flex
        flex-col
        items-center
        justify-center
        px-4
      "
    >
      {/* BACKGROUND AURA */}

      <div
        className="
          absolute
          w-[600px]
          h-[600px]
          rounded-full
          bg-white/5
          blur-3xl
          opacity-80
        "
      />

      {/* NOISE */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          pointer-events-none
        "
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* CONTENT */}

      <div className="relative z-10">
        {/* HERO */}

        <div className="text-center mb-14">
          {/* EYEBROW */}

          <p
            className="
              uppercase
              tracking-[0.35em]
              text-xs
              text-zinc-500
              mb-5
            "
          >
            FLUXY Emotional Scan
          </p>

          {/* TITLE */}

          <h1
            className="
              text-5xl
              md:text-6xl
              font-bold
              tracking-tight
              leading-none
            "
          >
            Enter Your Flux
          </h1>

          {/* SUBTITLE */}

          <p
            className="
              text-zinc-400
              mt-5
              max-w-md
              leading-relaxed
              text-base
              mx-auto
            "
          >
            Swipe through emotional
            fragments and let the AI
            uncover the version of you
            hidden beneath the surface.
          </p>
        </div>

        {/* SWIPE EXPERIENCE */}

        <SwipeDeck />
      </div>
    </main>
  );
}