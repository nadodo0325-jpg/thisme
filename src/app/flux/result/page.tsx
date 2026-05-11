"use client";

import { usePersonaStore } from "@/stores/personaStore";

export default function ResultPage() {
  const { persona } = usePersonaStore();

  if (!persona) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        No persona generated.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-bold">
          {persona.archetype}
        </h1>

        <p className="text-zinc-400">
          {persona.description}
        </p>
      </div>
    </main>
  );
}