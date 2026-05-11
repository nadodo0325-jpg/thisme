import { create } from "zustand";

import { PersonaState } from "@/features/persona/types/persona";

type PersonaStore = {
  persona: PersonaState | null;

  setPersona: (
    persona: PersonaState
  ) => void;
};

export const usePersonaStore =
  create<PersonaStore>((set) => ({
    persona: null,

    setPersona: (persona) =>
      set({ persona }),
  }));