import { create } from "zustand";

import { persist } from "zustand/middleware";

import { PersonaState } from "@/features/persona/types/persona";

type PersonaStore = {
  persona: PersonaState | null;

  setPersona: (
    persona: PersonaState | null
  ) => void;
};

export const usePersonaStore =
  create<PersonaStore>()(
    persist(
      (set) => ({
        persona: null,

        setPersona: (persona) =>
          set({ persona }),
      }),

      {
        name: "fluxy-persona",
      }
    )
  );