import { create } from "zustand";

import { persist } from "zustand/middleware";

export type Language =
  | "zh"
  | "en";

type LanguageStore = {
  language: Language;

  setLanguage: (
    language: Language
  ) => void;

  toggleLanguage: () => void;
};

export const useLanguageStore =
  create<LanguageStore>()(
    persist(
      (set, get) => ({
        language: "zh",

        setLanguage: (
          language
        ) =>
          set({
            language,
          }),

        toggleLanguage: () =>
          set({
            language:
              get().language === "zh"
                ? "en"
                : "zh",
          }),
      }),

      {
        name: "fluxy-language",
      }
    )
  );