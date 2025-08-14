// Skill
interface SkillState {
  isInAir: boolean;
  isGroundedForSwap: boolean;
}

interface Skill {
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

interface SequenceSkill extends Skill {
  startTime: number;
}

// Character
interface Weapon {
  name: string;
  type: string;
  rank: number;
  attack: number;
  mainStat: string;
  mainStatAmount: number;
  buff: string;
}

interface Echo {
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

interface Character {
  name: string;
  sequenceChain: number;
  weapon: Weapon;
  echo: Echo;
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
