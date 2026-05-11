import SwipeDeck from "@/features/swipe/components/SwipeDeck";

export default function FluxPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold">
          Enter Your Flux
        </h1>

        <p className="text-zinc-500 mt-4">
          Swipe what resonates with you.
        </p>
      </div>

      <SwipeDeck />
    </main>
  );
}