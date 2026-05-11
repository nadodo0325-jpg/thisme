import { create } from "zustand";

type SessionStore = {
  step: number;

  setStep: (step: number) => void;
};

export const useSessionStore =
  create<SessionStore>((set) => ({
    step: 0,

    setStep: (step) =>
      set({ step }),
  }));