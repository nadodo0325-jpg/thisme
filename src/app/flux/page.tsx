import SwipeDeck from "@/features/swipe/components/SwipeDeck";

export default function FluxPage() {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* ATMOSPHERE */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.18),transparent_40%)]
        "
      />

      <div
        className="
          absolute
          top-1/3
          left-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-fuchsia-500/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      {/* GRAIN */}

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

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
          items-center
          justify-center
          px-5
          py-14
        "
      >
        {/* TOP STATUS */}

        <div
          className="
            mb-8
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-white/[0.04]
            px-4
            py-2
            backdrop-blur-xl
          "
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

          <p className="text-xs tracking-[0.2em] text-white/40 uppercase">
            live emotional scan
          </p>
        </div>

        {/* HERO */}

        <div className="mb-14 text-center">
          {/* EYEBROW */}

          <p
            className="
              mb-5
              text-xs
              uppercase
              tracking-[0.35em]
              text-white/25
            "
          >
            FLUXY emotional flow
          </p>

          {/* TITLE */}

          <h1
            className="
              text-5xl
              font-semibold
              leading-[1.05]
              tracking-tight
              md:text-6xl
            "
          >
            有些情緒，
            <br />
            其實你藏了很久。
          </h1>

          {/* SUBTITLE */}

          <p
            className="
              mx-auto
              mt-6
              max-w-md
              text-base
              leading-relaxed
              text-white/40
            "
          >
            滑過這些情緒碎片。
            <br />
            AI 會慢慢看見，
            你沒說出口的那部分。
          </p>

          {/* LIVE META */}

          <div
            className="
              mt-8
              flex
              items-center
              justify-center
              gap-3
              text-sm
              text-white/25
            "
          >
            <span>14,291 people online</span>

            <span className="text-white/10">—</span>

            <span>loneliness trending now</span>
          </div>
        </div>

        {/* SWIPE EXPERIENCE */}

        <div className="relative">
          <SwipeDeck />
        </div>

        {/* BOTTOM TEXT */}

        <div className="mt-12 text-center">
          <p
            className="
              text-sm
              leading-relaxed
              text-white/20
            "
          >
            不需要解釋自己。
            <br />
            只要跟著感覺滑動。
          </p>
        </div>
      </div>
    </main>
  );
}