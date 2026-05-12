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
      {/* BACKGROUND */}

      <div
        className="
          absolute
          w-[500px]
          h-[500px]
          rounded-full
          bg-white/5
          blur-3xl
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight">
            Enter Your Flux
          </h1>

          <p className="text-zinc-500 mt-4">
            Swipe what resonates with your
            current emotional state.
          </p>
        </div>

        <SwipeDeck />
      </div>
    </main>
  );
}