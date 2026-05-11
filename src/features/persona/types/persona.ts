import {
  ArchetypeType,
  EnergyLevel,
  ToneType,
} from "@/types/global";

export type PersonaState = {
  archetype: ArchetypeType;

  tone: ToneType;

  energy: EnergyLevel;

  description: string;

  quote: string;

  gradient: string;

  accent: string;
};