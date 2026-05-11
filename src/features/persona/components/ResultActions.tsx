"use client";

import { useRouter } from "next/navigation";

import { useFluxStore } from "@/stores/fluxStore";

export default function ResultActions() {
  const router = useRouter();

  const { reset } = useFluxStore();

  function handleRestart() {
    reset();

    localStorage.removeItem(
      "fluxy-emotions"
    );

    router.push("/flux");
  }

  return (
    <div className="flex flex-col gap-4 mt-12">
      <button
        onClick={handleRestart}
        className="
          px-6
          py-4
          rounded-full
          bg-white
          text-black
          font-medium
          hover:scale-[1.02]
          transition
        "
      >
        Re-enter Flux
      </button>

      <button
        className="
          px-6
          py-4
          rounded-full
          border
          border-white/10
          text-white
          hover:bg-white/5
          transition
        "
      >
        Share Persona
      </button>
    </div>
  );
}