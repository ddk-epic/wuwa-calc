// Skill
export interface SkillState {
  isInAir: boolean;
  isGroundedForSwap: boolean;
}

export interface Skill {
  id: string;
  name: string;
  damage: number;
  scaling: "Attack" | "Defense" | "Health";
  type: "Basic" | "Heavy" | "Skill" | "Liberation" | "Coord";
  source: string;
  hitframes: number[];
  castTime: number; // in frames, 60/s
  cooldown: number;
  forte: number; // In percent
  resonance: number;
  concerto: number;
  state: SkillState;
  bgColor: string;
  textColor: string;
}

export interface SequenceSkill extends Skill {
  startTime: number;
}

// Character
export interface Weapon {
  name: string;
  type: string;
  attack: number;
  mainStat: string;
  mainStatAmount: number;
  buff: string;
}

export interface Echo {
  name: string;
  set: string;
  damage: number;
  castTime: number;
  classifications: string;
  hitframes: number[];
  cooldown: number;
  resonance: number;
  charges: number;
  hasBuff: boolean;
}

export interface CharacterConstants {
  id: string;
  name: string;
  weaponType: string;
  weapon: string;
  echo: string;
  baseHp: number;
  baseAtk: number;
  baseDef: number;
  MinorForte1: string;
  MinorForte2: string;
  image: string;
  element: string;
  maxForte: number;
  maxForte2: number;
}

export interface Character {
  name: string;
  sequence: string;
  weapon: Weapon;
  weaponRank: string;
  echo: Echo;
  echoSet: string;
  build: string;
  element: string;
  maxForte: number;
  maxForte2: number;
  attack: number;
  defense: number;
  health: number;
  crit: number;
  critDmg: number;
}

export interface BonusStats {
  "Flat Attack": number;
  "Flat Health": number;
  "Flat Defense": number;
  Attack: number;
  Health: number;
  Defense: number;
  "Energy Regen": number;
  Crit: number;
  "Crit Dmg": number;
  Basic: number;
  Heavy: number;
  Skill: number;
  Liberation: number;
  Aero: number;
  Electro: number;
  Fusion: number;
  Glacio: number;
  Havoc: number;
  Spectro: number;
}

export type DCondKeys = "Concerto" | "Resonance" | "Forte" | "Forte 2";

export interface CharacterData extends Character {
  bonusStats: [keyof BonusStats, number][];
  dCond: Map<DCondKeys, number>;
}
