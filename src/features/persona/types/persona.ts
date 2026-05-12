import {
  ArchetypeType,
  EnergyLevel,
  ToneType,
} from "@/types/global";

export type PersonaState = {
  /*
    core identity
  */

  archetype: ArchetypeType;

  tone: ToneType;

  energy: EnergyLevel;

  /*
    personality content
  */

  description: string;

  quote: string;

  /*
    visual identity
  */

  gradient: string;

  accent: string;

  /*
    viral/social metadata
  */

  aura?: string;

  rarity?: string;

  tags?: string[];

  socialTitle?: string;

  shareDescription?: string;
};